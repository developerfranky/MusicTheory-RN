import React, { Component } from 'react';
// import { View, Dimensions } from 'react-native';
import { View, Switch, Text } from 'react-native';
import { connect } from 'react-redux';
import NoteInput from './NoteInput';

import { setMute, togglePiano, togglePianoNotes } from '../../redux_actions';
import * as colors from '../colors';

class NoteBoard extends Component {
    constructor(props) {
      super(props);
      this.setMute = this.setMute.bind(this);
    }
    
    setMute() {
    	this.props.setMute(!this.props.is_mute);
    }

    render() {
        return (
            <View style={[this.props.style, {marginTop: 'auto'}]}>
                <View style={{flexDirection: 'row',  borderBottomWidth: 1, borderColor: '#eee'}}>
                    <View style={[styles.switch_container, {justifyContent: 'flex-start'}]}>
                        <Text style={styles.switch_text}>Piano</Text>
                        <Switch tintColor={colors.dark_gray} onTintColor={colors.primary_light} thumbTintColor={colors.primary}
                            value={this.props.piano} onValueChange={this.props.togglePiano} />
                    </View>
                    { this.props.piano && 
                    <View style={[styles.switch_container, {justifyContent: 'center'}]}>
                        <Text style={styles.switch_text}>Note Names</Text>
                        <Switch tintColor={colors.dark_gray} onTintColor={colors.primary_light} thumbTintColor={colors.primary}
                            value={this.props.piano_notes} onValueChange={this.props.togglePianoNotes}/>
                    </View>
                    }
                    <View style={[styles.switch_container, {justifyContent: 'flex-end'}]}>
                        <Text style={styles.switch_text}>Sound</Text>
                        <Switch tintColor={colors.dark_gray} onTintColor={colors.primary_light} thumbTintColor={colors.primary} 
                        	value={!this.props.is_mute} onValueChange={this.setMute}/>
                    </View>
                </View>
                { this.props.piano &&
	                <View style={styles.piano_container}>
	                    <NoteInput note={'C'} color="white" piano >C</NoteInput>
	                    <NoteInput note={'D'} color="white" piano >D</NoteInput>
	                    <NoteInput note={'E'} color="white" piano >E</NoteInput>
	                    <NoteInput note={'F'} color="white" piano >F</NoteInput>
	                    <NoteInput note={'G'} color="white" piano >G</NoteInput>
	                    <NoteInput note={'A'} color="white" piano >A</NoteInput>
	                    <NoteInput note={'B'} color="white" piano >B</NoteInput>
	                    <NoteInput note={'C#'} color="black" piano >C#</NoteInput>
	                    <NoteInput note={'D#'} color="black" piano >D#</NoteInput>
	                    <NoteInput note={'F#'} color="black" piano >F#</NoteInput>
	                    <NoteInput note={'G#'} color="black" piano >G#</NoteInput>
	                    <NoteInput note={'A#'} color="black" piano >A#</NoteInput>
	                </View>
		        }
		        { !this.props.piano && this.props.only_naturals && !this.props.is_portrait &&
		        	<View style={{flex: 1}}>
	                    <View style={styles.inputRow}>
	                        <NoteInput note={'A'}>A</NoteInput>
	                        <NoteInput note={'B'}>B</NoteInput>
	                        <NoteInput note={'C'}>C</NoteInput>
	                        <NoteInput note={'D'}>D</NoteInput>
	                        <NoteInput note={'E'}>E</NoteInput>
	                        <NoteInput note={'F'}>F</NoteInput>
	                        <NoteInput note={'G'}>G</NoteInput>
	                    </View>
	                </View>
		        }
		        { !this.props.piano && !this.props.only_naturals && !this.props.is_portrait &&
		        	<View style={{flex: 1}}>
	                    <View style={styles.inputRow}>
	                        <NoteInput note={'Ab'}>Ab</NoteInput>
	                        <NoteInput note={'Bb'} addBorders>Bb</NoteInput>
	                        <NoteInput note={'Cb'} addBorders>Cb</NoteInput>
	                        <NoteInput note={'Db'} addBorders>Db</NoteInput>
	                        <NoteInput note={'Eb'} addBorders>Eb</NoteInput>
	                        <NoteInput note={'Fb'} addBorders>Fb</NoteInput>
	                        <NoteInput note={'Gb'}>Gb</NoteInput>
	                    </View>
	                    <View style={styles.inputRow}>
	                        <NoteInput note={'A'}>A</NoteInput>
	                        <NoteInput note={'B'} addBorders>B</NoteInput>
	                        <NoteInput note={'C'} addBorders>C</NoteInput>
	                        <NoteInput note={'D'} addBorders>D</NoteInput>
	                        <NoteInput note={'E'} addBorders>E</NoteInput>
	                        <NoteInput note={'F'} addBorders>F</NoteInput>
	                        <NoteInput note={'G'}>G</NoteInput>
	                    </View>
	                    <View style={styles.inputRow}>
	                        <NoteInput note={'A#'}>A#</NoteInput>
	                        <NoteInput note={'B#'} addBorders>B#</NoteInput>
	                        <NoteInput note={'C#'} addBorders>C#</NoteInput>
	                        <NoteInput note={'D#'} addBorders>D#</NoteInput>
	                        <NoteInput note={'E#'} addBorders>E#</NoteInput>
	                        <NoteInput note={'F#'} addBorders>F#</NoteInput>
	                        <NoteInput note={'G#'}>G#</NoteInput>
	                    </View>
	                </View>
		        }
		        { !this.props.piano && this.props.only_naturals && this.props.is_portrait &&
			        <View style={{flex: 1}}>
	                    <View style={styles.inputRow}>
	                        <NoteInput note={'A'}>A</NoteInput>
	                    </View>
	                    <View style={styles.inputRow}>
	                        <NoteInput note={'B'}>B</NoteInput>
	                    </View>
	                    <View style={styles.inputRow}>
	                        <NoteInput note={'C'}>C</NoteInput>
	                    </View>
	                    <View style={styles.inputRow}>
	                        <NoteInput note={'D'}>D</NoteInput>
	                    </View>
	                    <View style={styles.inputRow}>
	                        <NoteInput note={'E'}>E</NoteInput>
	                    </View>
	                    <View style={styles.inputRow}>
	                        <NoteInput note={'F'}>F</NoteInput>
	                    </View>
	                    <View style={styles.inputRow}>
	                        <NoteInput note={'G'}>G</NoteInput>
	                    </View>
	                </View>
	             }
	             { !this.props.piano && !this.props.only_naturals && this.props.is_portrait &&
	             	<View style={{flex: 1}}>
	                    <View style={styles.inputRow}>
	                        <NoteInput note={'Ab'}>Ab</NoteInput>
	                        <NoteInput note={'A'} addBorders>A</NoteInput>
	                        <NoteInput note={'A#'}>A#</NoteInput>
	                    </View>
	                    <View style={styles.inputRow}>
	                        <NoteInput note={'Bb'}>Bb</NoteInput>
	                        <NoteInput note={'B'} addBorders>B</NoteInput>
	                        <NoteInput note={'B#'}>B#</NoteInput>
	                    </View>
	                    <View style={styles.inputRow}>
	                        <NoteInput note={'Cb'}>Cb</NoteInput>
	                        <NoteInput note={'C'} addBorders>C</NoteInput>
	                        <NoteInput note={'C#'}>C#</NoteInput>
	                    </View>
	                    <View style={styles.inputRow}>
	                        <NoteInput note={'Db'}>Db</NoteInput>
	                        <NoteInput note={'D'} addBorders>D</NoteInput>
	                        <NoteInput note={'D#'}>D#</NoteInput>
	                    </View>
	                    <View style={styles.inputRow}>
	                        <NoteInput note={'Eb'}>Eb</NoteInput>
	                        <NoteInput note={'E'} addBorders>E</NoteInput>
	                        <NoteInput note={'E#'}>E#</NoteInput>
	                    </View>
	                    <View style={styles.inputRow}>
	                        <NoteInput note={'Fb'}>Fb</NoteInput>
	                        <NoteInput note={'F'} addBorders>F</NoteInput>
	                        <NoteInput note={'F#'}>F#</NoteInput>
	                    </View>
	                    <View style={styles.inputRow}>
	                        <NoteInput note={'Gb'}>Gb</NoteInput>
	                        <NoteInput note={'G'} addBorders>G</NoteInput>
	                        <NoteInput note={'G#'}>G#</NoteInput>
	                    </View>
	                </View>
	             }
            </View>
        );
    }
}


const styles = {
    inputRow: {
        flexGrow: 1,    
        width: '100%',
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: '#eee',
    },
    piano_container: {
        flexDirection: 'row',
        // backgroundColor: 'red',
        flexGrow: 1,
        // width: '100%'
    },
    switch_container: {
        flexDirection: 'row',
        flexGrow: 1,
    },
    switch_text: {
        color: colors.text_primary,
        margin: 10
    },
};

const mapStateToProps = (state) => {
    const { is_portrait, screen_height, screen_width } = state.dimension;
    const { piano_notes } = state.quiz;
    const { is_mute } = state.sound;
    return { is_portrait, screen_height, screen_width, is_mute, piano_notes };
};


export default connect(mapStateToProps, { setMute, togglePiano, togglePianoNotes })(NoteBoard);
