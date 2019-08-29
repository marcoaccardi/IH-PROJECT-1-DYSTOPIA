let windowW = 500;
let windowH = 500;
let isLoaded = false;
let glitch;
let imgSrc =
  "https://www-tc.pbs.org/wgbh/nova/media/images/nova-wonders-can-we-build-a-brain-hero_xn7Rr8X.width-800.jpg";

const sideCanvas = sketch => {
  sketch.preload = () => preload(sketch);

  sketch.setup = () => {
    // anal();
    sketch.background(0);
    sketch.createCanvas(windowW, windowH);
    sketch.loadImage(imgSrc, function(img) {
      glitch = new Glitch(img);
      isLoaded = true;
    });
  };

  sketch.draw = () => {
    sketch.clear();
    sketch.background(0);

    if (isLoaded) {
      glitch.show();
    }
  };

  ///////////////////////////////////////////////////
  class Glitch {
    constructor(img) {
      this.channelLen = 4;
      this.imgOrigin = img;
      this.imgOrigin.loadPixels();
      this.copyData = [];
      this.flowLineImgs = [];
      this.shiftLineImgs = [];
      this.shiftRGBs = [];
      this.scatImgs = [];
      this.throughFlag = true;
      this.copyData = new Uint8ClampedArray(this.imgOrigin.pixels);

      // flow line
      for (let i = 0; i < 1; i++) {
        let o = {
          pixels: null,
          // t1: floor(random(0, 1000)),
          t1: sketch.floor(rmsTOne),
          // speed: floor(random(4, 24)),
          speed: 4 + sketch.floor(rmsSpeed),
          // randX: floor(random(24, 80))
          randX: 24 + sketch.floor(rmsRandX)
        };
        this.flowLineImgs.push(o);
      }

      // shift line
      for (let i = 0; i < 6; i++) {
        let o = null;
        this.shiftLineImgs.push(o);
      }

      // shift RGB
      for (let i = 0; i < 1; i++) {
        let o = null;
        this.shiftRGBs.push(o);
      }

      // scat imgs
      for (let i = 0; i < 3; i++) {
        let scatImg = {
          img: null,
          x: 0,
          y: 0
        };
        this.scatImgs.push(scatImg);
      }
    }
    //////////////////////////////////////////////////
    replaceData(destImg, srcPixels) {
      for (let y = 0; y < destImg.height; y++) {
        for (let x = 0; x < destImg.width; x++) {
          let r, g, b, a;
          let index;
          index = (y * destImg.width + x) * this.channelLen;
          r = index;
          g = index + 1;
          b = index + 2;
          a = index + 3;
          destImg.pixels[r] = srcPixels[r];
          destImg.pixels[g] = srcPixels[g];
          destImg.pixels[b] = srcPixels[b];
          destImg.pixels[a] = srcPixels[a];
        }
      }

      destImg.updatePixels();
    }

    flowLine(srcImg, obj) {
      let destPixels, tempY;
      destPixels = new Uint8ClampedArray(srcImg.pixels);
      obj.t1 %= srcImg.height;
      obj.t1 += obj.speed;
      tempY = sketch.floor(sketch.noise(obj.t1) * srcImg.height);
      // tempY = floor(obj.t1);
      for (let y = 0; y < srcImg.height; y++) {
        if (tempY === y) {
          for (let x = 0; x < srcImg.width; x++) {
            let r, g, b, a;
            let index;
            index = (y * srcImg.width + x) * this.channelLen;
            r = index;
            g = index + 1;
            b = index + 2;
            a = index + 3;
            destPixels[r] = srcImg.pixels[r] + obj.randX;
            destPixels[g] = srcImg.pixels[g] + obj.randX;
            destPixels[b] = srcImg.pixels[b] + obj.randX;
            destPixels[a] = srcImg.pixels[a];
          }
        }
      }
      return destPixels;
    }
    //SHIFT LINE
    shiftLine(srcImg) {
      let offsetX;
      let rangeMin, rangeMax;
      let destPixels;
      let rangeH;

      destPixels = new Uint8ClampedArray(srcImg.pixels);
      rangeH = srcImg.height;
      // rangeMin = floor(random(0, rangeH));
      rangeMin = sketch.floor(rmsRangeMin);
      // rangeMax = rangeMin + floor(random(1, rangeH - rangeMin));
      rangeMax = sketch.floor(rmsRangeMin) + sketch.floor(rangeH - rmsRangeMin);

      // offsetX = this.channelLen * floor(random(-40, 40));
      offsetX = this.channelLen * sketch.floor((rmsOffSetX - 40 / 2) * 2);
      // console.log(offsetX);

      for (let y = 0; y < srcImg.height; y++) {
        if (y > rangeMin && y < rangeMax) {
          for (let x = 0; x < srcImg.width; x++) {
            let r, g, b, a;
            let r2, g2, b2;
            let index;

            index = (y * srcImg.width + x) * this.channelLen;
            r = index;
            g = index + 1;
            b = index + 2;
            a = index + 3;
            r2 = r + offsetX;
            g2 = g + offsetX;
            b2 = b + offsetX;
            destPixels[r] = srcImg.pixels[r2];
            destPixels[g] = srcImg.pixels[g2];
            destPixels[b] = srcImg.pixels[b2];
            destPixels[a] = srcImg.pixels[a];
          }
        }
      }
      return destPixels;
    }

    shiftRGB(srcImg) {
      let randR, randG, randB;
      let destPixels;
      let range;

      // range = rmsRand;
      destPixels = new Uint8ClampedArray(srcImg.pixels);
      randR =
        // (floor(random(-range, range)) * srcImg.width +
        //   floor(random(-range, range))) *
        // this.channelLen;
        (sketch.floor((rmsRand - 16 / 2) * 4) * srcImg.width +
          sketch.floor((rmsRand - 16 / 2) * 4)) *
        this.channelLen;

      randG =
        // (floor(random(-range, range)) * srcImg.width +
        //   floor(random(-range, range))) *
        // this.channelLen;
        (sketch.floor((rmsRand - 16 / 2) * 4) * srcImg.width +
          sketch.floor((rmsRand - 16 / 2) * 4)) *
        this.channelLen;

      randB =
        // (floor(random(-range, range)) * srcImg.width +
        //   floor(random(-range, range))) *
        // this.channelLen;
        (sketch.floor((rmsRand - 16 / 2) * 4) * srcImg.width +
          sketch.floor((rmsRand - 16 / 2) * 4)) *
        this.channelLen;

      for (let y = 0; y < srcImg.height; y++) {
        for (let x = 0; x < srcImg.width; x++) {
          let r, g, b, a;
          let r2, g2, b2, a2;
          let index;

          index = (y * srcImg.width + x) * this.channelLen;
          r = index;
          g = index + 1;
          b = index + 2;
          a = index + 3;
          r2 = (r + randR) % srcImg.pixels.length;
          g2 = (g + randG) % srcImg.pixels.length;
          b2 = (b + randB) % srcImg.pixels.length;
          destPixels[r] = srcImg.pixels[r2];
          destPixels[g] = srcImg.pixels[g2];
          destPixels[b] = srcImg.pixels[b2];
          destPixels[a] = srcImg.pixels[a];
        }
      }

      return destPixels;
    }

    getRandomRectImg(srcImg) {
      let startX;
      let startY;
      let rectW;
      let rectH;
      let destImg;
      // startX = floor(random(0, srcImg.width - 30));
      startX = sketch.floor(rmsStartX);
      // startY = floor(random(0, srcImg.height - 50));
      startY = sketch.floor(rmsStartY);
      // rectW = floor(random(30, srcImg.width - startX));
      rectW = sketch.floor(30 + srcImg.width - startX);
      // rectH = floor(random(1, 50));
      rectH = sketch.floor(rmsRectH);
      destImg = srcImg.get(startX, startY, rectW, rectH);
      destImg.loadPixels();

      return destImg;
    }

    show() {
      // restore the original state
      this.replaceData(this.imgOrigin, this.copyData);

      // sometimes pass without effect processing
      // let n = floor(random(100));
      let n = sketch.floor(rmsN);
      if (n > 75 && this.throughFlag) {
        this.throughFlag = false;
        setTimeout(() => {
          this.throughFlag = true;
          // }, floor(random(40, 400)));
        }, sketch.floor(rmsNTime));
      }
      if (!this.throughFlag) {
        sketch.push();
        sketch.translate(
          (sketch.width - this.imgOrigin.width) / 2,
          (sketch.height - this.imgOrigin.height) / 2
        );
        sketch.image(this.imgOrigin, 0, 0);
        sketch.pop();
        return;
      }

      // flow line
      this.flowLineImgs.forEach((v, i, arr) => {
        arr[i].pixels = this.flowLine(this.imgOrigin, v);
        if (arr[i].pixels) {
          this.replaceData(this.imgOrigin, arr[i].pixels);
        }
      });

      // shift line
      //DEPENDING ON THRESHOLD ACCESS THE BLOCK
      if (rms > thresh) {
        this.shiftLineImgs.forEach((v, i, arr) => {
          if (sketch.floor(sketch.random(100)) > 50) {
            arr[i] = this.shiftLine(this.imgOrigin);
            this.replaceData(this.imgOrigin, arr[i]);
          } else {
            if (arr[i]) {
              this.replaceData(this.imgOrigin, arr[i]);
            }
          }
        });
      }

      // shift rgb
      //DEPENDING ON THRESHOLD ACCESS THE BLOCK
      if (rms > thresh) {
        this.shiftRGBs.forEach((v, i, arr) => {
          if (sketch.floor(sketch.random(100)) > 65) {
            // if (floor(rmsScat) > 65) {
            arr[i] = this.shiftRGB(this.imgOrigin);
            this.replaceData(this.imgOrigin, arr[i]);
          }
        });
      }

      sketch.push();
      sketch.translate(
        (sketch.width - this.imgOrigin.width) / 2,
        (sketch.height - this.imgOrigin.height) / 2
      );
      sketch.image(this.imgOrigin, 0, 0);
      sketch.pop();

      // scat image
      //DEPENDING ON THRESHOLD ACCESS THE BLOCK
      if (rms > thresh) {
        this.scatImgs.forEach(obj => {
          sketch.push();
          sketch.translate(
            (sketch.width - this.imgOrigin.width) / 2,
            (sketch.height - this.imgOrigin.height) / 2
          );
          if (sketch.floor(sketch.random(100)) > 80) {
            obj.x = sketch.floor(
              sketch.random(
                -this.imgOrigin.width * 0.3,
                this.imgOrigin.width * 0.7
              )
            );
            obj.y = sketch.floor(
              sketch.random(-this.imgOrigin.height * 0.1, this.imgOrigin.height)
            );
            obj.img = this.getRandomRectImg(this.imgOrigin);
          }
          if (obj.img) {
            sketch.image(obj.img, obj.x, obj.y);
          }
          sketch.pop();
        });
      }
    }
  }
};
