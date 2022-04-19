# ultra minified blurhash-image

this is a fork of a project to create a custom `blurhash-image` element that allows for easy embedding of [blurhashes](https://blurha.sh/) on the web. the idea is you inline the script with your html, and javascript generates the image displayed, which runs **before** the first paint.

in davecode.net, i use this technique with server side rendering and client side svelte, where this element is rendered, but once the client javascript is loaded the real image is displayed.

note that this is **only** the blurhash component and doesn't handle displaying your actual image, it also may not be 100% color-accurate to your real blurhash, though any difference is too minor to notice with your eye.

## install

because this is intended to be embedded into EVERY page, i wanted it to be as small as possible, so i present a manual assisted **1088 byte** minification. it's on npm, or inside of blurhash-image.min.js, or pasted below

```sh
npm install blurhash-image
```

<!-- prettier-ignore -->
`{class e extends HTMLElement{connectedCallback(e,t=12,a=255,s=.055,r=1+s,{max:n,min:i,PI:c,cos:l,round:m,sign:o}=Math,d=(e=>[...e].reduce(((e,t)=>83*e+"0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz#$%*+,-.:;=?@[]^_{|}~".indexOf(t)),0)),h=this.getAttribute("blurhash"),u=document.createElement("canvas"),b=u.getContext("2d"),g=d(h[0]),f=1+(g/9|0),p=g%9+1,x=(d(h[1])+1)/166,C=[],k=new Uint8Array(256),y=0,A=b.createImageData(8,u.width=u.height=8),D,E,I,v){for(v=0;v<p*f;v++)(C[v]=v?(e=d(h.slice(4+2*v,6+2*v)),[e/361|0,(e/19|0)%19,e%19].map((e=>(e-9)/9)).map((e=>o(e)*e**2*x))):(e=d(h.slice(2,6)),[e>>16,e>>8&a,e&a].map((n=>(e=n/a)<=.4?e/t:((e+s)/r)**2.4))))[3]=1;for(D=0;D<8;D++)for(E=0;E<8;E++){for(e=[0,0,0,1],I=0;I<f;I++)for(v=0;v<p;v++)e=e.map(((e,t)=>e+C[v+I*p][t]*l(c*E*v/8)*l(c*D*I/8)));e.map((c=>k[y++]=(e=n(0,i(1,c)),m((e<=1/319?e*t:r*e**.41-s)*a+.5))))}A.data.set(k),this.style.background=`url(${u.toDataURL(b.putImageData(A,0,0))})0 0/100%`}attributeChangedCallback(e,t,a){a||(this[e]=t)}}e.observedAttributes=["style"],customElements.define("blurhash-image",e)}`

remember, it's intended to be INLINED to be run BEFORE all other javascript, not imported in a giant application. so you will notice that `import`ing the npm version gives you the script as a string, which is handy for templates and build scripts.

```ts
const blurhashImageScript = require("blurhash-image"); // returns a string

import blurhashImageScript from "blurhash-image"; // default import is a string
```

you of course can also just read `node_modules/blurhash-image/blurhash-image.min.js.

## usage

when using, you simply just include this in your markup:

```html
<blurhash-image blurhash="LKO2?U%2Tw=w]~RBVZRi};RPxuwH"></blurhash-image>
```

note that this only generates the image itself, and you will need to add your own styles to make it the right size and aspect ratio. see the `width`, `height` and `aspect-ratio` css properties.

a full example of using this is [the BlurHash component on davecode.net](https://github.com/davecaruso/davecode.net/blob/main/src/lib/components/BlurHash.svelte) which handles swapping from it to a real image but only if it is loaded, and includes a fade animation.

## further minification

if you want to, go ahead; tell me if you get it any smaller without losing functionality, that would be cool. in a sort of way, this is a fun code golfing challenge, but with an actual use. ... well beyond this point saves no percivable time, but its fun to think about.

## license

MIT Licensed, though I do not think anyone will care if you do not redistribute this with the license which is literally larger than the actual code. though, note that i am derriving code off of [dtinth's code](https://github.com/dtinth/blurhash-image), which i just optimized. there is some inlined code sourced from [blurhash's js encoder](https://github.com/woltapp/blurhash/tree/master/TypeScript). both of these are also licensed under MIT.
