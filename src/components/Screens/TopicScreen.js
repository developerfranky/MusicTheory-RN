import React, { Component } from 'react';
import { StyleSheet, View, Text, FlatList, ScrollView, SectionList, Dimensions } from 'react-native';

import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import TopicCard from '../Partials/TopicCard';
import OptionButton from '../Partials/OptionButton';
import {scaledSize} from '../utils';

import * as colors from '../colors';

const padding = 10;

class TopicScreen extends Component {

    render() { 
        const sections = this.props.topic_dict.sections;
        // console.log(sections)
        // console.log(sections.length)
        return <SectionList
          style={styles.container}  
          renderItem={({item, index, section}) => 
            <OptionButton 
                key={item.id}
                option={item}
                level={index+1}
                max_level={section.data.length}
            />} 
          renderSectionHeader={({section: {name, description}}) => (
            <View style={styles.section_container}>
                <Text style={styles.section_name}>{name}</Text>
                <Text style={styles.section_description}>{description}</Text>
            </View>
          )}
          sections={sections}
          keyExtractor={(item, index) => item + index}
          // stickySectionHeadersEnabled={false}
        />
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        // paddingLeft: padding, 
        // paddingRight: padding, 
        // paddingBottom: padding, 
        // padding: padding,
    },
    empty: {
        height: padding, 
    },
    section_container: {
        // borderLeftWidth: 1,
        // borderRightWidth: 1,
        // borderColor: colors.divider,
        marginBottom: 10,
        // borderRadius: 5,
    // },
    // section_header: {
        backgroundColor: colors.dark_gray,
        // backgroundColor: colors.primary,
        // paddingLeft: 10,
        // paddingRight: 10,
        // paddingBottom: 10,
        padding: 10,
        
        // borderTopLeftRadius: 5,
        // borderTopRightRadius: 5,
    },
    section_name: {
        color: colors.text_primary,
        fontSize: scaledSize(18),
        paddingTop: 5,
        paddingLeft: 5,
        paddingRight: 5,
    },
    section_description: {
        color: colors.text_secondary,
        fontSize: scaledSize(14),
        paddingBottom: 5,
        paddingLeft: 5,
        paddingRight: 5,
    },
});


const mapStateToProps = (state) => {
    const { category, topic_dict } = state.category;
    return { category, topic_dict };
};

export default connect(mapStateToProps, null)(TopicScreen);
