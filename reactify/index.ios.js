/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  Navigator,
  StyleSheet,
  Text,
  Image,
  View
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

class Wild extends Component {
  render() {
    return (
      <Image style={styles.img} source={require('./hey.png')}/>
    )
  }
}

class Scenea extends Component {
  render() {
    return (
      <Text>Hey</Text>
    )
  }
}


class reactify extends Component {
  render() {
    return (
    <View style={styles.container}>
      <Splash/>
      

      <Navigator
        initialRoute={{ title: 'My Initial Scene', index: 0 }}
        renderScene = {(route, navigator) =>
     
          <PageTurn
            title={route.title}

            onForward= { () => {
              const nextIndex = route.index + 'a';
              navigator.push({
                title: <Scenea/>,
                index: nextIndex,

              });
            }}

            onBack= {() => {
              if (route.index > 0) {
                navigator.pop();
              }
            }}
          />
        }
      />
      </View>

      
    )
    
  }
}


/*class reactify extends Component {
  render() {
    return (
      <View style={styles.backSet, styles.container}>
        
          <Splash/>
          <Started/>
          <HelloWorld/>
        
      </View>
    )
  }
  
}*/

//AppRegistry.registerComponent('SimpleNavigationApp', () => SimpleNavigationApp);

AppRegistry.registerComponent('reactify', () => reactify);
