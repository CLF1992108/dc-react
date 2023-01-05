import { addScene, delScene, editScene, getSceneList, SceneProps, upload, UploadResProps } from "../api/gisReq";
import { hcEditor } from "../store/HcEditor";
import { dataURLtoFile } from "../utils/util";
import { ViewProps } from "../views/Scenes";

export class Scene {
  private id?: number | undefined;
  private name: string;
  private remark: string;
  private cover: string;
  private view: ViewProps;
  private logo: string;
  private static instance: Scene;
  private constructor(param: SceneProps) {
    this.id = param?.id;
    this.name = param.name;
    this.remark = param.remark;
    this.cover = param.cover;
    this.view = param.view as ViewProps;
    this.logo = param.logo;
  }
  set Id(v: number | undefined) {
    this.id = v
  }
  get Id() {
    return this.id
  }
  set Name(v: string) {
    this.name = v
  }
  get Name() {
    return this.name
  }
  set Remark(v: string) {
    this.remark = v
  }
  get Remark() {
    return this.remark
  }
  set Cover(v: string) {
    this.cover = v
  }
  get Cover() {
    return this.cover
  }
  set View(v: ViewProps) {
    this.view = v
  }
  get View() {
    return this.view
  }
  set Logo(v: string) {
    this.logo = v
  }
  get Logo() {
    return this.logo
  }
  syncParam(param: SceneProps) {
    for (const key in param) {
      this[key] = param[key]
    }
  }
  resyncParam(param: SceneProps) {
    for (const key in param) {
      param[key] = this[key]
    }
    return param
  }
  async uploadImg(name: string) {
    const canvas = hcEditor.Viewer.canvas, img = new Image();
    let file, urlRes: UploadResProps | null, url;
    hcEditor.Viewer.scene.render();
    img.src = canvas.toDataURL("image/png");
    file = dataURLtoFile(img.src, name)
    urlRes = await upload(file)
    if (urlRes) {
      url = ASSET_URL + urlRes.url
    }
    return url
  }
  async setCover() {
    this.cover = await this.uploadImg("封面") ?? "";
    return this.cover
  }
  async setView() {
    const position = DC.Transform.transformCartesianToWGS84(hcEditor.Viewer.camera.positionWC);
    this.view = {
      url: await this.uploadImg("初始视角") ?? "",
      lng: position.lng,
      lat: position.lat,
      alt: position.alt,
    }
    return this.view
  }
  async saveScene() {
    let res
    const param = {
      name: this.name,
      remark: this.remark,
      cover: this.cover,
      logo: this.logo,
      view: this.view
    }
    if (this.id) {
      res = await editScene(this.id, param)
    } else {
      res = await addScene(param)
    }

    return res
  };
  async updateScene(param: SceneProps) {
    const res = await addScene(param)
    return res
  };
  async deleteScene(id: string) {
    const res = await delScene(id)
    return res
  };
  static async getInstance(params: SceneProps | string) {
    let sceneProps: SceneProps | null;
    if (!Scene.instance) {
      if (typeof params === "string") {
        const filter = { id: params }
        let res = await getSceneList({ filter: JSON.stringify(filter) })

        sceneProps = res && res[0]
        PubSub.publish('VIEW', sceneProps);
        if (!sceneProps) {
          console.error("未找到对象");
          return null
        }
      } else {
        sceneProps = params;
      }
      Scene.instance = new Scene(sceneProps)
    }

    return Scene.instance
  };
  getAllScenes() { return [] };
}
