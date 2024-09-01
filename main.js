var inc = 0.07;
var scl = 10;
var cols, rows;
var zoff = 0;
var particles = [];
var flowfield;
var animationRunning = true; // To control the animation state

function setup() {
  createCanvas(3840, 2160);
  cols = floor(width / scl);
  rows = floor(height / scl);
  flowfield = new Array(cols * rows);

  for (var i = 0; i < 4500; i++) {
    particles[i] = new Particle();
  }
  background(0);
}

function draw() {
  if (!animationRunning) return;

  var yoff = 0;
  for (var y = 0; y < rows; y++) {
    var xoff = 0;
    for (var x = 0; x < cols; x++) {
      var index = x + y * cols;
      var angle = noise(xoff, yoff, zoff) * TWO_PI * 4;
      var v = p5.Vector.fromAngle(angle);
      v.setMag(1);
      flowfield[index] = v;
      xoff += inc;
    }
    yoff += inc;
    zoff += 0.0003;
  }

  for (var i = 0; i < particles.length; i++) {
    particles[i].follow(flowfield);
    particles[i].update();
    particles[i].edges();
    particles[i].show();
  }
}

document.getElementById("menuToggle").addEventListener("click", function () {
  this.classList.toggle("active");
});

document.getElementById("stopButton").addEventListener("click", function () {
  animationRunning = !animationRunning;
  this.textContent = animationRunning ? "Stop Animation" : "Start Animation";
});

document.getElementById("saveButton").addEventListener("click", function () {
  let originalWidth = width;
  let originalHeight = height;

  // Temporarily set the canvas to the desired resolution if it differs from the display size
  resizeCanvas(3840, 2160);
  draw(); // Re-render the flow field at the higher resolution
  saveCanvas("flowfield", "jpg");

  // Restore the original canvas size if needed
  resizeCanvas(originalWidth, originalHeight);
});
