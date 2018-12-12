import React, { Component } from 'react';

import {
  StyleSheet,
  View,
} from 'react-native';

import { padding } from '../utils';

class GridRow extends Component {
  render() {
    return (
      <View style={[styles.row, this.props.style]}>{this.props.children}</View>
    );
  }
}

const styles = StyleSheet.create({
    row: {
        width: '100%',
        flexDirection: 'row',
        // backgroundColor:'green',
        justifyContent: 'space-between',
    }
});


export default GridRow;