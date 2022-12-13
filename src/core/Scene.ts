import IScene, { ScenesProps } from "../interfaces/IScene";

export class Scene implements IScene {
  id?: string;
  name: string;
  desc: string;
  cover: string;
  angleOfView?: Record<string, unknown>;
  logo: string;
  constructor(param: ScenesProps) {
    this.id = param?.id;
    this.name = param.name;
    this.desc = param.desc;
    this.cover = param.cover;
    this.angleOfView = param.angleOfView;
    this.logo = param.logo;
  }
  createScene() { return this };
  updateScene() { return this };
  deleteScene() { return true };
  getSceneById(id: string) {
    // let scene = getSceneByIdRequest(id);
    return this
  };
  getAllScenes() { return [] };
}
