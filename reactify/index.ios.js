/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Image,
  View
} from 'react-native';

import HelloWorld from './HelloWorld.js';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  header: {
    fontSize: 25
  },
  subheaeder: {
    fontSize: 15
  },
  backSet: {
    flex: 1,
    backgroundColor: '#F5FCFF'
  },
  started: {
    fontSize: 20,
    height: 50
  }

});


class Splash extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>
          Greetings from Asbury Park, NJ
        </Text>
        <Text style={styles.subheader}>
          Come Play
        </Text>
      </View>
    );
  }
}

class Started extends Component {
  render() {
    return (
      <View>
        <Text style={styles.started}>
          Let{'\''}s get started
        </Text>
      </View>
    );
  }
}


class reactify extends Component {
  render() {
    return (
      <View style={styles.backSet, styles.container}>
        
          <Splash/>
          <Started/>
          <HelloWorld/>
        
      </View>
    )
  }
  
}



AppRegistry.registerComponent('reactify', () => reactify);
