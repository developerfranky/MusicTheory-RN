import React, { Component } from 'react';
import { Text, View, Animated, Image } from 'react-native';
import { connect } from 'react-redux';
import { newQuestion, pushUserAnswer, addMistake } from '../../redux_actions';

import TouchableDiv from './TouchableDiv';
import _ from 'lodash';
import { Note } from 'tonal';

import * as colors from '../colors';
import {scaledSize} from '../utils';

class NoteInput extends Component {
	constructor(props) {
	  	super(props);
		
		this.state = { 
		 	animatedValue: new Animated.Value(0),
		 	// animation_color: colors.correct_note_input,
            backgroundColor: (!this.props.piano || this.props.color === 'white') ? '#fff' : '#000',
		 	initial_background: (!this.props.piano || this.props.color === 'white') ? '#fff' : '#000',
		 	answer_complete: false,
	  	};
	  	this.playSound = this.playSound.bind(this);
        this.soundNote = this.soundNote.bind(this);
	}

	componentDidUpdate(prevProps, prevState) {
	  if (prevProps.question.reference_code != this.props.question.reference_code) {
	  	this.setState({ backgroundColor: this.state.initial_background, answer_complete: false });	
	  }	
	}

	checkAnswer(answer) {
		/// for checking if we got all answers. 
		let current_attempts;
		if (this.props.user_answers.includes(answer)) {
			// console.log('included.');
			current_attempts = this.props.user_answers;
		} else {
			// console.log('not included');
			if (this.props.answer_array.includes(answer)) { 
				current_attempts = this.props.user_answers.concat(answer);
			}
			else { current_attempts = this.props.user_answers; }
		}

		if (current_attempts.length == this.props.answer_array.length) { // got all the right answers!
			// animate correct text I guess.
			this.setState({answer_complete: true}, () => {
				// console.log('inside call backl to set state');
				Animated.timing(this.state.animatedValue, {
				  	toValue: 1000,
				  	duration: 40,
				}).start(() => {
					// console.log('inside callback to animated start');
					// this.props.addScore();
					this.props.newQuestion();
				})
			});
		}
	}

	playSound(sound_ref) {
		sound_ref.play((success) => {
		  //   // reset the player to its uninitialized state (android only)
		  //   // this is the only option to recover after an error occured and use the player again
		  if (!success) sound_ref.reset();
		});
	}

	pressNote() {
		// if in piano mode, check for enharmonics ie, Piano key is E, answer is Fb, should code to
        // as if the user pressed Fb. 
        // check 
        let note = this.props.note;

        if (this.props.piano) { // if note is enharmonic to a solution, push that solution.
            for (var i = 0; i < this.props.answer_array.length; i = i + 1) {
                let answer = this.props.answer_array[i];
                if (Note.enharmonic(note) == Note.enharmonic(answer) 
                    || Note.enharmonic(note) == answer) note = answer;
            }
        } 

        if (this.props.answer_array.includes(note)) {
            // set background color
            if (!this.props.is_mute) this.soundNote();
            this.setState({ backgroundColor: colors.correct_note_input });
        } else {
            // this.playSound(this.props.sounds['c4']); // testing
            this.props.addMistake(note);
            // this.props.addMistake();
            this.setState({ backgroundColor: colors.wrong_note_input });
        }
        
		this.props.pushUserAnswer(note);
		this.checkAnswer(note);
	}

	soundNote() {
		let note;
		if (this.props.topic_id.split('_')[0] === 'notes'){
			// the reference code is just the answer. Eg: alto_a3, bass_c3.
			// we're going to use the reference code to play the correct mp3. 
			// when topic_id starts with notes, there is only 1 answer since the question is just to identify 
			// the note shown on the clef, so it's okay to assume the reference code is the correct mp3. 
			note = this.props.question.reference_code.split('_')[1];
		}
		else {
			note = this.props.note.toLowerCase();
			// console.log('note before');
			// console.log(this.props.note);
			// console.log(note);

			if (note.length === 1) { // natural note
				if (!this.props.piano && (note === 'a' || note === 'b')) note = note + '3';
				else note = note + '4';
			}
			else if (note.charAt(1) === '#') { // sharps
                if (note === 'a#' && this.props.piano) note = 'as4'; 
				else if (note === 'a#') note = 'as3'; 
				else if (note === 'b#') note = 'c4';
				else if (note === 'e#') note = 'f4';
				else note = note.replace('#', 's') + '4';
			}
			else {
				if (note === 'ab') note = 'gs3';
				else if (note === 'bb') note = 'as3';
				else if (note === 'cb') note = 'b3';
				else if (note === 'db') note = 'cs4';
				else if (note === 'eb') note = 'ds4';
				else if (note === 'fb') note = 'e4';
				else note = 'fs4';
			}
		}
		
		// console.log('note after');
		// console.log(note);
		// console.log('this.props.sounds');
		// console.log(this.props.sounds);

		this.playSound(this.props.sounds[note]);
	}

	handlePress() {
		// Animated.timing(this.state.animatedValue, {
		//   	toValue: 1000,
		//   	duration: 1000,
		// }).start();		
		this.props.onPress(this.props.note);
	}

    render() {
        // console.log(this.state.animation_color);
        var interpolateColor = this.state.animatedValue.interpolate({
            inputRange: [0, 1000],
            outputRange: [this.state.initial_background, colors.correct_note_input]
        });

        let {fadeAnim } = this.state;
        let animatedStyle = {
            backgroundColor: interpolateColor
        };
        
        let borderStyle = { };
        
        if (this.props.addBorders) {
            borderStyle = {
                borderColor: '#eee',
                borderRightWidth: 1,
                borderLeftWidth: 1,
            }
        }

        if (this.props.piano) {
            const x = this.props.screen_width;
            // const x = 100;
            const w = x / 7;
            const b = x / 12;

            let style={
                borderColor: 'black', 
                borderWidth: 1, 
                // width: this.props.color == 'white' ? w.toString() + '%': (b).toString() + '%',
                width: this.props.color == 'white' ? w : b,
                height: this.props.color == 'white' ? '100%' : '62%',
                // height: this.props.color == 'white' ? '50%' : '31%',
                position: 'absolute', 
                left: 0, 
                top: 0,
                zIndex: this.props.color == 'white' ? 0 : 3,
                justifyContent: 'flex-end'
            }

            // if (this.props.note === 'C'){
            //     style = {...style}
            // }
            if (this.props.note === 'D') style = { ...style, left: w*1}
            if (this.props.note === 'E') style = { ...style, left: w*2}
            if (this.props.note === 'F') style = { ...style, left: w*3}
            if (this.props.note === 'G') style = { ...style, left: w*4}
            if (this.props.note === 'A') style = { ...style, left: w*5}
            if (this.props.note === 'B') style = { ...style, left: w*6}
            if (this.props.note === 'C#') style = { ...style, left: w-b*2/3 }
            if (this.props.note === 'D#') style = { ...style, left: 2*(w-b*2/3) + b }
            if (this.props.note === 'F#') style = { ...style, left: 3*(w-b*2/3) + 2*b + (w - b*3/4) }
            if (this.props.note === 'G#') style = { ...style, left: 3*(w-b*2/3) + 3*b + 2*(w - b*3/4) }
            if (this.props.note === 'A#') style = { ...style, left: 3*(w-b*2/3) + 4*b + 3*(w - b*3/4) }
            
            // console.log('piano key style: ' + this.props.note);
            // console.log(style);
            // return <View style={style} /> 
            return (
                <TouchableDiv onPress={this.pressNote.bind(this)}> 
                    <Animated.View style={ 
                        this.state.answer_complete 
                        ? [style, animatedStyle ]
                        : [style, { backgroundColor: this.state.backgroundColor} ]
                    } >
                        {this.props.piano_notes && this.props.color == 'white' &&
                            <Text style={styles.pianoNoteName}>{this.props.note}</Text>
                        }
                    </Animated.View>
                </TouchableDiv>
            )

        }
        else {
            return  (
                <TouchableDiv onPress={ this.pressNote.bind(this) } style={styles.noteContainer}> 
                    <Animated.View style={ 
                        this.state.answer_complete 
                        ? [styles.noteInput, borderStyle, animatedStyle ]
                        : [styles.noteInput, borderStyle, { backgroundColor: this.state.backgroundColor} ]
                    } >
                        <View style={{ flexDirection: 'row', flex: 1,}}>
                            <Text style={styles.noteText}>{this.props.note.length === 1 ? this.props.note : this.props.note.charAt(0)}</Text>
                            { this.props.note.length > 1 && 
                            <Image 
                                source={this.props.note.charAt(1) == 'b' ? require('../../../assets/icons/flat.png'):require('../../../assets/icons/sharp.png') } 
                                style={styles.icon_style} 
                                resizeMode="contain" 
                            />
                            }
                        </View> 
                    </Animated.View>
                </TouchableDiv>
            )
        }
    }
}
const styles = {
	noteContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	noteInput: {
		width: '100%',
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
    pianoNoteName: {
        fontSize: scaledSize(24),
        textAlign: 'center',
        marginBottom: scaledSize(10),
        // backgroundColor: 'red',
        color: colors.text_secondary,
    },
	noteText: {
		// fontSize: scaledSize(32)
		fontSize: scaledSize(24),
		textAlignVertical: "center",
		textAlign: 'center',
        alignSelf: 'center', // this was added in for iOS only, check if it breaks android
	},
	icon_style: {
        height: scaledSize(24) * .80, 
        width: scaledSize(24)/2, 
        alignSelf: 'center',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginRight: 'auto',
        tintColor: colors.text_secondary
    }
};

mapStateToProps = (state) => {
	const { topic_id, category } = state.category;
    const { question, answer_array, user_answers } = state.question;
    const { sounds, is_mute } = state.sound;
    const { piano_notes } = state.quiz;
    const { screen_width } = state.dimension;
    return { topic_id, category, question, answer_array, user_answers, sounds, is_mute, piano_notes, screen_width };
}

export default connect(mapStateToProps, { newQuestion, 
	pushUserAnswer, addMistake })(NoteInput)
