import React, { Component } from 'react';
import { View, Text, Dimensions, StatusBar, 
    Image, AsyncStorage, Platform, Button 
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import MenuButton from '../Partials/MenuButton';
import TouchableDiv from '../Partials/TouchableDiv';
import GridRow from '../Partials/GridRow';

import { chooseCategory, setHasPurchaseFullVersion, 
    getCoins, addCoins, useCoins, addSounds, setPortrait, 
    setMute, togglePiano, togglePianoNotes
} from '../../redux_actions';

import { 
    TYPE_SCALES, TYPE_INTERVALS, TYPE_CHORDS, TYPE_NOTES
} from '../../core_music_logic/types'; 

import { getStatusBarHeight } from 'react-native-status-bar-height';

import { AdMobRewarded } from 'react-native-admob';
import * as RNIap from 'react-native-iap';
import {scaledSize, isPortrait} from '../utils';

var Fabric = require('react-native-fabric');
var { Crashlytics } = Fabric;

// All log functions take an optional object of custom attributes as the last parameter
// Crashlytics.setString('organization', 'Acme. Corp');


const sbh = getStatusBarHeight();

import * as colors from '../colors';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;


const WORKING_HEIGHT = (SCREEN_HEIGHT - sbh);
const padding = 10; 
// const padding = '2%'; 


// LIVE ids
const REWARDED_AD_UNIT = Platform.select({
    android: 'redacted',
    ios: 'redacted',
});


console.log('REWARDED_AD_UNIT');
console.log(REWARDED_AD_UNIT);

const sb = Platform.select({
    ios: <View style={{ backgroundColor: colors.primary, height: sbh }}/>,
    android: <View></View>,
});

const mp3s = [
    'gs3.mp3', 
    'a3.mp3', 
    'as3.mp3', 
    'b3.mp3', 
    'c4.mp3', 
    'cs4.mp3', 
    'd4.mp3', 
    'ds4.mp3', 
    'e4.mp3', 
    'f4.mp3', 
    'fs4.mp3', 
    'g4.mp3', 
    'gs4.mp3', 
    
    'a4.mp3', 
    'as4.mp3', 
    'b4.mp3', 
];

class HomeScreen extends Component {
    
    constructor(props) {
      super(props);
    
      this.state = {};
      this.getPurchases = this.getPurchases.bind(this);
      this.restorePurchases = this.restorePurchases.bind(this);
      this.setUpAds = this.setUpAds.bind(this);
      this.handleOrientation = this.handleOrientation.bind(this);
      this.getSettings = this.getSettings.bind(this);
      // this.loadSounds = this.loadSounds.bind(this);
    }

    componentWillMount() {
        this.getPurchases();
        this.props.getCoins();
        this.getSettings();
        // this.props.addSounds(sound_dict);
        this.props.addSounds(mp3s);
        this.handleOrientation();
        // this.loadSounds(mp3s);
        Dimensions.addEventListener('change', this.handleOrientation);
    }

    handleOrientation() {
        // console.log('isPortrait: ' + isPortrait());
        this.props.setPortrait(isPortrait());
    }

    getSettings() {
        AsyncStorage.getItem('use_piano', (err, result) => {
            if (result && result==='true') this.props.togglePiano(); // default for use_piano is false
        });

        AsyncStorage.getItem('is_mute', (err, result) => {
            if (result && result==='true') this.props.setMute(true); // default for is_mute is false
        });

        AsyncStorage.getItem('piano_notes', (err, result) => {
            if (result && result==='false') this.props.togglePianoNotes(); // default for is_mute is true
        });
    }

    setUpAds() {
        console.log('setting up ads');

        AdMobRewarded.setAdUnitID(REWARDED_AD_UNIT);

        AdMobRewarded.addEventListener('rewarded', (reward) => {
            console.log('AdMobRewarded => rewarded', reward);
            this.props.addCoins(reward.amount);
        });

        AdMobRewarded.addEventListener('adLoaded',() => {
            console.log('AdMobRewarded => adLoaded')
        });

        AdMobRewarded.addEventListener('adFailedToLoad',(error) => {
            if (error.message.includes('Ad is already loaded')) {
                console.log('ad is loaded already.');
            } 
            else if (error.message.includes('network connectivity')) {
                console.log('No internet connection');
            } 
            else {
                console.log('fail inside adFailedToLoad()');
                console.warn(error);
            }
        });
        
        AdMobRewarded.addEventListener('adOpened', () => {
            console.log('AdMobRewarded => adOpened')
        });

        AdMobRewarded.addEventListener('videoStarted',() => {
            console.log('AdMobRewarded => videoStarted')
        });
        
        AdMobRewarded.addEventListener('adClosed',() => {
            console.log('AdMobRewarded => adClosed');
            AdMobRewarded.requestAd().catch(error => console.warn(error));
        });

        AdMobRewarded.addEventListener('adLeftApplication',
          () => console.log('AdMobRewarded => adLeftApplication')
        );

        AdMobRewarded.requestAd().catch(error => {
            if (error.message.includes('Ad is already loaded')) {
                console.log('ad is loaded already.');
            } 
            else if (error.message.includes('no ad was returned')) {
                console.log('Ads loading is having issues, try restarting this app.');
            } 
            else if (error.message.includes('network connectivity')) {
                console.log('No internet connection');
            } 
            else {
                console.log('fail inside requestAd()')
                console.warn(error);
            }
        });
    }
    
    componentWillUnmount() {
        AdMobRewarded.removeAllListeners();
        RNIap.endConnection();
        Dimensions.removeEventListener('change', this.handleOrientation);
        
        // clear sounds
        for (var sound of Object.values(this.props.sounds)) {
            sound.release();
        }
    }

    async restorePurchases() {
        console.log('restoring purchases');
        try {
          await RNIap.prepare();
          
          const purchases = await RNIap.getAvailablePurchases();
          console.log('purchases');
          console.log(purchases);

          purchases.forEach(purchase => {
            if (purchase.productId == 'upgrade_to_pro') {
                // alert('product has been purchased before');
                this.props.setHasPurchaseFullVersion();
                AsyncStorage.setItem('user_is_pro', 'true', (error) => {
                    if (error) {
                      console.log(error);
                    };
                });
                // RNIap.endConnection();
            } 
          });

          RNIap.endConnection();
        } 
        catch(err) {
          // alert('catch restorePurchases');
          console.log('catch restorePurchases');
          // alert('error in prepare: ' + err.message)
          console.warn(err); // standardized err.code and err.message available
          RNIap.endConnection();
        }
    }
    getPurchases() {
        console.log('running getPurchases.');
        // Forces a native crash for testing
        // Crashlytics.crash();

        AsyncStorage.getItem('user_is_pro', (err, result) => {
            if (result) {
                let purchased = JSON.parse(result);
                console.log('purchased inside AsyncStorage user_is_pro');
                console.log(purchased);
                // this should be called after payment too. 
                // if (purchased == true) this.props.setHasPurchaseFullVersion();
                this.props.setHasPurchaseFullVersion();
            }
            else {
                console.log('no purchase found');
                this.setUpAds();
                this.restorePurchases();
                // see if user has purchasesfrom before.
            }
        }); 
        
    }
    pressOption(category) {
        this.props.chooseCategory(category);
        Actions.scene_topics();
    }

    // Improve your music skills minutes at a time
    render() {
        return (
            <View style={styles.container}>
                {sb}
                <StatusBar
                  backgroundColor={'#c68400'}
                  barStyle='light-content'
                />
                <View style={styles.content}>
                    <View style={styles.header}>
                        <Text style={styles.title}>Music Minutes</Text>
                    </View>
                    <Image 
                        source={require('../../../assets/music_minutes_logo.png')} 
                        style={styles.logoStyle} 
                        resizeMode="contain" 
                    />
                    <Text style={styles.heading}>Choose a category to get started</Text>
                    <View style={ styles.gridContainer}>
                        <GridRow>
                            <MenuButton style={{ width: (this.props.screen_width-(padding*3))/2, height: this.props.working_height / 4, }}
                                text={'Notes'} 
                                onPress={this.pressOption.bind(this, TYPE_NOTES)}
                                image={require('../../../assets/menu/category_notes.png')}
                            />
                            <MenuButton style={{ width: (this.props.screen_width-(padding*3))/2, height: this.props.working_height / 4, }}
                                text={'Scales'} 
                                onPress={this.pressOption.bind(this, TYPE_SCALES)}
                                image={require('../../../assets/menu/category_scales.png')}
                            />
                        </GridRow>
                        <GridRow style={{ marginTop: 10 }}>
                            <MenuButton style={{ width: (this.props.screen_width-(padding*3))/2, height: this.props.working_height / 4, }}
                                text={'Intervals'} 
                                onPress={this.pressOption.bind(this, TYPE_INTERVALS)}
                                image={require('../../../assets/menu/category_intervals.png')}
                            />
                            <MenuButton style={{ width: (this.props.screen_width-(padding*3))/2, height: this.props.working_height / 4, }}
                                text={'Chords'} 
                                onPress={this.pressOption.bind(this, TYPE_CHORDS)}
                                image={require('../../../assets/menu/category_chords.png')}
                            />
                        </GridRow>
                    </View>
                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                        <TouchableDiv 
                            style={styles.about}
                            onPress={Actions.scene_about}
                        ><Text style={styles.about_text}>About</Text></TouchableDiv>
                    </View>
                </View>
            </View>
        );
    }
}
                    // <Text>PRO: {this.props.user_is_pro.toString()}</Text>

const styles = {
    container: {
        flex: 1,
        // backgroundColor: colors.primary_dark,
        // alignItems: 'center',
        // paddingTop: sbh,
        // backgroundColor: 'purple'
    },
    header: {
        display: 'flex',
        // backgroundColor: colors.primary_dark,
        alignItems: 'center',
        width: '100%',
        height: WORKING_HEIGHT/10,
        justifyContent: 'center',
        // backgroundColor: 'green',   
    },
    heading: {
        fontSize: scaledSize(20),
        color: colors.text_navbar,
        marginBottom: scaledSize(10),
        // marginTop: 10,
        
        textAlign: 'center',
        paddingLeft: scaledSize(10),
        paddingRight: scaledSize(10),
    }, 
    title:{
        fontSize: scaledSize(24),
        color: colors.text_navbar,
        fontWeight: 'bold',
    },
    gridContainer: {
        paddingLeft: padding,
        paddingRight: padding,
        width: '100%',
    }, 
    logoStyle: {
        height: '15%', 
        width: undefined, 
        alignSelf: 'stretch',
    },
    // category: {
    //     // width: (this.props.screen_width-(padding*3))/2,
    //     // width: (100 - 2*3))/2,
    //     // width: '100%',
    //     height: WORKING_HEIGHT / 4,
    //     // marginTop: padding,
    // },
    about: {
        paddingTop: scaledSize(12),
        paddingBottom: scaledSize(12),
        paddingLeft: scaledSize(22),
        paddingRight: scaledSize(22),
    },
    about_text:{
        fontSize: scaledSize(14),
        color: colors.text_secondary,
    },
    content: {
        flex: 1,
    },
};

const mapStateToProps = (state) => {
    const { user_is_pro } =  state.purchases;
    const { coins } = state.ad;
    const { sounds, is_mute } = state.sound;
    const { screen_width, working_height } = state.dimension;
    return { user_is_pro, coins, sounds, screen_width, working_height };
};

export default connect(mapStateToProps, { chooseCategory, setHasPurchaseFullVersion, 
    getCoins, addCoins, useCoins, addSounds, setPortrait, setMute, togglePiano, togglePianoNotes })(HomeScreen);
