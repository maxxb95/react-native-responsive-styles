// @flow

import { LayoutAnimation, Dimensions } from 'react-native';

let _animate = null;

Dimensions.addEventListener('change', () => {
	if (_animate) {
  		_animate();
	}
});
  
export default function configureLayoutAnimation(animation: string | () => void): void {
  _animate = typeof animation === 'function'
    ? animation
    : LayoutAnimation[animation];
}
