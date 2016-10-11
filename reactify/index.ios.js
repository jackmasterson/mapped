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
 
        <Text style={styles.header}>Hey</Text>
    
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

class Third extends Component {
  render() {
    return (
      <Text style={styles.header}>Third Screen</Text>
    )
  }
}


class Api extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jsonData: []
    }
  }
  render() {
      var rows=[];
      console.log(this.state);
      
      fetch('https://health.data.ny.gov/resource/tm7s-uhne.json')
        .then((response) => response.json())
        .then((responseJson) => {
            for(var i=0; i<10; i++){
              rows.push(responseJson[i].city + '\n');
            }
            //console.log(rows);
            this.setState({
              jsonData: rows
            })
            //console.log(this.state.jsonData);
        })
        .catch((error) => {
          console.error(error);
        });

        return (
          <Text style={styles.header}>{this.state.jsonData}</Text>
        )
  }

}




class reactify extends Component {
  render() {
    const routes = [
      {title: 'First', index: 0, set: <Api/>},
      {title: 'Second', index: 1, set: <Second/>},
      {title: 'Third', index: 2, set: <Third/>},
    ];
    return (
      
      <Navigator
        initialRoute={routes[0]}
        initialRouteStack={routes}
        renderScene={(route, navigator) => 
          <View>
            {route.set}
            <Text style={styles.subheader}>{route.index}</Text>
        
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

                  return (
                            <TouchableHighlight onPress={() =>navigator.pop()}>
                              <Image source={require("./img/nav-left.png")} 
                                style={styles.img}/>
                            </TouchableHighlight>
                        )
                  } 
                },
              RightButton: (route, navigator, index, navState) =>
                {

                  if(route.index === 0){
                    return (    
                  
                      <TouchableHighlight onPress={() => 
                        
                        navigator.push(routes[1])}>
                        <Image source={require("./img/nav-right.png")} 
                          style={styles.img}/>
                      </TouchableHighlight>

                    
                    ); 
                  }
                  if(route.index === 1){
                    return (
                      <TouchableHighlight onPress={() => 
                        
                        navigator.push(routes[2])}>
                        <Image source={require("./img/nav-right.png")} 
                          style={styles.img}/>
                      </TouchableHighlight>
                    )
                  }
                },
              Title: (route, navigator, index, navState) =>
                {
                  if(route.index === 0){
                    return (
                      <Text>Scene 1</Text>
                    )
                  }
                  if(route.index === 1){
                    return(
                      <Text>Scene 2</Text>
                    )
                  }
                  if(route.index === 2){
                    return (
                      <Text>Scene 3</Text>
                    )
                  }
                  
                    

                  
                },
            }}
            style={{backgroundColor: 'gray'}}
            />
            
      }

        />
      
      
    );
    
  }
}


AppRegistry.registerComponent('reactify', () => reactify);