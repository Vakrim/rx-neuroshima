import Actor from "../Actor";
import { Message } from "../Message";
import Querable, { IQuerable, addQuerable } from "../behaviors/Querable";
import { Subject } from "@reactivex/rxjs";

const herosAddress = Symbol('Heroes');

export default class Hero extends Actor implements IQuerable {
  querable: Querable

  constructor(world: Subject<Message>) {
    super(world);
    addQuerable(this, new Querable())
  }

  get additionalAdresses():Symbol[] {
    return [herosAddress];
  }
}
