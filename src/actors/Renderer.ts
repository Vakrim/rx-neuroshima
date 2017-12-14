import Actor from "../Actor";
import { Message } from "../Message";
import { Subject } from "@reactivex/rxjs";

export const rendererAdress = Symbol('Renderer adress');

export default class Renderer extends Actor {
  actors: Actor[] = []

  receivedMessage(message: Message) {
    switch(message.type) {
      case 'NewActor':
      this.actors.push(message.actor);
      break;
      case 'ActorWillBeDestroyed':
      this.actors = this.actors.filter(actor => actor != message.actor);
      break;
    }
    console.log(this.actors);
  }

  get additionalAdresses():Symbol[] {
    return [rendererAdress];
  }
}
