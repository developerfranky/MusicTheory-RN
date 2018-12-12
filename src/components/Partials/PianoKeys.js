import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  View,
} from 'react-native';

class PianoKeys extends Component {
  render() {
    // This keyboard has following properties (x=octave width).
    //  1. All white keys have equal width in front (W=x/7).
    //  2. All black keys have equal width (B=x/12).
    //  3. The narrow part of white keys C, D and E is W - B*2/3
    //  4. The narrow part of white keys F, G, A, and B is W - B*3/4

    // const x = this.props.screen_width;
    const x = 100;
    const w = x / 7;
    const b = x / 12;

    return (
        <View style={{ height: '30%', width: this.props.screen_width, backgroundColor: 'red' }}>
          <View style={{backgroundColor: 'white', borderColor: 'black', borderWidth: 1, width: w.toString() + '%', height:'100%', position: 'absolute', left: 0, top: 0 }} /> 
          <View style={{backgroundColor: 'white', borderColor: 'black', borderWidth: 1, width: w.toString() + '%', height:'100%', position: 'absolute', left: (w*1).toString() + '%', top: 0 }} /> 
          <View style={{backgroundColor: 'white', borderColor: 'black', borderWidth: 1, width: w.toString() + '%', height:'100%', position: 'absolute', left: (w*2).toString() + '%', top: 0 }} /> 
          <View style={{backgroundColor: 'white', borderColor: 'black', borderWidth: 1, width: w.toString() + '%', height:'100%', position: 'absolute', left: (w*3).toString() + '%', top: 0 }} /> 
          <View style={{backgroundColor: 'white', borderColor: 'black', borderWidth: 1, width: w.toString() + '%', height:'100%', position: 'absolute', left: (w*4).toString() + '%', top: 0 }} /> 
          <View style={{backgroundColor: 'white', borderColor: 'black', borderWidth: 1, width: w.toString() + '%', height:'100%', position: 'absolute', left: (w*5).toString() + '%', top: 0 }} /> 
          <View style={{backgroundColor: 'white', borderColor: 'black', borderWidth: 1, width: w.toString() + '%', height:'100%', position: 'absolute', left: (w*6).toString() + '%', top: 0 }} /> 
          
          <View style={{backgroundColor: 'black', position: 'absolute', top: 0, left: (w-b*2/3).toString() + '%', width: (b).toString() + '%', height: '65%', zIndex: 3, }} />
          <View style={{backgroundColor: 'black', position: 'absolute', top: 0, left: (2*(w-b*2/3) + b).toString() + '%', width: (b).toString() + '%', height: '65%', zIndex: 3, }} />
          <View style={{backgroundColor: 'black', position: 'absolute', top: 0, left: (3*(w-b*2/3) + 2*b + (w - b*3/4)).toString() + '%', width: (b).toString() + '%', height: '65%', zIndex: 3, }} />
          <View style={{backgroundColor: 'black', position: 'absolute', top: 0, left: (3*(w-b*2/3) + 3*b + 2*(w - b*3/4)).toString() + '%', width: (b).toString() + '%', height: '65%', zIndex: 3, }} />
          <View style={{backgroundColor: 'black', position: 'absolute', top: 0, left: (3*(w-b*2/3) + 4*b + 3*(w - b*3/4)).toString() + '%', width: (b).toString() + '%', height: '65%', zIndex: 3, }} />
        </View>
    );
  }
}

const styles = StyleSheet.create({

});


const mapStateToProps = (state) => {
  const { screen_width } = state.dimension;
  return { screen_width }
}

export default connect(mapStateToProps, null)(PianoKeys);
