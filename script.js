let canvas = document.querySelector('canvas');

let illo;
let ringGroup;
let rings = [];
let ringCount = 77;
let ringDiameter = 800;

illo = new Zdog.Illustration({
  element: canvas,
  dragRotate: true });


ringGroup = new Zdog.Group({ addTo: illo });

ringGroup.render = function (ctx) {
  ctx.globalCompositeOperation = 'screen';
  Zdog.Group.prototype.render.apply(this, arguments);
};

for (let i = 0; i < ringCount; i++) {
  let p = i / (ringCount - 1);
  rings.push({
    shape: new Zdog.Ellipse({
      addTo: ringGroup,
      diameter: Math.sin(p * Zdog.TAU / 2) * ringDiameter / 2,
      translate: { z: Math.cos(p * Zdog.TAU / 2) * ringDiameter / 4 },
      color: `hsla(${Calc.map(p, 0, 1, 180, 360)}, 90%, 50%, 1)` }) });


}

function animate() {
  ringGroup.rotate.y -= 0.0001;
  ringGroup.rotate.x += 0.0001;

  for (let i = 0, len = rings.length; i < len; i++) {
    let ring = rings[i].shape;
    ring.stroke = Calc.map(Math.sin(Date.now() * 0.0001 + i * 0.2), -1, 1, 1, 3);
    ring.rotate.z += rings[i].spin;
  }

  illo.updateRenderGraph();
  window.requestAnimationFrame(animate);
}

animate();