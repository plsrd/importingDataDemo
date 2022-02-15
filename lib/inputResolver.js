import Slider from './components/Slider';

export default function resolveInput(type) {
  if (type.name === 'number' && type.options && type.options.range) {
    return Slider
  }
}