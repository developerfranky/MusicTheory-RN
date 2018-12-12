import React, { Component } from 'react';
import { View, Text, Dimensions, StatusBar, Alert, TouchableOpacity, Platform } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import { startDrill, newQuestion, addScore, resetScore, startQuiz, 
    endQuiz, retryQuiz, addSounds } from '../../redux_actions';
import NoteBoard from '../Partials/NoteBoard';
// import PianoKeys from '../Partials/PianoKeys';
import Question from '../Partials/Question';

import { getStatusBarHeight } from 'react-native-status-bar-height';
import * as colors from '../colors';

import { TREBLE_NOTES_DICT, BASS_NOTES_DICT, ALTO_NOTES_DICT } from '../../core_music_logic/types'; 

const sbh = getStatusBarHeight();

const SCREEN_HEIGHT = Dimensions.get('window').height;
const WORKING_HEIGHT = (SCREEN_HEIGHT - sbh);
console.log('WORKING_HEIGHT');
console.log(WORKING_HEIGHT);

var Fabric = require('react-native-fabric');
var { Answers } = Fabric;

const sb = Platform.select({
    ios: <View style={{ backgroundColor: colors.primary, height: sbh }}/>,
    android: <View></View>,
});

const TIME = 60;


const findNotesNeeded = (clef_dict, topic_details) => {
    if (topic_details === 'lines') return clef_dict['lines'].map(obj => obj.code + '.mp3');
    if (topic_details === 'spaces') return clef_dict['spaces'].map(obj => obj.code + '.mp3');
    if (topic_details === 'linespaces') return clef_dict['spaces'].concat(clef_dict['lines']).map(obj => obj.code + '.mp3');
    if (topic_details === 'below') return clef_dict['below'].map(obj => obj.code + '.mp3');
    if (topic_details === 'above') return clef_dict['above'].map(obj => obj.code + '.mp3');
    if (topic_details === 'belowabove') return clef_dict['below'].concat(clef_dict['above']).map(obj => obj.code + '.mp3');
    if (topic_details === 'allnormal') {
        return clef_dict['below']
            .concat(clef_dict['lines'])
            .concat(clef_dict['spaces'])
            .concat(clef_dict['above'])
            .map(obj => obj.code + '.mp3');
    }
    if (topic_details === 'altissimo') return clef_dict['altissimo'].map(obj => obj.code);
    if (topic_details === 'all') {
        return clef_dict['below']
            .concat(clef_dict['lines'])
            .concat(clef_dict['spaces'])
            .concat(clef_dict['above'])
            .concat(clef_dict['altissimo'])
            .map(obj => obj.code + '.mp3');
    }
    return [];
}

class QuizScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            time: 0,
            timer: null,
            notes_pressed: [],
        };
        this.tick = this.tick.bind(this);
    }

    componentWillMount() {
        const topic = this.props.topic_id.split('_');
        if (topic[0] === 'notes') {
            // find out what clef 
            let clef = topic[1];
            let clef_dict;
            
            // find out what notes will be needed
            if (clef === 'treble') clef_dict = TREBLE_NOTES_DICT;
            else if (clef === 'bass') clef_dict = BASS_NOTES_DICT;
            else clef_dict = ALTO_NOTES_DICT;

            const notes = findNotesNeeded(clef_dict, topic[2]); // returns a list of codes ['a3', 'b3', 'c4'...]

            // load in extra notes if not there already.
            let missing_notes = []; 
            for (let i = 0; i < notes.length; i = i + 1) {
                if (this.props.sounds[notes[i]]) continue; // sound already loaded;
                missing_notes.push(notes[i])
            }

            this.props.addSounds(missing_notes)
        }
    }

    componentDidMount() {
        this.props.startDrill(this.props.topic_id);
        this.startTimer();
    }

    startTimer(){
        // console.log('starting timer')
        Answers.logCustom('Minute Started', {topic_id: this.props.topic_id});
        this.props.resetScore();

        let timer = setInterval(this.tick, 1000);
        this.setState({ timer: timer, time: TIME });
        
        this.props.newQuestion();

        // Actions.refresh({ retryingDrill: false })
        this.props.retryQuiz(false);
    }

    componentWillUnmount() {
        // this.setState({modal_visible: false });
        clearInterval(this.state.timer);
    }

    componentDidUpdate(prevProps, prevState) {
        // console.log('componentDidUpdate in quizscreen');
        // console.log('this.props');
        // console.log(this.props);
        // console.log('this.state');
        // console.log(this.state);
        
        // if (this.props.retryingDrill && (this.state.time == 0)) {
        if (this.props.retrying_quiz && (this.state.time == 0)) {
            console.log('should restart timer');
            this.startTimer();
        }  
        // if (this.props.use_piano !== prevProps.use_piano) {
        //     console.log('UPDATED USE PIANO')
        //     this.forceUpdate();
        // }
    }

    //   componentDidUpdate(prevProps, prevState) {
    //     // console.log('componentDidUpdate in quizscreen');
    //     // console.log('this.state');
    //     // console.log(this.state);
        
    //     // if (this.props.retryingDrill && (this.state.time == 0)) {
    //     if (this.props.use_piano !== prevProps.use_piano) {
    //         console.log('UPDATED USE PIANO')
    //         console.log('this.props');
    //         console.log(this.props);
    //         console.log('prevProps');
    //         console.log(prevProps);
    //         this.forceUpdate();
    //     }  
    // }


    tick() {
        if (this.state.time <= 0) {
            clearInterval(this.state.timer);
            Actions.scene_results();
            return;
        }
        this.setState({ time: this.state.time - 1 });
    }

    askQuit() {
        Alert.alert(
            'Quit Minute',
            'Exit this music minute?',
            [
                {text: 'Cancel', onPress: () => {}, style: 'cancel'},
                {text: 'Yes', onPress: () => {
                    Answers.logCustom('Quit Minute', {topic_id: this.props.topic_id});
                    Actions.popTo('scene_topics')
                }},
            ],
        );
    }


    render() {
        // console.log('this.props.question inside QuizScreen');
        // console.log(this.props.question);
        // console.log(this.state);
        const piano = this.props.use_piano;
        // console.log('piano')
        // console.log(piano)
        // let question_style = {
        //     padding: 2, 
        //     backgroundColor:'green',
        //     borderWidth: 2,
        // }
        
        // if (!this.props.is_portrait) question_style = {...question_style, height: '40%', backgroundColor: 'blue'};
        // else if (piano) question_style = {...question_style, flexGrow: 1, backgroundColor: 'pink'}
        // else question_style = {...question_style, height: '30%', backgroundColor: 'purple'}

        return (
            <View style={styles.container}>
                {sb}
                <View style={ styles.statBar }>
                    <TouchableOpacity
                      onPress={() => {this.askQuit()}}
                      style={{width: '25%', justifyContent                                                                                                                                  : 'center'}}>
                        <Text style={{textAlign: 'left', fontSize: 14}}>Quit</Text>
                    </TouchableOpacity>
                    <View style= {{ width: '50%', alignItems: 'center', justifyContent: 'center'}}>
                        <Text style={styles.timeLeft}>{this.state.time}</Text>
                    </View>
                    <View style={styles.scoreContainer}>
                        <Text style={{ textAlign: 'right', margin: 0, padding: 0, color: colors.primary_dark }}>Correct: {this.props.correct_answers}</Text>
                        <Text style={{ textAlign: 'right', margin: 0, padding: 0 }}>Errors: {this.props.mistakes}</Text>
                    </View>
                </View>
                <Question 
                    question={this.props.question.question} 
                    icon={this.props.question.icon}
                    code={this.props.question.reference_code}
                    style={{ 
                        height: this.props.is_portrait ? '30%' : '40%',
                        marginTop: this.props.is_portrait && piano ? '10%' : 0,
                    }}
                /> 
                { this.state.time > 0 &&
                    <NoteBoard 
                        only_naturals= {this.props.category.toLowerCase()=='notes' ? true : false}
                        piano={piano}
                        style={ piano ? {height: this.props.is_portrait ? '35%' : '50%'} : {flexGrow: 1} }
                    />
                } 
                { this.state.time <= 0 &&
                    <View style={styles.timeUp}>
                        <Text style={{ fontSize: 24 }}>Time's up!</Text>
                    </View>
                }
            </View>
        );
    }
}


const styles = {
    container: {
        backgroundColor: '#fff',
        flex: 1,
    },
    content: {
        flex: 1,
    },
    statBar: {
        padding: 5,     
        backgroundColor: '#eee',
        flexDirection: 'row',
    },
    timeLeft: {
        textAlign: 'center',
        fontSize: 25,
        fontWeight: 'bold',
        color: colors.text_primary
    },
    scoreContainer: {
        width: '25%'
    },
    timeUp: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    }
}

const mapStateToProps = (state) => {
    const { topic_id, category } = state.category;
    const { question, correct_answers, mistakes, image } = state.question;
    const { retrying_quiz, use_piano } = state.quiz;
    const { sounds } = state.sound;
    const { is_portrait, working_height, screen_height, screen_width } = state.dimension;
    return { topic_id, category, question, correct_answers, mistakes, retrying_quiz, 
        sounds, is_portrait, working_height, screen_height, screen_width,use_piano };
};

export default connect(mapStateToProps, { startDrill, newQuestion, addScore, resetScore, 
    startQuiz, endQuiz, retryQuiz, addSounds })(QuizScreen);
