var inc = 0.07;
var scl = 10;
var cols, rows;
var zoff = 0;
var particles = [];
var flowfield;
var animationRunning = true; // To control the animation state

function setup() {
  createCanvas(windowWidth, windowHeight);
  cols = floor(width / scl);
  rows = floor(height / scl);
  flowfield = new Array(cols * rows);

  for (var i = 0; i < 1000; i++) {
    particles[i] = new Particle();
  }
  background(0);
}

function draw() {
  if (!animationRunning) return; // Stop drawing if the animation is paused

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

// Handle window resizing
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  cols = floor(width / scl);
  rows = floor(height / scl);
  flowfield = new Array(cols * rows);

  // Optionally reset the particle positions (optional depending on desired effect)
  for (var i = 0; i < particles.length; i++) {
    particles[i].pos = createVector(random(width), random(height));
    particles[i].prevPos = particles[i].pos.copy(); // Reset their previous positions
  }
}

// Toggle menu functionality
document.getElementById("menuToggle").addEventListener("click", function () {
  this.classList.toggle("active");
});

// Stop button functionality
document.getElementById("stopButton").addEventListener("click", function () {
  animationRunning = !animationRunning;
  this.textContent = animationRunning ? "Stop Animation" : "Start Animation";
});

// Save button functionality
document.getElementById("saveButton").addEventListener("click", function () {
  saveCanvas("flowfield", "jpg");
});
