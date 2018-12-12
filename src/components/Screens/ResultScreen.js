import React, { Component } from 'react';
import { StyleSheet, View, Text, Button, Image, AsyncStorage, ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { AdMobRewarded } from 'react-native-admob';

import { appendNewHighScore, chooseTopic, retryQuiz, countQuiz, useCoins, addCoins } from '../../redux_actions';
import { MUSIC_DIR } from '../../core_music_logic/types';

import * as colors from '../colors';
import {scaledSize} from '../utils';


const thresh_singles = 9;
const thresh_triads = 15;
const thresh_sevenths = 20;
const thresh_scales = 28;

class ResultScreen extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            total_score: 0,
            stars: 0, 
            new_highscore: false,
            is_last_topic: false,
            next_topic: '',
            old_high_score: null,
            ad_ready: false,
        };
        this.goToNextTopic = this.goToNextTopic.bind(this);
        this.retryDrill = this.retryDrill.bind(this);
        this.getCoins = this.getCoins.bind(this);

    }
    
    getCoins() {  
        console.log('Pressed get coins');
        AdMobRewarded.showAd().catch(error => {
          // if (error.message.includes('not ready')) {
          //     alert('Ad is loading, please try again later.');
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

    retryDrill() {
        if (this.props.topic_is_pro) {
            if (!this.props.user_is_pro && this.props.coins < 1){
                alert('Need at least 1 coin. Get coins or upgrade to pro.') 
                return;   
            }
            if (!this.props.user_is_pro) {
                this.props.useCoins(1);
            }
        }
        
        this.props.retryQuiz(true);
        Actions.pop();
    }

    goToNextTopic() {       
        if (this.state.is_last_topic) {
            Actions.popTo('scene_topics');
            return;
        }

        this.props.chooseTopic(this.state.next_topic);
        // set new topic with reducer action.
        Actions.popTo('scene_instructions');
    }

    getTopicDescription() {
        const cat = this.props.category.toLowerCase();

        if (cat == 'notes') return 'Naming Notes';
        if (cat == 'intervals') return 'Intervals';
        if (cat == 'chords') {
            if (this.props.topic_id.split('_')[1] == 'triad') return 'Triad Chords';
            return 'Seventh Chords';
        }
        if (cat == 'scales') {
            if (this.props.topic_id.split('_')[1] ==  'name') return 'Scale Names';
            return 'Scale Notes';
        }
        return 'ERROR';
    }

    getStarRating(score) {
        // this will be for single note inputs, need to tweak for chords and scales. 
        const d = this.getTopicDescription();
        
        let stars = 0;
        if (d === 'Naming Notes' || d === 'Intervals' || d === 'Scale Names') stars = Math.floor(score / thresh_singles);
        if (d === 'Triad Chords') stars = Math.floor(score / thresh_triads);
        if (d === 'Seventh Chords') stars = Math.floor(score / thresh_sevenths);
        if (d === 'Scale Notes') stars = Math.floor(score / thresh_scales);
        stars = (stars > 5) ? 5 : stars;
        return stars;
    }
    
    setNextTopic() {
        const parts = this.props.topic_id.split('_');
        
        let _cat = parts[0];
        _cat = _cat.substring(0,1).toUpperCase() + _cat.substring(1);

        const sections = MUSIC_DIR[_cat]['sections'];

        // putting all options together from all the sectinos in a category.
        let all_options = [];
        for (let i = 0; i < sections.length; i++){
            all_options = all_options.concat(sections[i].data);
        }
        
        // looping to find which object has the same id as what we just finished quizzing.
        // const index = all_options.indexOf(this.props.topic_id);
        let index = 0;
        for (let j = 0; j < all_options.length; j++){
            if (all_options[j].id == this.props.topic_id) index=j; 
        }

        if (index == all_options.length - 1) {
            this.setState({ is_last_topic: true, category: _cat })
        }
        else {
            this.setState({ next_topic: all_options[index + 1], category: _cat });
        }
    }
    
    componentDidMount() {
        // setting next topic // 
        this.setNextTopic();
        // setting score  //
        let score = this.props.correct_answers - (0.5*(this.props.mistakes));
        let stars = this.getStarRating(score);

        this.setState({ total_score: score, stars: stars });
       
        // saving high score // 
        if (score <= 0) return;
        this.props.countQuiz();
        
        AsyncStorage.getItem(this.props.topic_id, (err, result) => {
            if (result) {
                let stored = JSON.parse(result);
                this.setState({old_high_score: stored.high_score});
                if (score > stored.high_score)  this.setHighScore(score, stars);
            } 
            else {
                if (score <= 0) return;
                this.setHighScore(score, stars);
            }
        });
    }

    // setUpAd() {
    //     AdMobInterstitial.setAdUnitID('ca-app-pub-3940256099942544/5135589807');
    //     AdMobInterstitial.addEventListener('adLoaded',
    //       () => {
    //         console.log('AdMobInterstitial adLoaded');
    //         this.setState({ ad_ready: true })
    //       }
    //     );
    //     AdMobInterstitial.addEventListener('adFailedToLoad', 
    //       (error) => {
    //         console.log('adFailedToLoad');
    //         console.warn(error);
    //       }
    //     );
    //     AdMobInterstitial.addEventListener('adOpened',
    //       () => console.log('AdMobInterstitial => adOpened')
    //     );
    //     AdMobInterstitial.addEventListener('adClosed',
    //       () => {
    //         console.log('AdMobInterstitial => adClosed');
    //         AdMobInterstitial.requestAd().catch(error => console.warn(error));
    //       }
    //     );
    //     AdMobInterstitial.addEventListener('adLeftApplication',
    //       () => console.log('AdMobInterstitial => adLeftApplication')
    //     );

    //     AdMobInterstitial.requestAd().catch(error => {
    //         // console.log('error requesting ad');
    //         // console.log(error);
    //         // console.log(error.name);
    //         // console.log(error.message);
    //         if (error.message.includes('Ad is already loaded')) {
    //             console.log(error.message);
    //             this.setState({ad_ready: true})
    //         }
    //         // console.log
            
    //         // console.warn(error);
    //       }
    //     );
    // }

    setHighScore(score, stars) {
        let obj = {high_score: score, stars: stars}
        AsyncStorage.setItem(this.props.topic_id, JSON.stringify(obj), (error) => {
            if (error) {
                // console.log(error)
                return;
            };
            this.setState({ new_highscore: true })
        });

        this.props.appendNewHighScore(this.props.topic_id);
    }

    getRatingGuide() {
        const d = this.getTopicDescription();
        let thresh;
        if (d === 'Naming Notes' || d === 'Intervals' || d === 'Scale Names') thresh = thresh_singles;
        if (d === 'Triad Chords') thresh = thresh_triads;
        if (d === 'Seventh Chords') thresh = thresh_sevenths;
        if (d === 'Scale Notes') thresh = thresh_scales;
        return (
            <View>
                <View style={styles.row}>
                    <Text style={styles.rating_guide_text}>{thresh*1} - {thresh*2-1}</Text>
                    <Text style={styles.rating_guide_stars}>1 star<Text style={{color: '#fff'}}>s</Text></Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.rating_guide_text}>{thresh*2} - {thresh*3-1}</Text>
                    <Text style={styles.rating_guide_stars}>2 stars</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.rating_guide_text}>{thresh*3} - {thresh*4-1}</Text>
                    <Text style={styles.rating_guide_stars}>3 stars</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.rating_guide_text}>{thresh*4} - {thresh*5-1}</Text>
                    <Text style={styles.rating_guide_stars}>4 stars</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.rating_guide_text}>{thresh*5}+</Text>
                    <Text style={styles.rating_guide_stars}>5 stars</Text>
                </View>
            </View>
        )
    }

    // componentWillMount() {
    //   const mp = this.props.minutes_practiced;
    //   if (mp > 0 &&mp % 3 == 0) this.setUpAd();
    // }
    // componentDidUpdate(prevProps, prevState) {
    //   console.log('componentDidUpdate ResultScreen');
    //   console.log('minutes practiced:');
    //   console.log(this.props.minutes_practiced);
    //   console.log('this.state.ad_ready');
    //   console.log(this.state.ad_ready);
    //   if (this.props.minutes_practiced != prevProps.minutes_practiced && this.props.minutes_practiced % 3 == 0) {
    //     // AdMobInterstitial.setTestDevices([AdMobInterstitial.simulatorId]);
    //     console.log('show ad here');
    //     if (this.state.ad_ready) AdMobInterstitial.showAd();
    //     else {
    //         AdMobInterstitial.requestAd()
    //         .then(() => AdMobInterstitial.showAd());
    //     }
    //   }
    // }

    renderStars() {
        const _l = [1,2,3,4,5];
        return _l.map(num => 
            <Image style={ styles.score_rating } 
                resizeMode="contain" 
                key={num} 
                source={this.state.stars >= num 
                    ? require('../../../assets/icons/star.png')
                    : require('../../../assets/icons/star_o.png')} />
        );
    }

    render() {
        let retry_text = 'Retry';
        if (this.props.topic_is_pro && !this.props.user_is_pro) retry_text = 'Retry (1 coin)';

        return (
            <View style={styles.container}>
                <ScrollView style={styles.results} contentContainerStyle={{flexGrow:1}} > 
                    <View >
                        <Text style={{ 
                                textAlign: 'center', fontSize: scaledSize(32), 
                                marginBottom: scaledSize(5), color: colors.text_primary }}>
                                {this.state.new_highscore ? 'New High Score!':'Your Score'}
                            </Text>
                            <Text style={{ 
                                color: colors.text_positive, textAlign: 'center', 
                                fontSize: scaledSize(48), fontWeight: 'bold' }}>{this.state.total_score}</Text>
                            <Text style={{ 
                                marginTop: scaledSize(10), marginBottom: scaledSize(10), textAlign: 'center', fontSize: scaledSize(20), 
                                color: colors.text_secondary}} >Stars Earned: {this.state.stars}</Text>
                            
                            <View style={ styles.score_rating_container }>
                                {this.renderStars()}
                            </View>
    
                            {this.state.old_high_score &&
                                <Text style={{fontSize: scaledSize(16), textAlign: 'center', marginBottom: scaledSize(5) }}>Previous High Score: {this.state.old_high_score}</Text>
                            }
    
                        <Text style={{ fontSize: scaledSize(20), textAlign: 'center' }}>You got {this.props.correct_answers} correct and {this.props.mistakes} mistakes.</Text>
                        
                        <Text style={{ marginTop: scaledSize(20), fontSize: scaledSize(18), textAlign: 'center',}}>Score = Correct - half of Mistakes</Text>
                        
                        
                    </View>
                    <View style={{ paddingBottom: this.props.is_portrait ? 0 :  '10%', marginTop: this.props.is_portrait ? 'auto' : 0 }}>
                        <Text style={{fontWeight: 'bold', fontSize: scaledSize(20), textAlign: 'center'}}>Scoring Guide For {this.getTopicDescription()}</Text>
                        {this.getRatingGuide()}
                    </View>
                    
                </ScrollView>
                <View style={styles.bottom_cont}>
                    {this.props.topic_is_pro && !this.props.user_is_pro &&
                    <Text>Coins Remaining: {this.props.coins}</Text>
                    }
                    <View style={styles.row}>
                        <View style={styles.button}>
                            <Button
                                onPress={this.retryDrill}
                                title={retry_text}
                                color={colors.primary}
                            />
                        </View>
                        {this.props.topic_is_pro && !this.props.user_is_pro &&
                        <View style={styles.button}>
                            <Button
                                onPress={this.getCoins}
                                title='Get Coins'
                                color={colors.primary_light}
                            />
                        </View>
                        }
                        <View style={styles.button}>
                            <Button
                                onPress={this.goToNextTopic}
                                title={this.state.is_last_topic ? "Done!" : "Next Topic"}
                                color={colors.accent}
                            />
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        flex: 1,
        backgroundColor: '#fff',
        // height: '100%',
    },
    results: {
        // flexGrow: 1,
        // flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        height: '90%'
    },
    bottom_cont: {
        marginTop: 0,
        height: '10%',
        justifyContent: 'flex-end'
    },
    row: {
        flexDirection: 'row',
        width: '100%',
    },
    button: {
        flexGrow: 1,
        flex: 1
    },
    score_rating_container: {
        flexDirection: 'row',
        height: '10%',
        paddingLeft: scaledSize(20),
        paddingRight: scaledSize(20),
        marginBottom: scaledSize(20)
    },
    score_rating: {
        tintColor: 'orange', 
        flex: 1,
        height: undefined,
        width: undefined,
        alignSelf: 'stretch',
    },
    rating_guide_text: {
        color: colors.text_secondary,
        fontSize: scaledSize(16),
        marginBottom: scaledSize(2)
    },
    rating_guide_stars: {
        textAlign: 'right',
        fontSize: scaledSize(16),
        flex: 1,
    }
});

const mapStateToProps = (state) => {
    const { topic_id, category, topic_is_pro } = state.category;
    const { correct_answers, mistakes } = state.question;
    const { user_is_pro } =  state.purchases;
    const { minutes_practiced } =  state.quiz;
    const { coins } =  state.ad;
    const { is_portrait } =  state.dimension;

    // console.log('minutes_practiced');
    // console.log(minutes_practiced);
    
    return { topic_id, correct_answers, mistakes, category, 
        user_is_pro, minutes_practiced, coins, topic_is_pro, is_portrait };
};

export default connect(mapStateToProps, {appendNewHighScore, chooseTopic, 
    retryQuiz, countQuiz, useCoins, addCoins })(ResultScreen);
 