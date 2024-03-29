import React, { useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Animated,
  Easing,
  Image,
  TouchableOpacity
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const weather =  useRef(new Animated.Value(0)).current;
  const translation =  useRef(new Animated.Value(300)).current;
  const ballMove =  useRef(new Animated.Value(0)).current;
  const cloudX =  useRef(new Animated.Value(100)).current;
  const cloudX2 =  useRef(new Animated.Value(0)).current;
  const cloudX3 =  useRef(new Animated.Value(-400)).current;

  const startBall = () => {
    Animated.timing(ballMove, {
      toValue: 800,
      useNativeDriver: true,
      duration: 10000,
    }).start()
  }

  useEffect(() => {
    setInterval(() => {
      Animated.timing(weather, {
        toValue: 1,
        useNativeDriver: true,
        duration: 5000,
      }).start()
    }, 3000)
  }, [])


  useEffect(() => {
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
        Animated.timing(translation, {
          toValue: 486,
          easing: Easing.bounce,
          useNativeDriver: true,
        }).start()
    }, 1000)
  }, [])

  return (
    <GestureHandlerRootView >
       <Animated.View style={{
        backgroundColor: weather.interpolate({
                            inputRange: [0, 1],
                            outputRange: ['skyblue', "black"],
                        })
        }}>
        <Animated.View style={{ opacity: weather.interpolate({
                  inputRange: [0, 0.5],
                  outputRange: [0, 1]
                })
        }}>
          <Image source={{
                uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Weather_icon_-_full_moon.svg/1200px-Weather_icon_-_full_moon.svg.png'
              }} 
              style={{width: 80, height: 80, position:"absolute", marginTop: 30, marginLeft: 20}}
          />
        </Animated.View>
       <Animated.View style={{ transform: [{
        translateX: cloudX
      }] }}>
        <Image source={{
              uri: 'https://static.vecteezy.com/system/resources/previews/012/595/156/non_2x/realistic-white-cloud-free-png.png'
            }} 
            style={{width: 150, height: 80, position:"absolute", marginTop: 30, marginLeft: 60}}
        />
       </Animated.View>
       <Animated.View style={{ transform: [{
        translateX: cloudX2
      }] }}>
        <Image source={{
              uri: 'https://static.vecteezy.com/system/resources/previews/012/595/156/non_2x/realistic-white-cloud-free-png.png'
            }} 
            style={{width: 150, height: 80, position:"absolute", marginTop: 60, marginLeft: 0}}
        />
      </Animated.View>
      <Animated.View style={{ transform: [{
        translateX: cloudX3
      }] }}>
        <Image source={{
              uri: 'https://iconspng.com/uploads/very-fluffy-cloud.png'
            }} 
            style={{width: 150, height: 80, position:"absolute", marginTop: 45, marginLeft: 0}}
        />
      </Animated.View>
      <Animated.View style={[styles.redBall, { transform: [{
        translateY: translation,
      },{
        translateX: ballMove
      },
      {
        rotate: ballMove.interpolate({
          inputRange: [0, 800],
          outputRange: ['0deg', '1080deg']
        })
      }
      ] }]}>
              <Image source={
                  require("./assets/glassball.png")
              }
              style={{width: 80, height: 80, position:"absolute", marginTop: 30, marginLeft: 60}}
          />
      </Animated.View>
      <View style={styles.floor}>
        <TouchableOpacity
        style={styles.startBallBtn}
          onPress={()=> startBall()}
          >
          <Text style={{fontWeight: "bold", color: "white"}}>Start the Ball</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
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
    width: 50,
    height: 50,
    backgroundColor: "red",
    borderRadius: 100,
    marginLeft: 30,
    alignItems:"center",
    justifyContent: "center"
  },
  floor: {
    width: 1000,
    height: 500,
    display: "flex",
    backgroundColor: "green",
    transform: [{
      translateY: 500
    }]
  },
  startBallBtn: {
    borderWidth: 3,
    zIndex: 999,
    borderRadius: 6,
    alignItems: "center",
    marginLeft: 120,
    width: 120,   
    padding: 10,      
    backgroundColor: "brown",
    marginTop: 30,
  }
});

export default App;
