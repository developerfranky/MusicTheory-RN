import React from 'react';
import { Actions, Scene, Router } from 'react-native-router-flux';
import { StyleSheet, BackHandler, Alert, Platform, StatusBar, View } from 'react-native';
import HomeScreen from './Screens/HomeScreen';
import TopicScreen from './Screens/TopicScreen';
import QuizScreen from './Screens/QuizScreen';
import InstructionScreen from './Screens/InstructionScreen';
import ResultScreen from './Screens/ResultScreen';
import SettingScreen from './Screens/SettingScreen';
import AboutScreen from './Screens/AboutScreen';
import UpgradeScreen from './Screens/UpgradeScreen';

import * as colors from './colors';
import { getStatusBarHeight } from 'react-native-status-bar-height';
const sbh = getStatusBarHeight()

/* 
	STyle Notes:
	SCreenhight is total screen height, doesn't subtract from statusbar or navbar
*/

backHandler = () => {
	console.log('hardware pressss');
	console.log(Actions.currentScene);
	
	if (Actions.currentScene == 'scene_home') {
		// console.log('at home');
		BackHandler.exitApp();
		return true;
	}

	if (Actions.currentScene == 'scene_results') {
		// console.log('at results');
		Actions.popTo('scene_topics');
        // somehow refresh scene_topics so that new high scores are rerendered. 
		return true
	}

	if (Actions.currentScene == 'scene_quiz') {
		// console.log('inside backhandler scene quiz');
		// this.props.handleBackInQuiz();
		Alert.alert(
            'Quit Minute',
            'Exit this music minute?',
            [
                {text: 'Cancel', onPress: () => {}, style: 'cancel'},
                {text: 'Yes', onPress: () => Actions.popTo('scene_topics')},
            ],
        );
		return true;
	}

	// console.log('just pop');
	Actions.pop()
    return true;
}


const RouterComponent = () => {
	return (
        <Router
            backAndroidHandler={backHandler}
            sceneStyle={ styles.sceneStyle } 
            navigationBarStyle= { styles.barStyle }
            titleStyle = { styles.titleStyle }
        >
            <Scene key="root">
                <Scene 
                    key="scene_home" 
                    component={HomeScreen} 
                    backbuttonTintColor = "#fff"
                    navBarButtonColor = "#fff"
                    title="Home" hideNavBar initial
                />
                <Scene
                    key="scene_topics" 
                    component={TopicScreen} 
                    backbuttonTintColor = "#fff"
                    navBarButtonColor = "#fff"
                    title="Topics Menu" 
                />
                <Scene
                    key="scene_instructions" 
                    component={InstructionScreen} 
                    backbuttonTintColor = "#fff"
                    navBarButtonColor = "#fff"
                    title="Instructions"
                />
                <Scene
                    key="scene_quiz" 
                    component={QuizScreen} 
                    backbuttonTintColor = "#fff"
                    navBarButtonColor = "#fff"
                    title="Quiz" hideNavBar
                />
                <Scene
                    key="scene_results" 
                    component={ResultScreen} 
                    backbuttonTintColor = "#fff"
                    navBarButtonColor = "#fff"
                    title="Result" 
                    renderBackButton={() => {}} onBack={() => Actions.popTo('scene_topics')}
                />
                <Scene 
                    key="scene_settings" 
                    component={SettingScreen} 
                    backbuttonTintColor = "#fff"
                    navBarButtonColor = "#fff"
                    title="Settings"
                />
                <Scene 
                    key="scene_about" 
                    component={AboutScreen} 
                    backbuttonTintColor = "#fff"
                    navBarButtonColor = "#fff"
                    title="About"
                />
                <Scene 
                    key="scene_upgrade" 
                    component={UpgradeScreen} 
                    backbuttonTintColor = "#fff"
                    navBarButtonColor = "#fff"
                    title="Upgrade To Pro"
                />
            </Scene>
        </Router>
    );
};

const styles = StyleSheet.create({
    sceneStyle: {
              backgroundColor: colors.primary,
 //        ...Platform.select({
 //          ios: {  
 //          },
 //          android: {
 //              paddingTop: sbh,
          // }
        // }),
    },
    barStyle: { 
        backgroundColor: colors.primary,
    } ,
    titleStyle: {
        color: colors.text_navbar,
    },
});

export default RouterComponent;
