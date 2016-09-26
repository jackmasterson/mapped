import React, { Component } from 'react';
import { View, Text, Navigator } from 'react-native';

export default class HelloWorld extends Component {
  static get defaultProps() {
    return {
      title: 'HelloWorld'
    };
  }

  render() {
    return (
      <View>
        <Text>Hi! My name is Jack.</Text>
      </View>
    )
  }
}