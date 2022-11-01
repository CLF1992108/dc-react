export class Widget {
  title: string;
  icon: string;
  json: Record<string, string> = {}
  position: [];
  constructor() { }
  render() {
    //json -panel
  }
  render2d() { }
  render3d() { }
}
class Widget2 extends Widget {
  points: []
}
