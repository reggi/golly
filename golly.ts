import { Children, Props } from "./types.ts";
import { GollyElement } from './golly_element.ts'

export class Golly {
  static createElement (
    tagOrPropsOrChildren?: string | Props | Children,
    propsOrChildren?: Props | Children,
    children?: Children,
  ) {
    return new GollyElement(tagOrPropsOrChildren, propsOrChildren, children)
  }
}
