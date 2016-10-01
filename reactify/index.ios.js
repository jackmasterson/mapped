import React, { Component } from 'react';
import {
  AppRegistry,
  Navigator,
  StyleSheet,
  Text,
  Image,
  View,
  MapView,
  TouchableHighlight,
} from 'react-native';

import PageTurn from './PageTurn.js';


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    textAlign: 'center'
  },
  header: {
    fontSize: 25,
    paddingTop: 120,
    textAlign: 'center'
  },
  subheader: {
    fontSize: 15,
    textAlign: 'center',
    padding: 20
  },
  backSet: {
    flex: 1,
    backgroundColor: '#F5FCFF'
  },
  started: {
    fontSize: 20
  },
  img: {
    flex: 1,
    height: 350,
    width: 250
  }

});

class MapMyRide extends Component {
  render() {
    return (
      <MapView
        style={styles.img}
        showsUserLocation={true}
        >

        </MapView>
    );
  }
}



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
      <View style={styles.container}>
    
      <Text style={styles.subheader}>Hey</Text>
      </View>
    )
  }
}

class Scenea extends Component {
  render() {
    return (
      <View>
      <Text style={styles.header}>Greetings from Asbury Park, NJ</Text>
      <Text style={styles.subheader}>Click to Continue</Text>
      </View>
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
      <View style={styles.container}>
      <Navigator
        initialRoute={routes[0]}
        initialRouteStack={routes}
        renderScene={(route, navigator) => 
          <View>
          <TouchableHighlight onPress={() => {
            if (route.index === 0) {
              navigator.push(routes[1]);
            } else {
              navigator.pop();
            }
          }}>
          <Text>Click</Text>
          </TouchableHighlight>
          <View>{route.set}</View>
          </View>
         
        }
        style={{padding: 100}}
        ></Navigator>
        </View>
    );
    
  }
}


AppRegistry.registerComponent('reactify', () => reactify);