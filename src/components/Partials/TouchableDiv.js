import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from 'react-native';

class TouchableDiv extends Component {
    render() {
        if (Platform.OS === 'android') {
            return (
                <TouchableNativeFeedback onPress={this.props.onPress} style={this.props.style}> 
                   {this.props.children}
                </TouchableNativeFeedback>    
            )
        } else {
            return (
                <TouchableOpacity onPress={this.props.onPress} style={this.props.style}>
                   {this.props.children}
                </TouchableOpacity>    
            )
        }
    }
}

export default TouchableDiv;
