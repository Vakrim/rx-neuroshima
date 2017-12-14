import { Subject, Observable, Subscription } from '@reactivex/rxjs';
import { Message, RawMessage } from './Message';
import Behavior from './Behavior';

export default abstract class Actor {
  private world: Subject<Message>
  private _addresses: Symbol[]
  readonly address: Symbol
  behaviors: Behavior[] = []
  readonly subscription: Subscription
  private _isDead = false

  constructor(world: Subject<Message>) {
    this.address = Symbol(`${this.constructor.name} address`);
    this._addresses = [this.address, ...this.additionalAdresses];
    this.world = world;
    const mailBox = this.world.filter(message => this.addresses.includes(message.address));
    this.subscription = mailBox.subscribe(message => this.handleMessage(message));
    setTimeout(() => {
      this.behaviors.forEach(behavior => {
        behavior.afterCreation(this);
      });
    });
  }

  get addresses() {
    return this._addresses;
  }

  get additionalAdresses():Symbol[] {
    return [];
  }

  private sendMessage(message: Message) {
    this.world.next(message);
  }

  send(address: Symbol, restOfMessage: RawMessage) {
    this.sendMessage({
      senderAddress: this.address,
      address,
      ...restOfMessage,
    })
  }

  private handleMessage(message: Message) {
    this.receivedMessage(message);
    this.behaviors.forEach(behavior => {
      behavior.receivedMessage(this, message);
    });
  }

  receivedMessage(message: Message) {

  }

  get isDead() {
    return this._isDead;
  }

  destroy() {
    this.behaviors.forEach(behavior => {
      behavior.beforeDestroy(this);
    });
    this.subscription.unsubscribe();
    this._isDead = true
  }
}
