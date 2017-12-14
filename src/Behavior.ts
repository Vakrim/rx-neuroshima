import { Message } from "./Message";
import Actor from "./Actor";

export default abstract class Behavior {
  afterCreation(actor: Actor):void {}
  receivedMessage(actor: Actor, message: Message):void {}
  beforeDestroy(actor: Actor):void {}
}

export interface IHasBehaviors {
  behaviors: Behavior[]
}
