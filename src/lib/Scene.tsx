import {
  DepthOfField,
  EffectComposer,
  Outline,
  Select,
  ToneMapping,
} from "@react-three/postprocessing";
import { Selection } from "@react-three/postprocessing";
import { ThreeElements, useFrame } from "@react-three/fiber";
import { useEffect, useState, useRef } from "react";
import { useThree } from "@react-three/fiber";
import { Detailed } from "@react-three/drei";
import { LOD, MathUtils } from "three";

import useTheme, { themes } from "./Theme";

import type { DecimatedModel } from "./types";

export const DEPTH_OF_FIELD = 60;

export default function Scene({
  count = 80,
  depth = DEPTH_OF_FIELD,
  easing = (x: number) => Math.sqrt(1 - Math.pow(x - 1, 2)),
  ...props
}: {
  count?: number;
  depth?: number;
  easing?: (x: number) => number;
} & ThreeElements["group"]) {
  const [theme, setTheme] = useTheme();

  return (
    <group {...props}>
      <Selection>
        <EffectComposer multisampling={8} autoClear={false}>
          <Outline
            blur
            visibleEdgeColor={0xffffff}
            edgeStrength={100}
            width={1000}
          />
          <DepthOfField
            target={[0, 0, depth / 2]}
            focalLength={0.5}
            bokehScale={2.5}
            height={400}
          />
          <ToneMapping />
        </EffectComposer>
        {Array.from(
          {
            length: count,
          },
          (_, i) => {
            let current = themes[i % themes.length];

            return (
              <SceneMember
                onClick={() => setTheme(current.name)}
                key={i}
                model={current.model}
                index={i}
                z={Math.round(easing(i / count) * depth)}
                isActive={current.name === theme.name}
              />
            );
          },
        )}
      </Selection>
    </group>
  );
}

function SceneMember({
  model: Model,
  index,
  z,
  isActive = false,
  speed = 0.5,
  maxDepth = DEPTH_OF_FIELD,
  ...props
}: {
  model: DecimatedModel;
  index: number;
  z: number;
  isActive: boolean;
  maxDepth?: number;
  speed?: number;
} & ThreeElements["group"]) {
  const ref = useRef<LOD>(null);
  const { viewport, camera } = useThree();
  const { width, height } = viewport.getCurrentViewport(camera, [0, 0, -z]);

  const [hovered, setHovered] = useState(false);

  const [data] = useState({
    y: MathUtils.randFloatSpread(height * 2),
    x: MathUtils.randFloatSpread(2),
    spin: MathUtils.randFloat(8, 12),
    rX: Math.random() * Math.PI,
    rZ: Math.random() * Math.PI,
  });

  useEffect(() => {
    document.body.style.cursor = hovered ? "pointer" : "default";
  }, [hovered]);

  useFrame((state, dt) => {
    if (dt < 0.1)
      ref.current!.position.set(
        index === 0 ? 0 : data.x * width,
        (data.y += dt * speed),
        -z,
      );

    ref.current!.rotation.set(
      (data.rX += dt / data.spin),
      Math.sin(index * 1000 + state.clock.elapsedTime / 10) * Math.PI,
      (data.rZ += dt / data.spin),
    );

    if (data.y > height * (index === 0 ? 4 : 1))
      data.y = -(height * (index === 0 ? 4 : 1));
  });

  return (
    <group
      {...props}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      <Select enabled={isActive}>
        <Detailed ref={ref} distances={[0, maxDepth / 2, maxDepth]}>
          <Model.near />
          <Model.mid />
          <Model.far />
        </Detailed>
      </Select>
    </group>
  );
}
