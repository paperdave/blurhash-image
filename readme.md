# ultra minified blurhash-image

this is a fork of a project to create a custom `blurhash-image` element that allows for easy embedding of [blurhashes](https://blurha.sh/) on the web. the idea is you inline the script with your html, and javascript generates the image displayed, which runs **before** the first paint.

in davecode.net, i use this technique with server side rendering and client side svelte, where this element is rendered, but once the client javascript is loaded the real image is displayed.

note that this is **only** the blurhash component and doesn't handle displaying your actual image, it also may not be 100% color-accurate to your real blurhash, though any difference is too minor to notice with your eye.

## install

because this is intended to be embedded into EVERY page, i wanted it to be as small as possible, so i present a manual assisted **1132 byte** minification. it's on npm, or inside of blurhash-image.min.js, or pasted below

```sh
npm install blurhash-image
```

<!-- prettier-ignore -->
```ts
{let e,t=12,a=255,l=.055,s=1+l,{max:r,min:n,PI:i,cos:c,round:m,sign:o}=Math,d=e=>[...e].reduce(((e,t)=>83*e+"0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz#$%*+,-.:;=?@[]^_{|}~".indexOf(t)),0);class h extends HTMLElement{connectedCallback(){let h=this.getAttribute("blurhash"),u=document.createElement("canvas"),b=u.getContext("2d"),g=d(h[0]),f=1+(g/9|0),p=g%9+1,x=(d(h[1])+1)/166,C=[],k=new Uint8Array(256),y=0,A=b.createImageData(8,8);u.width=u.height=8;for(let r=0;r<p*f;r++)C[r]=r?(e=d(h.slice(4+2*r,6+2*r)),[e/361|0,(e/19|0)%19,e%19,a].map((e=>(e-9)/9)).map((e=>o(e)*e**2*x))):(e=d(h.slice(2,6)),[e>>16,e>>8&a,e&a,a].map((r=>(e=r/a,e<=4/99?e/t:((e+l)/s)**2.4)))),C[r][3]=1;for(let o=0;o<8;o++)for(let d=0;d<8;d++){e=[0,0,0,1];for(let t=0;t<f;t++)for(let a=0;a<p;a++){let l=c(i*d*a/8)*c(i*o*t/8);e=e.map(((e,s)=>e+C[a+t*p][s]*l))}e.map((i=>k[y++]=(e=r(0,n(1,i)),m((e<=1/319?e*t:s*e**.41-l)*a+.5))))}A.data.set(k),b.putImageData(A,0,0),this.style.background=`url("${u.toDataURL()}")0 0/100%`}attributeChangedCallback(e,t,a){a||(this[e]=t)}}h.observedAttributes=["style"],customElements.define("blurhash-image",h)}
```

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

if you want to, go ahead; tell me if you get it any smaller without losing functionality, that wouldn be cool.

## license

MIT Licensed, though I do not think anyone will care if you do not redistribute this with the license which is literally larger than the actual code. though, note that i am derriving code off of [dtinth's code](https://github.com/dtinth/blurhash-image), which i just optimized. there is some inlined code sourced from [blurhash's js encoder](https://github.com/woltapp/blurhash/tree/master/TypeScript). both of these are also licensed under MIT.
