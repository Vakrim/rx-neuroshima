import Hero from './actors/Hero';
import world from './world';
import Renderer from './actors/Renderer';

world.subscribe(message => {
  console.log('worldMessage', message)
})

const render = new Renderer(world);
const e = new Hero(world);

setTimeout(() => {
  e.destroy();
}, 500);
