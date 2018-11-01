import ParseError from '../errors/ParseError'
import {IToken} from '../interface/Tokens'
import AbstractNode from '../nodes/abstract/AbstractNode'

export default function noParams<T extends { new (...args : any[]) : AbstractNode }> (target : T) : T {
  return class Final extends target {
    constructor (...args : any[]) {
      super(...args)
      if (args[0]) {
        const token = args[0] as IToken
        if (token.params) {
          throw new ParseError(`Unexpected parameter in ${args[0].type}`, token)
        }
      }
    }
  }
}
