import { Object3D, Material } from "three"
import { ThreeElements } from "@react-three/fiber"

export interface GLTFResult {
    nodes: {
      [key: string]: Object3D
    }
    materials: {
      [key: string]: Material
    }
  }

  export interface DecimatedModel {
    Near: React.ComponentType<ThreeElements["group"]>
    Mid: React.ComponentType<ThreeElements["group"]>
    Far: React.ComponentType<ThreeElements["group"]>
  }