import { Subject } from '@reactivex/rxjs';
import { Message } from './Message';

const world = new Subject<Message>();

export default world;
