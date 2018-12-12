import React, { Component } from 'react';
import  { connect } from 'react-redux';
import { View, Text, Dimensions, Image, Animated } from 'react-native';

import { getStatusBarHeight } from 'react-native-status-bar-height';
const sbh = getStatusBarHeight();

import { capFirst } from '../Instructions/Base';
import {scaledSize} from '../utils';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const WORKING_HEIGHT = (SCREEN_HEIGHT - sbh);

import * as colors from '../colors';

class Question extends Component {
	constructor(props) {
	  	super(props);
		
		this.state = { 
		 	animatedValue: new Animated.Value(0),
		 	// animation_color: colors.correct_note_input,
		 	// backgroundColor: '#fff',
	  	};
	}

	renderIcon() {
		if (!this.props.icon) return null;
		
		if (this.props.is_portrait) return (
			<Image source={ this.props.icon }
				style={styles.iconStyle} resizeMode="contain" />
		)
		else return (
			<View style={{ height: '100%'}}>
				<Image source={ this.props.icon }
					style={{ height: '100%' }} resizeMode="contain" />
			</View>
		)
	}

	render() {
		var interpolateColor = this.state.animatedValue.interpolate({
			inputRange: [0, 1000],
			outputRange: ['#ffffff', colors.correct_note_input]
		});

		let {fadeAnim } = this.state;
		let animatedStyle = {
			backgroundColor: interpolateColor
		};


		return (
			<View style={[
				this.props.style, 
				styles.questionContainerStyle, 
				!this.props.is_portrait ? {flexDirection: 'row'}: {},
			]}>
				<Text style={styles.questionTextStyle}>{capFirst(this.props.question)}</Text>
				{this.renderIcon()}
			</View>
		);
	}
}


const styles = {
	questionContainerStyle: {
		// backgroundColor: '#323232',
		// backgroundColor: colors.dark_gray,
		// height: (WORKING_HEIGHT / 10) * 1.25,
		// width: SCREEN_WIDTH,
		width: '100%',
		// height: '100%',
		justifyContent: 'center',
		// flex: 1,
		// flexDirection: 'row',
		alignItems: 'center',
		// borderBottomWidth: 1,
		// borderColor: '#eee',
		// borderColor: colors.divider,
	},
	questionTextStyle: {
		color: '#000',
		textAlign: 'center',
		fontSize: 24,
		paddingLeft: 20,
		paddingRight: 20, 
		paddingBottom: 0,
		marginBottom: 0,
		paddingLeft: 10,
		marginTop: 10,
	},
	iconStyle: {
		// height: '100%',
		flex:1, 
		height: undefined,
		width: undefined,
		alignSelf: 'stretch',
	}
};

const mapStateToProps = (state) => {
	const { is_portrait } = state.dimension;
	return { is_portrait };
}

export default connect(mapStateToProps, null)(Question)
