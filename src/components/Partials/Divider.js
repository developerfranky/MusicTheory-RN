import React, { Component } from 'react';

import {
  StyleSheet,
  View,
} from 'react-native';

import { divider } from '../colors';

class Divider extends Component {
  render() {
    return (
      <View style={ styles.div }>
        <View style={ styles.line } />
      </View>
    );
  }
}

const styles = StyleSheet.create({
    div: {
        width: '100%',
        alignItems: 'center'
    },
    line: {
        backgroundColor: divider,
        height: 1,
        width: '85%',
    }
});


export default Divider;
