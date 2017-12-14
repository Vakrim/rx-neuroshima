import Behavior, { IHasBehaviors } from "../Behavior";
import Actor from "../Actor";
import { rendererAdress } from "../actors/Renderer";
import { NewActorMessage } from "../Message";

export default class Querable extends Behavior {
  afterCreation(actor: Actor) {
    actor.send(rendererAdress, {
      type: 'NewActor',
      actor
    })
  }

  beforeDestroy(actor: Actor) {
    actor.send(rendererAdress, {
      type: 'ActorWillBeDestroyed',
      actor
    })
  }
}

export interface IQuerable extends IHasBehaviors {
  querable: Querable
}

export const addQuerable = (actor: IQuerable, querable: Querable) => {
  actor.querable = querable;
  actor.behaviors.push(querable)
}
