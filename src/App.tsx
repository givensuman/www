import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { AdaptiveDpr, AdaptiveEvents, Environment } from "@react-three/drei";
import { useRef } from "react";
import { Vector3 } from "three";

import Scene, { DEPTH_OF_FIELD } from "./lib/Scene";
import Overlay from "./lib/Overlay";
import useTheme from "./lib/Theme";

function Rig() {
  const { camera, pointer } = useThree();
  const position = useRef(new Vector3());

  useFrame(() => {
    position.current.x =
      camera.position.x + (pointer.x * 2 - camera.position.x) * 0.1;
    position.current.y = camera.position.y;
    position.current.z = camera.position.z;

    camera.position.copy(position.current);
  });

  return null;
}

export default function App() {
  const [theme] = useTheme();

  return (
    <>
      <Overlay />
      <Canvas
        dpr={[1, 2]}
        flat
        gl={{ antialias: false }}
        camera={{ position: [0, 0, 10], fov: 20, near: 0.01, far: 80 + 15 }}
        style={{
          height: "100vh",
          width: "100vw",
        }}
      >
        <color attach="background" args={[theme.background]} />
        <ambientLight
          color={theme.lighting}
          intensity={0.5}
          position={[0, 0, DEPTH_OF_FIELD / 2]}
        />
        <spotLight
          position={[10, 20, 10]}
          penumbra={1}
          decay={0}
          intensity={3}
          color={theme.lighting}
        />
        <Environment preset="apartment" />
        <AdaptiveDpr pixelated />
        <AdaptiveEvents />
        <Rig />
        <Scene />
      </Canvas>
    </>
  );
}
