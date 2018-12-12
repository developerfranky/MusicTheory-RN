import React, { Component } from 'react';
import { P, Title, B } from '../Instructions/Base';
import {
  StyleSheet,
  ScrollView,
  View
} from 'react-native';

class AboutScreen extends Component {
  render() { 
    return (
      <ScrollView style={styles.container}>
        <Title>A word from the developer</Title>
        <P>Music Minutes is designed to help musicians improve their music theory ability.</P>
        <P>When professional musicians are performing, improvising, or composing, there is little to no time to think about what note should come next.</P>
        <P>The faster you know your theory the more you can focus on your instrument and stream of musical thought.</P>
        <P>This app is designed as a supplement to help you along your musical studies.</P>
        <P>Short bursts of intense drills can greatly improve any skill. Music Minutes is based on the principle of repeating few items at a time until proficiency is acheived before moving on to more difficult levels.</P>
        <P>Music Minutes is designed for musicians of all levels. Note reading and Scales are usually what beginning music students learn, while intervals and chords are what more advance musicians spend time on.</P>        
        <P style={{paddingBottom: 40}}>For feedback, comments, or suggestions please contact me at <B>developerfranky@gmail.com</B></P>
      </ScrollView>
    );
  } 
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flexGrow: 1,
  }
});

export default AboutScreen;
