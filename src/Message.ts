import Actor from "./Actor";

export type RawMessage = NewActorMessage | ActorWillBeDestroyedMessage
export type Message = RawMessage & Envelope

type Envelope = {
  senderAddress: Symbol,
  address: Symbol,
}

export type NewActorMessage = {
  type: 'NewActor',
  actor: Actor,
}

export type ActorWillBeDestroyedMessage = {
  type: 'ActorWillBeDestroyed',
  actor: Actor
}
