// @flow

import { LayoutAnimation } from 'react-native';

let _animate = null;

export function animate(): void {
	if (_animate) {
	  _animate();
	}
}
  
export function configureLayoutAnimation(animation: string | () => void): void {
  _animate = typeof animation === 'function'
    ? animation
    : LayoutAnimation[animation];
}
