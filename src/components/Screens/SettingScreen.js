import React, { Component } from 'react';

import {StyleSheet, View, ScrollView, Dimensions } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
const sbh = getStatusBarHeight()

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

class SettingScreen extends Component {
  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.fourth} />
        <View style={styles.fourth} />
        <View style={styles.fourth} />
        <View style={styles.fourth} />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'green',
    },
    fourth: {
        height: (SCREEN_HEIGHT - sbh) / 4,
        backgroundColor: 'blue',
        borderColor: '#23bebe',
        borderTopWidth: 0.5,
    }
});


export default SettingScreen;