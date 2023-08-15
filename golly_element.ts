import { Children, Props } from "./types.ts"
import { ChildrenArrayNonNull } from "./types.ts";
import { isNotUndefined, processParameter, toHtmlAttributes } from "./utilities.ts";
import { GollyTextNode } from './golly_text_node.ts'

export class GollyElement {
  cleanChildren (children?: Children): ChildrenArrayNonNull {
    const flat = [children].flat()
    return flat ? flat?.filter(isNotUndefined) || [] : []
  }

  tag = '';
  props: Props = {};
  #children: ChildrenArrayNonNull = [];

  constructor(
    tagOrPropsOrChildren?: string | Props | Children,
    propsOrChildren?: string | Props | Children,
    children?: string | Children
  ) {
    const props = {
      ...processParameter(tagOrPropsOrChildren, true),
      ...processParameter(propsOrChildren),
      ...processParameter(children),
    }
    this.tag = props.tag || ''
    this.props = props.props || {}
    this.#children = this.cleanChildren(props.children)
    this.clone = this.clone.bind(this)
    this.cloneNode = this.cloneNode.bind(this)
  }
  get attributeString () {
    return toHtmlAttributes(this.props)
  }
  get opening () {
    const { tag, attributeString } = this
    if (!tag) return ''
    if (!attributeString) return `<${tag}>`
    return `<${tag} ${attributeString}>`
  }
  get closing () {
    const { tag } = this
    if (!tag) return ''
    return `</${tag}>`
  }
  prependChild (children: Children) {
    const oldChildren = this.#children
    const newChildren = this.cleanChildren(children)
    this.children = [...newChildren, ...oldChildren]
    return this
  }
  appendChild (children: Children) {
    const oldChildren = this.#children
    const newChildren = this.cleanChildren(children)
    this.children = [...oldChildren, ...newChildren]
    return this
  }
  setAttribute (key: string, value?: string) {
    this.props[key] = value || ''
  }
  set children (children: Children) {
    this.#children = this.cleanChildren(children)
  }
  get children (): ChildrenArrayNonNull {
    return this.#children
  }
  get node (): [
    string,
    ChildrenArrayNonNull,
    string,
  ] {
    return [
      this.opening,
      this.children,
      this.closing,
    ]
  }
  cloneNode (props?: Props, children?: Children) {
    const c = children ? [children].flat() : []
    const ch = [...(this.children || []), ...c]
    return new GollyElement(this.tag, {...this.props, ...props}, ch)
  }
  clone = this.cloneNode
  toString(indentLevel = 0): string {
    const indentation = '  '.repeat(indentLevel);
    if (!this.tag) {
      const children = this.children.map(v => v.toString(indentLevel)).join('\n');
      return children 
    }
    const children = this.children.map(v => v.toString(indentLevel + 1)).join('\n');
    if (this.children.length === 1 && this.children[0] instanceof GollyTextNode || typeof this.children[0] === 'string') {
      return `${indentation}${this.opening}${children}${this.closing}`;
    }
    if (children) return `${indentation}${this.opening}\n${children}\n${indentation}${this.closing}`;
    return `${indentation}${this.opening}${this.closing}`;
  }
}
