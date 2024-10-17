import Point from "./point.js";

export default class Line {
  constructor(pt1, pt2) {
    this.pt1 = pt1;
    this.pt2 = pt2;
  }

  draw(ctx, color = "#000") {
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = 10;
    ctx.moveTo(this.pt1.x, this.pt1.y);
    ctx.lineTo(this.pt2.x, this.pt2.y);
    ctx.stroke();
  }

  getIntersectionPtBetweenTwoLines(other_line) {
    let l1 = this;
    let l2 = other_line;
    let a1 = l1.pt2.y - l1.pt1.y;
    let b1 = l1.pt1.x - l1.pt2.x;
    let c1 = a1 * l1.pt1.x + b1 * l1.pt1.y;

    let a2 = l2.pt2.y - l2.pt1.y;
    let b2 = l2.pt1.x - l2.pt2.x;
    let c2 = a2 * l2.pt1.x + b2 * l2.pt1.y;

    let delta = a1 * b2 - a2 * b1;
    // let x = (b2 * c1 - b1 * c2) / delta;
    // let y = (a1 * c2 - a2 * c1) / delta;
    // let pt = new Point(x, y);
    let pt = new Point((b2 * c1 - b1 * c2) / delta, (a1 * c2 - a2 * c1) / delta);
    return pt;
  }
}
