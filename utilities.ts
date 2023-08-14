import { Props } from "./types.ts";
import { Parameter, ParameterResolve } from "./types.ts";
import { GollyElement } from "./golly_element.ts";
import { GollyTextNode } from "./golly_text_node.ts";

export function toNameAttribute(_value: (string | number)[]) {
  const value = _value.filter(isNotUndefined)
  const first = value.shift()
  return `${first}${value.map(v => `[${v}]`).join('')}`
}

export function toHtmlAttributes(props: Props) {
  return Object.entries(props)
    .map(([key, value]) => {
      if (!value) return key
      return `${key}="${value}"`
    })
    .join(' ');
}

export function isNotUndefined<T>(value: T | undefined): value is T {
  return value !== undefined;
}

export function processParameter (value: Parameter, stringIsTag?: boolean): ParameterResolve {
  if (value === undefined) {
    return {}
  } else if (typeof value === 'string') {
    if (stringIsTag) {
      if (value) return { tag: value }
    } else {
      if (value) return { children: [new GollyTextNode(value)] }
    }
  } else if (value instanceof GollyElement || value instanceof GollyTextNode) {
    return { children: [value] }
  } else if (Array.isArray(value)) {
    return { children: value }
  } else {
    return { props: value }
  }
  return {}
}