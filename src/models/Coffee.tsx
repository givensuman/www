/*
Artist: Blizzy (https://sketchfab.com/jeffbas)
License: SKETCHFAB Standard (https://sketchfab.com/licenses)
Source: https://sketchfab.com/3d-models/coffee-cup-ce14e184dce0440ebf21246ae876fca6
*/

import { useGLTF } from "@react-three/drei";
import { Mesh } from "three";

import modelFactory from "../lib/modelFactory";
import { type GLTFResult, type ModelProps } from "../lib/types";

export function Model({ distance, ...props }: ModelProps) {
  const { nodes, materials } = useGLTF(
    `/coffee/${distance}.glb`,
  ) as unknown as GLTFResult;

  return (
    <group {...props} dispose={null}>
      <group
        position={[0.069, 0.253, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={1.5}
      >
        <group rotation={[Math.PI / 2, 0, 0]}>
          <mesh
            castShadow
            receiveShadow
            geometry={(nodes.coffee1_lambert3_0 as Mesh).geometry}
            material={materials.lambert3}
            scale={0.01}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/coffee/near.glb");
useGLTF.preload("/coffee/mid.glb");
useGLTF.preload("/coffee/far.glb");

const Coffee = modelFactory(Model);

export default Coffee;
