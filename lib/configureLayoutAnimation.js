// @flow

import { Dimensions } from 'react-native';
import { LayoutAnimation } from 'react-native';

let _animate = null;

Dimensions.addEventListener(() => {
  if (_animate) {
    _animate();
  }
});

export default function configureLayoutAnimation(animation: string | () => void): void {
  _animate = typeof animation === 'function'
    ? animation
    : LayoutAnimation[animation];
}
