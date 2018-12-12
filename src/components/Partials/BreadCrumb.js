import React from 'react';
import { View, Text, Dimensions } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export default class BreadCrumb extends React.Component {
	render() {
		return (
			<View style={styles.crumbContainerStyle} >
				<Text style={styles.crumbTextStyle}>yo</Text>
			</View>
		);
	}
}

const styles = {
	crumbContainerStyle: {
		backgroundColor: '#f57709',
		width: SCREEN_WIDTH,
		height: SCREEN_HEIGHT / 10 * 0.5,
	},
	crumbTextStyle: {
		color: '#fff',
		fontSize: 18,
	}
};
