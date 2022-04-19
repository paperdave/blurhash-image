// This outer block is used to ensure terser mangles the variable names.
{
  class BlurhashImageElement extends HTMLElement {
    // all of the logic happens in connectedCallback, so it ended up being best to throw ALL the code
    // in here as well, as it saves space for variable declarations
    connectedCallback(
      // `box` stores a temporary value used later, but due to singlethreadedness, this is never
      // overwritten when it is still needed. it saves a couple characters instead of defining more than one variable.
      box,
      // Variables for reused numbers saves some characters
      n12_92 = 12,
      n255 = 255,
      n0_055 = 0.055,
      n1_055 = 1 + n0_055,
      // Destructuring `Math` saves some characters to use common functions,
      { max, min, PI, cos, round, sign } = Math,
      // `decode83` decodes base83, which is a part of the blurhash spec. it is done in one line
      // using a reduce function to avoid a for-loop
      decode83 = (str) =>
        [...str].reduce(
          (value, char) =>
            value * 83 +
            // i wish this giant string could get compressed. i tried.
            // number of hours spent here: 1
            "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz#$%*+,-.:;=?@[]^_{|}~" //
              .indexOf(char),
          0
        ),
      // the rest of these use to be inline variable declarations, but they are now inlined in the
      // parameter list, so "let " is no longer needed.
      blurhash = this.getAttribute("blurhash"),
      canvas = document.createElement("canvas"),
      ctx = canvas.getContext("2d"),
      sizeFlag = decode83(blurhash[0]),
      numY = ((sizeFlag / 9) | 0) + 1,
      numX = (sizeFlag % 9) + 1,
      maximumValue = (decode83(blurhash[1]) + 1) / 166,
      colors = [],
      pixels = new Uint8Array(8 * 8 * 4),
      indexOfPixelArr = 0,
      imageData = ctx.createImageData(8, (canvas.width = canvas.height = 8)),
      y,
      x,
      j,
      i
    ) {
      // box's value is used to store the decoded base83

      for (i = 0; i < numX * numY; i++) {
        // this array is set to a pixel color (rgba array)
        // but the A is always 1, so we wrap the entire assignment in *another* assignment
        // and set it to 1, which affects only the last value.

        (colors[i] = i
          ? ((box = decode83(blurhash.slice(4 + i * 2, 6 + i * 2))),
            [(box / (19 * 19)) | 0, ((box / 19) | 0) % 19, box % 19]
              .map((x) => (x - 9) / 9)
              .map((val) => sign(val) * val ** 2 * maximumValue))
          : ((box = decode83(blurhash.slice(2, 6))),
            [box >> 16, (box >> 8) & n255, box & n255].map(
              (x) => (
                (box = x / n255),
                box <= 0.4 ? box / n12_92 : ((box + n0_055) / n1_055) ** 2.4
              )
            )))[3] = 1;
      }

      // box's value is now used to store a pixel color

      for (y = 0; y < 8; y++) {
        for (x = 0; x < 8; x++) {
          box = [0, 0, 0, 1];

          // I forgot how this works, but it seems to grab every color blob
          // and average it out to where the pixel is.
          for (j = 0; j < numY; j++) {
            for (i = 0; i < numX; i++) {
              box = box.map(
                (z, v) =>
                  z +
                  colors[i + j * numX][v] *
                    cos((PI * x * i) / 8) *
                    cos((PI * y * j) / 8)
              );
            }
          }

          // clever map function to copy over the pixels to the imageData
          box.map(
            (x) =>
              (pixels[indexOfPixelArr++] =
                ((box = max(0, min(1, x))),
                round(
                  (box <= 1 / 319
                    ? box * n12_92
                    : n1_055 * box ** 0.41 - n0_055) *
                    n255 +
                    0.5
                )))
          );
        }
      }

      // two method calls that happen BEFORE the assignment are inside of the parameter
      // of this function, which saves 1 character. yeah this is stupid at this point, but funny.
      imageData.data.set(pixels);
      this.style.background = `url(${canvas.toDataURL(
        ctx.putImageData(imageData, 0, 0)
      )})0 0/100%`;
    }

    // Attribute modification defense part 1:
    // on davecode.net, svelte's hydration will kill our `.style` so this code disallows
    // removing .style
    attributeChangedCallback(name, oldValue, newValue) {
      if (!newValue) {
        this[name] = oldValue;
      }
    }
  }

  // Attribute modification defense part 2:
  // for `attributeChangedCallback` to work, we need to define `.observedAttributes`
  BlurhashImageElement.observedAttributes = ["style"];

  customElements.define("blurhash-image", BlurhashImageElement);
}
