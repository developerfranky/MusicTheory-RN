import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import TouchableDiv from './TouchableDiv';

import * as colors from '../colors';
import {scaledSize} from '../utils';


export default class MenuButton extends Component {
	render() {
		const { buttonStyle, textStyle } = styles;

		return (
			<TouchableDiv onPress={this.props.onPress} style={{ borderRadius: 5 }}>
				<View style={[buttonStyle, this.props.style]} >
			 		<Image 
			 			style={{flex:1, height: undefined, width: undefined, alignSelf: 'stretch'}}
			 			source={this.props.image}
		 			  	resizeMode="contain"
			 		/>
					<Text style={textStyle}>{this.props.text}</Text>
				</View>
			</TouchableDiv>
		);
	}
}

const styles = {
	buttonStyle: {
		backgroundColor: colors.surface,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 5,
		shadowColor: '#000000',
		shadowOffset: {width: 1, height: 2},
		shadowOpacity: 0.2,
		shadowRadius: 5,
		elevation: 2,
		padding: 5,
		// marginTop: 10, 
	},
	textStyle: {
		color: colors.text_primary,
		// fontSize: 18,
		fontSize: scaledSize(20),
	},
	iconStyle: {
	    flex: 1,
	    height: 'undefined',
	    width: 'undefined',
	}
};
