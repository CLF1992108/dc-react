export interface ScenesProps {
  id?: string;
  name: string;
  desc: string;
  cover: string;
  angleOfView?: Record<string, unknown>;
  logo: string;
}
interface IScene {
  id?: string;
  name: string;
  desc: string;
  cover: string;
  angleOfView?: Record<string, unknown>;
  logo: string;

  createScene(): IScene;
  updateScene(): IScene;
  deleteScene(): boolean;
  getSceneById(id: string): IScene;
  getAllScenes(): IScene[];
}
export default IScene
