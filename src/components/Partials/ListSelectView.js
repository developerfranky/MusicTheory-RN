import React, { Component } from 'react';
import { View, Text, Dimensions, StatusBar } from 'react-native';
import OptionButton from './OptionButton';

class ListSelectView extends Component {
    // constructor(props) {
    //   super(props);
    
    //   this.state = {
    //     levels: { 1: true }
    //   };
    //   this.manage_level = this.manage_level.bind(this);
    // }
    
    // manage_level(level) {
    //     let _l = Object.assign({}, this.state.levels);
    //     _l[level] = true;
    //     this.setState({ levels: _l });
    // }
    
    renderOptions() {
        return this.props.list_options.map((option, index) =>{
            // console.log('(index+1).toString()');
            // console.log((index+1).toString());
            // console.log('state.levels');
            // console.log(this.state.levels);
            // console.log(((index+1).toString() in this.state.levels));
           return <OptionButton 
                key={option.id}
                option={option}
                level={index+1}
                max_level={this.props.list_options.length}
                // topic_name={this.props.topic_name}
                // manage_level={this.manage_level}
                // clickable={ (index + 1).toString() in this.state.levels } // index instead of index + 1 because if the previous leve is there, then the next one should be clicakble
            /> 
        }
        );
    }

    render() {
        return (
            <View style={{paddingLeft: 5, paddingRight: 5}}>
                {this.renderOptions()}
            </View>
        );
    }
}

export default ListSelectView;

