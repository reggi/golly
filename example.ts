import { Golly } from "./golly.ts"

const div = Golly.createElement('div', { id: 'app' })
div.appendChild(Golly.createElement('span', 'hello world'))
console.log(div.toString())
// <div id="app">
//   <span>
//     hello world
//   </span>
// </div>
