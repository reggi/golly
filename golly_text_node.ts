export class GollyTextNode {
  constructor (public text?: string) {}
  toString (indentLevel = 0) {
    const indentation = '  '.repeat(indentLevel);
    return this.text ? `${indentation}${this.text}` : []
  }
}