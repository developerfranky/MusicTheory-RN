import React, { Component } from 'react';
import { View, Text, Image, AsyncStorage, Dimensions } from 'react-native';

import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import Divider from './Divider';
import TouchableDiv from './TouchableDiv';

import { text_primary, text_secondary } from '../colors';
import { chooseTopic, clearHighScore } from '../../redux_actions';

import {scaledSize} from '../utils';



class OptionButton extends Component {
	constructor(props) {
	  	super(props);
        // this.state = { stars: null, clickable: this.props.level == 1 ? true : false, };
	  	this.state = { stars: null };
		this.pressTopic = this.pressTopic.bind(this);
	}
	pressTopic() {
        // if (!this.props.clickable) return;
        this.props.chooseTopic(this.props.option);
        Actions.scene_instructions();
    }

    componentDidMount() {
        this.getHighScore();
    }

    getHighScore() {
    	AsyncStorage.getItem(this.props.option.id, (err, result) => {
            if (result) {
	            let stored = JSON.parse(result);
	            // console.log('stored item for ' + this.props.option.id);
	            // console.log(stored);
	            this.setState({ stars: stored.stars })
                // this.props.mark_complete(this.props.topic_name, this.props.level)
                // if (parseInt(stored.stars) >= 3) this.props.manage_level(this.props.level)
	        }
        }); 
    }

    componentDidUpdate(prevProps, prevState) {
    	if (this.props.new_high_score == this.props.option.id) {
    		// console.log('need to update this componenet to newest score: ' + this.props.option.id);
    		this.getHighScore();
    		this.props.clearHighScore()
    	}


        // if (this.props.levels_complete[this.props.topic_name][(parseInt(this.props.level) - 1).toString()]) {
        //     this.setState({clickable: true});
        // }
    }

    renderStars() {
        const _l = [1,2,3,4,5];
        return _l.map(num => 
            <Image style={ styles.score_rating } resizeMode="contain" key={num} source={this.state.stars >= num ? require('../../../assets/icons/star.png') : require('../../../assets/icons/star_o.png')} />
        );
    }

 	render() {
        const { buttonStyle, textStyle } = styles; 
        // console.log('this.props.level inside componentDidUpdate');
        // console.log(this.props.level);
        // console.log(this.props.levels_complete);
        // console.log('this.props.option');
		// console.log(this.props.option);
		// const _icon = this.props.icon;

		// const icon = this.props.icon ? require('') : require('../../../assets/x.png');
        // const opacity = { opacity: this.props.clickable ? 1 : 0.5 };
        return (    
            <TouchableDiv onPress={this.pressTopic}>
				<View 
                    // style={{ marginBottom: this.props.level == this.props.max_level ? 20 : 0 }}
                    >
					<View style={[buttonStyle, this.props.style, {aspectRatio: this.props.is_portrait ? 3 : 5 }]} >
						<Image 
							source={ this.props.option.icon ? this.props.option.icon : null }
							style={styles.imageStyle}
                            resizeMode="contain"
						/>
						<View style={styles.right}>
							<Text style={styles.levelText}>Level {this.props.level}{this.props.option.pro_only ? ' (Pro Only)': ''}</Text>
                            <Text style={styles.textStyle}>{this.props.option.text}</Text>
							{this.state.stars != null  && 
							<View style={{ flexGrow: 1, justifyContent: 'flex-end' }}>
                                <View style={ styles.score_rating_container }>
                                    {this.renderStars()}
                                </View>
		                    </View>
							}
						</View>
					</View>
					{this.props.level != this.props.max_level && <Divider />}
				</View>
			</TouchableDiv>			
		);
	}
}

const styles = {
	buttonStyle: {
		// backgroundColor: 'green',
		// height: 48,
		flex: 1,
		// alignItems: 'center',
		flexDirection: 'row',
        paddingLeft: 10,
        paddingRight: 10,
	},
	textStyle: {
		color: text_secondary,
        fontSize: scaledSize(14),
	},
	levelText: {
		color: text_primary,
        // fontSize: 16,
		fontSize: scaledSize(18),
	},
	score_rating_container: {
        flexDirection: 'row',
        // height: '60%',
        // backgroundColor: 'gray',
        width: '50%',
        alignSelf: 'flex-end',
    },
    imageStyle: {
        height: undefined,
        width: undefined,
        flex: 1,
        alignSelf: 'stretch',
        // backgroundColor: 'red',
    },
    score_rating: {
        tintColor: 'orange',
        flex: 1,
        height: scaledSize(30),
        width: undefined,
        alignSelf: 'stretch',
    },
    right: {
        flex: 2, 
        width: '100%', 
        paddingLeft: 10, 
        paddingTop: 10,
        paddingBottom: 10,
        paddingRight: 0,
    },
};

const mapStateToProps = (state) => {
    const { new_high_score } = state.category;
	const { is_portrait } = state.dimension;
	return { new_high_score, is_portrait };
}

export default connect(mapStateToProps, { chooseTopic, clearHighScore })(OptionButton)
