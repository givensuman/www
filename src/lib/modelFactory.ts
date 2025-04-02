import type { ThreeElements } from "@react-three/fiber";
import type { JSX } from "react/jsx-runtime";

import type { ModelProps, DecimatedModel } from "./types";

type ModelFn = ({ distance, ...props }: ModelProps) => JSX.Element;

/**
 * Abstracts the creation of decimated meshes
 * as React components
 */
export default function modelFactory(model: ModelFn) {
  let decimatedModel: Partial<DecimatedModel> = {};

  (["near", "mid", "far"] as const).forEach((distance) => {
    decimatedModel[distance] = (props?: ThreeElements["group"]) =>
      model({ distance, ...props });
  });

  return decimatedModel as DecimatedModel;
}
