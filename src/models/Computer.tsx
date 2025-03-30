/*
Artist: Brandon Westlake (https://sketchfab.com/dr.badass2142)
License: SKETCHFAB Standard (https://sketchfab.com/licenses)
Source: https://sketchfab.com/3d-models/retro-computer-setup-free-82eaf2047e0447a1bfea22482f1d1404
*/

import { useGLTF } from "@react-three/drei"
import { ThreeElements } from "@react-three/fiber"
import { Mesh } from "three"

import { type GLTFResult, type DecimatedModel } from "../lib/types"

export function Near(props: ThreeElements["group"]) {
const { nodes, materials } = useGLTF('/computer/near.glb') as unknown as GLTFResult

return (
    <group {...props} dispose={null}>
        <mesh
            castShadow
            receiveShadow
            scale={0.025}
            geometry={(nodes.retro_computer_setup_retro_computer_setup_Mat_0 as Mesh).geometry}
            material={materials.retro_computer_setup_Mat}
            rotation={[-Math.PI / 2, 0, 0]}
        />
    </group>
)
}

export function Mid(props: ThreeElements["group"]) {
    const { nodes, materials } = useGLTF('/computer/mid.glb') as unknown as GLTFResult
    
    return (
        <group {...props} dispose={null}>
            <mesh
                castShadow
                receiveShadow
                scale={0.025}
                geometry={(nodes.retro_computer_setup_retro_computer_setup_Mat_0 as Mesh).geometry}
                material={materials.retro_computer_setup_Mat}
                rotation={[-Math.PI / 2, 0, 0]}
            />
        </group>
    )
}

export function Far(props: ThreeElements["group"]) {
    const { nodes, materials } = useGLTF('/computer/far.glb') as unknown as GLTFResult
    
    return (
        <group {...props} dispose={null}>
            <mesh
                castShadow
                receiveShadow
                scale={0.025}
                geometry={(nodes.retro_computer_setup_retro_computer_setup_Mat_0 as Mesh).geometry}
                material={materials.retro_computer_setup_Mat}
                rotation={[-Math.PI / 2, 0, 0]}
            />
        </group>
    )
}
    
useGLTF.preload('/computer/near.glb')
useGLTF.preload('/computer/mid.glb')
useGLTF.preload('/computer/far.glb')

const Computer: DecimatedModel = {
    Near,
    Mid,
    Far
}

export default Computer
