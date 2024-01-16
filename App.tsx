/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useRef, useState } from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Animated,
  Easing,
  Image,
  Button,
  TouchableOpacity
} from 'react-native';
// import {TouchableOpacity} from 'react-native-gesture-handler';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const translation =  useRef(new Animated.Value(300)).current;
  const ballMove =  useRef(new Animated.Value(10)).current;
  const cloudX =  useRef(new Animated.Value(100)).current;
  const cloudX2 =  useRef(new Animated.Value(0)).current;
  const cloudX3 =  useRef(new Animated.Value(-400)).current;
  const [loading, setLoading] = useState(true)


  const startBall = () => {
    console.log("movingg----")
    Animated.timing(ballMove, {
      toValue: 800,
      useNativeDriver: true,
      duration: 20000,
    }).start()
  }

  useEffect(() => {
    console.log("stratdd")

    Animated.parallel([
      Animated.timing(cloudX, {
        toValue: 500,
        useNativeDriver: true,
        duration: 50000,
      }),
      Animated.timing(cloudX2, {
        toValue: 500,
        useNativeDriver: true,
        duration: 51000,
      }),
      Animated.timing(cloudX3, {
        toValue: 600,
        useNativeDriver: true,
        duration: 50000,
      })
    ]).start()


    setTimeout(() => {
      
      Animated.sequence([
        Animated.timing(translation, {
          toValue: 500,
          easing: Easing.bounce,
          useNativeDriver: true,
        })
      ]).start()

      setLoading(false)
    }, 1000)
  }, [])

  return (
    <GestureHandlerRootView >
       <View style={{backgroundColor:"skyblue"}}>
       <Animated.View style={{ transform: [{
        translateX: cloudX
      }] }}>
        <Image source={{
              uri: 'https://freesvg.org/img/cloud_jon_phillips_01.png'
            }} 
            style={{width: 80, height: 80, position:"absolute", marginTop: 30, marginLeft: 60}}
        />
       </Animated.View>
       <Animated.View style={{ transform: [{
        translateX: cloudX2
      }] }}>
        <Image source={{
              uri: 'https://freesvg.org/img/cloud_jon_phillips_01.png'
            }} 
            style={{width: 80, height: 80, position:"absolute", marginTop: 60, marginLeft: 0}}
        />
      </Animated.View>
      <Animated.View style={{ transform: [{
        translateX: cloudX3
      }] }}>
        <Image source={{
              uri: 'https://freesvg.org/img/cloud_jon_phillips_01.png'
            }} 
            style={{width: 80, height: 80, position:"absolute", marginTop: 45, marginLeft: 0}}
        />
      </Animated.View>
      <Animated.View style={[styles.redBall, { transform: [{
        translateY: translation,
      },{
        translateX: ballMove
      }
      ] }]}>
        <Text>{loading?"Loading":"BALLie"}</Text>
      </Animated.View>
      <View style={styles.floor}>
    <TouchableOpacity
    style={{
      borderWidth: 1,
      zIndex: 999,
      borderRadius: 6,
      alignItems: "center",
      alignContent: "center",
      justifyContent: 'center',
      position: "absolute",
      width: 120,   
      padding: 10,         
      backgroundColor: "brown",
      marginTop: 30,
    }}
      onPress={()=> startBall()}
      >
      <Text>Start the Ball</Text>
    </TouchableOpacity>
      </View>
    </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  redBall: {
    width: 80,
    height: 80,
    backgroundColor: "red",
    borderRadius: 100,
    alignItems:"center",
    justifyContent: "center"
  },
  floor: {
    width: 1000,
    height: 500,
    backgroundColor: "green",
    transform: [{
      translateY: 500
    }]
  }
});

export default App;
