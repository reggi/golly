# Golly

Golly is a html generator for server and client. 

## Why

I wanted a shared syntax for generating HTML that can be used on the server to generate static HTML, and for the client to use to generate dynamic html within a web-component. The best intersection for this is simply creating strings. 

Using tools like JSX and rendering them to a string are good for the backend, but add bloat when added to the front-end. When creating a web-component it's easy to manipulate the DOM directly which doesn't really translate to creating static HTML on the backend. 

## Example

```ts
import { Golly } from "./golly.ts"
const div = Golly.createElement('div', { id: 'app' })
div.appendChild(Golly.createElement('span', 'hello world'))
console.log(div.toString())
// <div id="app">
//   <span>
//     hello world
//   </span>
// </div>
```