// @flow

import React, { PropTypes } from 'react';
import { Dimensions } from 'react-native';

import getStyleByOrientation from './getStyleByOrientation';
import { animate } from './lib/configureLayoutAnimation';

export default function createResponsiveComponent(ComponentClass: ReactClass<any>) {
  if (!ComponentClass) {
    return ComponentClass;
  }
  return React.createClass({
    displayName: `Responsive${ComponentClass.displayName}`,
    propTypes: {
      children: PropTypes.node,
      style: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.array,
        PropTypes.number
      ])
    },
    getInitialState() {
      return {
        orientation: Dimensions.get('window').width > Dimensions.get('window').height ? 'landscape' : 'portrait'
      };
    },

    componentDidMount() {
      Dimensions.addEventListener('change', this._setOrientation);
    },

    componentWillUnmount() {
      Dimensions.removeEventListener('change', this._setOrientation);
    },

    _setOrientation(orientation) {
      animate();
      this.setState({
        orientation: Dimensions.get('window').width > Dimensions.get('window').height ? 'landscape' : 'portrait'
      });
    },

    render() {
      const orientation = this.state.orientation;
      const { style, children, ...props } = this.props;

      const getStyle = (styleObj) => getStyleByOrientation(styleObj, orientation);

      const resolvedStyle = Array.isArray(style)
        ? style.map(getStyle)
        : getStyle(style);

      return (
        <ComponentClass style={resolvedStyle} {...props}>
          {children}
        </ComponentClass>
      );
    }
  });
}
