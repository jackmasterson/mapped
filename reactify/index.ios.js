import React, { Component } from 'react';
import {
  AppRegistry,
  Navigator,
  StyleSheet,
  Text,
  Image,
  View,
  TouchableHighlight,
} from 'react-native';

import PageTurn from './PageTurn.js';



const styles = StyleSheet.create({
  container: {
    flex: 1
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
    fontSize: 20
  },
  img: {
    height: 50,
    width: 50
  }

});


class First extends Component {
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

class Second extends Component {
  render() {
    return (
      <Image style={styles.img} source={require('./hey.png')}/>
    )
  }
}

class Scenea extends Component {
  render() {
    return (
      <Text>Hey, click me</Text>
    )
  }
}


class reactify extends Component {
  render() {
    const routes = [
      {title: 'First', index: 0, set: <Scenea/>},
      {title: 'Second', index: 1, set: <Second/>},
    ];
    return (
      <Navigator
        initialRoute={routes[0]}
        initialRouteStack={routes}
        renderScene={(route, navigator) => 
                  
          <TouchableHighlight onPress={() => {
            if (route.index === 0) {
              navigator.push(routes[1]);
            } else {
              navigator.pop();
            }
          }}>
          <View>{route.set}</View>
          </TouchableHighlight>
         
        }
        style={{padding: 100}}
        ></Navigator>
    );
    
  }
}


AppRegistry.registerComponent('reactify', () => reactify);