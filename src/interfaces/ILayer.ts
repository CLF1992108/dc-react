export interface ILayer {
  id?: string;
  name: string;
  color: string;
  width: number;
  add: (params: Record<string, unknown>) => ILayer;
  update: (id: string, params: Record<string, unknown>) => ILayer;
  deleteById: (id: string) => boolean;
  getLayerById: (id: string) => ILayer;
}
