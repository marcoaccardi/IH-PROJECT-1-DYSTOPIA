const sideCanvas = (sketch) => {
  sketch.setup = () => {
    sketch.createCanvas(window.innerWidth*.3, window.innerHeight);
    
    sketch.stroke(255);
    sketch.noFill();
  };

  sketch.draw= () => {
    sketch.background(0);
    for (let i = 0; i < 200; i += 20) {
      sketch.bezier(
        sketch.mouseX - i / 2.0,
        40 + i,
        410,
        20,
        440,
        300,
        240 - i / 16.0,
        300 + i / 8.0
      );
    }
  };
};




