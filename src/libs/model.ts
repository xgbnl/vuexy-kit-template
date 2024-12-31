import { HasAttribute } from '@/types/attributeTypes'

class Model implements HasAttribute {

  private readonly attributes: Record<string, any>

  public constructor(attributes: Record<string, any>) {
    this.attributes = attributes
  }

  getAttr<T extends HasAttribute | number | string | any[]>(attr: string): T {
    return this.attributes[attr]
  }
}

export default Model
