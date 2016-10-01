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
    height: 350
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
    height: 30,
    width: 30,
    margin: 5
  },
  nav: {
    flex: 1,
    height: 50,
    width: 50
  },
  NavContainer: {
    flexWrap: 'wrap',
    height: 50,
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
      <View>

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
      <View>
    
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

class NavButton extends Component {
  render() {
    return (
      <View style={styles.NavContainer}>          
            <Image source={require("./img/nav-left.png")} style={styles.img}/>
            <Image source={require("./img/nav-right.png")} style={styles.img}/> 
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
      
      <Navigator
        initialRoute={routes[0]}
        initialRouteStack={routes}
        renderScene={(route, navigator) => 
          <View>
            <Scenea/>
            
          
          </View>
         
        }
        navigationBar={
          <Navigator.NavigationBar
            routeMapper={{
              LeftButton: (route, navigator, index, navState) =>
                {
                  if (route.index === 0){
                    return null;
                  } else {

                  return (<TouchableHighlight onPress={() =>navigator.pop()}>
                            <Image source={require("./img/nav-left.png")} 
                              style={styles.img}/>
                          </TouchableHighlight>)
                  } 
                },
              RightButton: (route, navigator, index, navState) =>
                {return (    
                    <TouchableHighlight onPress={() => navigator.push(routes[1])}>
                      <Image source={require("./img/nav-right.png")} 
                        style={styles.img}/>
                    </TouchableHighlight>
                  ); 
                },
              Title: (route, navigator, index, navState) =>
                {return (<Text>Home</Text>); },
            }}
            style={{backgroundColor: 'gray'}}
            />
            
      }

        />
      
      
    );
    
  }
}


AppRegistry.registerComponent('reactify', () => reactify);