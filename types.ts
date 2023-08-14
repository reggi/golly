import type { GollyElement } from "./golly_element.ts"
import type { GollyTextNode } from "./golly_text_node.ts"

export { GollyElement, GollyTextNode }
export type Props = Record<string, string | undefined>
export type ChildrenPrimitive = GollyTextNode | undefined | GollyElement
export type Children = ChildrenPrimitive | ChildrenPrimitive[]
export type ChildrenArray = ChildrenPrimitive[]
export type ChildrenArrayNonNull = (GollyTextNode | GollyElement)[]
export type Parameter = undefined | string | Props | Children
export type ParameterResolve = { tag?: string, children?: ChildrenArray, props?: Props }