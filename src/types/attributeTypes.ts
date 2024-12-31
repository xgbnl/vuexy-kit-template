export interface HasAttribute {
  getAttr<T extends HasAttribute | number | string | any[]>(attr: string): T;
}
