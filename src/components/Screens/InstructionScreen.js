import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Text, Button, Alert } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { AdMobRewarded } from 'react-native-admob';
import { chooseTopic, useCoins, addCoins } from '../../redux_actions';

// import InstructionView from './InstructionView';
import * as ins_notes from '../Instructions/NotesInstructions';
import * as ins_scales from '../Instructions/ScalesInstructions';
import * as ins_intervals from '../Instructions/IntervalsInstructions';
import * as ins_chords from '../Instructions/ChordsInstructions';

import * as colors from '../colors';


class InstructionScreen extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      inClick: false
    }
    this.onPressStart = this.onPressStart.bind(this);
    this.onPressGetCoins = this.onPressGetCoins.bind(this);
    this.onPressUseCoin = this.onPressUseCoin.bind(this);
    this.onPressUpgrade = this.onPressUpgrade.bind(this);
  }

  chooseInstructions() {
    console.log('choosing instructions');
    let ins;
    if (this.props.category.toLowerCase() == 'notes') ins = ins_notes[this.props.topic_id];
    else if (this.props.category.toLowerCase() == 'scales') ins = ins_scales[this.props.topic_id];
    else if (this.props.category.toLowerCase() == 'intervals') ins = ins_intervals[this.props.topic_id];
    else if (this.props.category.toLowerCase() == 'chords') ins = ins_chords[this.props.topic_id];
    else ins = <Text>Instructions not found</Text>;
    return ins; 
  }

  onPressStart() {  
    if (this.props.topic_is_pro && !this.props.user_is_pro) {
      // Alert.alert('Please use a coin or upgrade to pro.');
      Alert.alert(
            'Need Coins or Pro',
            'Please click on Use Coin or Upgrade to Pro.',
            // [
            //     {text: 'Cancel', onPress: () => {}, style: 'cancel'},
            //     {text: 'Yes', onPress: () => {
            //         Answers.logCustom('Quit Minute', {topic_id: this.props.topic_id});
            //         Actions.popTo('scene_topics')
            //     }},
            // ],
        );
      setTimeout(function() { this.setState({inClick: false}); }.bind(this), 2000);
      return;
    }
    this.setState({ inClick: true })
    Actions.scene_quiz();
    setTimeout(function() { this.setState({inClick: false}); }.bind(this), 2000);
  }

  onPressGetCoins() {  
    console.log('Pressed get coins');
    AdMobRewarded.showAd().catch(error => {
      // if (error.message.includes('not ready')) {
      //     // Alert.alert('Ad is loading, please try again later.');
      //     Alert.alert(
      //       'Ad not ready',
      //       'Ad is loading, please try again later.',
      //     )
      // } else {
      //     console.warn(error);
      // }
      const free_coins = 2;
      Alert.alert(
        'Ad not ready',
        'Either the ad is still loading or something went wrong. No problem, enjoy ' + free_coins + ' coins on the house!',
      )
      this.props.addCoins(free_coins);
    });
    setTimeout(function() { this.setState({inClick: false}); }.bind(this), 2000);
  }

  onPressUseCoin() {  
    console.log('Pressed use coin');
    if (this.props.coins < 1) {
      // Alert.alert('') 
      Alert.alert(
            'Get Coins or Pro',
            'Need at least 1 coin to play this level.',
            // [
            //     {text: 'Cancel', onPress: () => {}, style: 'cancel'},
            //     {text: 'Yes', onPress: () => {
            //         Answers.logCustom('Quit Minute', {topic_id: this.props.topic_id});
            //         Actions.popTo('scene_topics')
            //     }},
            // ],
        );
      return;
    }
    this.props.useCoins(1);

    setTimeout(function() { this.setState({inClick: false}); }.bind(this), 2000);
    Actions.scene_quiz();
  }

  onPressUpgrade() {
    console.log('Pressed upgrade');
    Actions.scene_upgrade();
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.instructions}> 
          {this.chooseInstructions()}
        </ScrollView>
        {this.props.topic_is_pro && !this.props.user_is_pro  && 
        <View style={{backgroundColor: colors.light_gray, padding: 10,}}>
          <Text>This is a pro topic. Watch an ad to get coins to play, or upgrade to pro.</Text>
          <Text>Coins Available: {this.props.coins}</Text>
          <View style={{ flexDirection: 'row', width: '100%', }}>
              <View style={styles.button_container}>
                  <Button
                      onPress={this.onPressGetCoins}
                      title="Get Coins"
                      color={colors.primary_dark}
                  />
              </View>
              <View style={styles.button_container}>
                  <Button
                    style={styles.startButton}
                    // onPress={this.onPressStart}
                    onPress={ !this.state.inClick ? this.onPressUseCoin : () => {}}
                    // title="Start Drill"
                    title="Use 1 Coin"
                    color={colors.primary}
                  />
              </View>
              <View style={styles.button_container}>
                  <Button
                    style={styles.startButton}
                    // onPress={this.onPressStart}
                    onPress={ !this.state.inClick ? this.onPressUpgrade : () => {}}
                    // title="Start Drill"
                    title="Get Pro"
                    color={colors.primary_light}
                  />
              </View>
          </View>
        </View>
        }
        {((this.props.topic_is_pro && this.props.user_is_pro) || !this.props.topic_is_pro) && 
        <View style={{padding: 10}}>
          <Button
            style={styles.startButton}
            // onPress={this.onPressStart}
            onPress={ !this.state.inClick ? this.onPressStart : () => {}}
            // title="Start Drill"
            title="Start Minute"
            color={colors.primary}
          />
        </View>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    // padding: 10,
    flex: 1,
  },
  instructions: {
    flexGrow: 1,
    padding: 10,
    // flex: 1,
    // height: '100%',
    // backgroundColor: '#eee',
  },
  startButton: {
    paddingTop: 'auto',
    // margin: 10,
  },
  button_container: {
    flexGrow: 1,
    flex: 1
  }
});


const mapStateToProps = (state) => {
    const { topic_name, topic_id, category, topic_is_pro } = state.category;
    const { user_is_pro } =  state.purchases;
    const { coins } =  state.ad;
    // return { topic_name, topic_id, category };
    return { topic_name, topic_id, category, topic_is_pro, user_is_pro, coins };
};

export default connect(mapStateToProps, { 
    chooseTopic, useCoins, addCoins
})(InstructionScreen);
