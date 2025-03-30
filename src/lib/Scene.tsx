import { DepthOfField, EffectComposer, Outline, Select, ToneMapping } from "@react-three/postprocessing";
import { Selection } from "@react-three/postprocessing";
import { ThreeElements, useFrame } from "@react-three/fiber";
import { useState, useRef } from "react";
import { useThree } from "@react-three/fiber";
import { Detailed } from "@react-three/drei";
import { LOD, MathUtils } from "three";

import Computer from "../models/Computer";
import { DecimatedModel } from "./types";

const DEPTH_OF_FIELD = 80;

export default function Scene({
    count = 80,
    depth = DEPTH_OF_FIELD,
    easing = (x: number) => Math.sqrt(1 - Math.pow(x - 1, 2)),
    ...props
}: {
    count?: number,
    depth?: number,
    easing?: (x: number) => number,
} & ThreeElements["group"]) {
    return (
        <group {...props}>
            <Selection>
                <EffectComposer multisampling={8} autoClear={false}>
                    <Outline blur visibleEdgeColor={0xffffff} edgeStrength={100} width={1000} />
                    <DepthOfField target={[0, 0, depth]} focalLength={0.4} bokehScale={14} height={700} />
                    <ToneMapping />
                </EffectComposer>
                {Array.from({
                    length: count
                }, (_, i) => (
                    <SceneMember model={Computer} index={i} z={Math.round(easing(i / count) * depth)} />
                ))}
            </Selection>
        </group>
    )
}

function SceneMember({
    model: Model,
    index,
    z,
    speed = 0.5,
    maxDepth = DEPTH_OF_FIELD,
    ...props
}: {
    model: DecimatedModel,
    index: number,
    z: number,
    maxDepth?: number,
    speed?: number,
} & ThreeElements["group"]) {
    const ref = useRef<LOD>(null);
    const { viewport, camera } = useThree()
    const { width, height } = viewport.getCurrentViewport(camera, [0, 0, -z])

    const [hovered, setHover] = useState<boolean | null>(null);

    const [data] = useState({
      y: MathUtils.randFloatSpread(height * 2),
      x: MathUtils.randFloatSpread(2),
      spin: MathUtils.randFloat(8, 12),
      rX: Math.random() * Math.PI,
      rZ: Math.random() * Math.PI
    })

    useFrame((state, dt) => {
        if (dt < 0.1) 
            ref.current!.position.set(index === 0 ? 0 : data.x * width, (data.y += dt * speed), -z)
        
        ref.current!.rotation.set((data.rX += dt / data.spin), Math.sin(index * 1000 + state.clock.elapsedTime / 10) * Math.PI, (data.rZ += dt / data.spin))
        
        if (data.y > height * (index === 0 ? 4 : 1)) 
            data.y = -(height * (index === 0 ? 4 : 1))
      })

    return (
        <group 
            {...props}
            onPointerEnter={() => setHover(true)}
            onPointerLeave={() => setHover(false)}
        >
            <Select enabled={hovered!}>
                <Detailed ref={ref} distances={[0, maxDepth * 0.5, maxDepth]}>
                    <Model.Near />
                    <Model.Mid />
                    <Model.Far />
                </Detailed>
            </Select>
        </group>
    )
}