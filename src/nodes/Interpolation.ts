import { ENodeType } from '../Types'
import { BaseNode } from './BaseNode'

export default class Interpolation extends BaseNode {
  constructor (start : number, end : number) {
    super(ENodeType.Interpolation, start, end, true)
  }
}
