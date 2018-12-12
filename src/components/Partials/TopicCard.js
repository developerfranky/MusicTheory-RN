import React, { Component } from 'react';

import {
    StyleSheet,
    View,
    Text
} from 'react-native';
import ListSelectView from './ListSelectView';

import * as colors from '../colors'; 


class TopicCard extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={ styles.name }>{this.props.topic_name}</Text>
                    <Text style={ styles.description }>{this.props.topic_description}</Text>
                </View>
                <ListSelectView
                    // onPress={this.props.onPress}
                    list_options={this.props.list_options}
                    topic_name={this.props.topic_name}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        // shadowColor: '#000000',
        // shadowOffset: {width: 1, height: 2},
        // shadowOpacity: 0.2,
        // shadowRadius: 5,

        // elevation: 2,
        
        borderWidth: 1,
        borderColor: colors.divider,

        marginBottom: 10,
        borderRadius: 5,
    },
    header: {
        backgroundColor: colors.primary,
        paddingLeft: 10,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
    },
    name: {
        color: colors.text_primary,
        fontSize: 18,
        paddingTop: 5,
        paddingLeft: 5,
        paddingRight: 5,
    },
    description: {
        color: '#fff',
        fontSize: 14,
        paddingBottom: 5,
        paddingLeft: 5,
        paddingRight: 5,
    },
});


export default TopicCard;