import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Location from 'expo-location';
import WeatherInfo from '../components/WeatherInfo';
import { Ionicons } from '@expo/vector-icons';

const WEATHER_API_KEY = '5e2ac36b826279f76de778dce2782074';
const BASE_WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather?'

const WeatherScreen = (props) => {
  
  const [errorMessage, setErrorMessage] = useState(null);
  const [currentWeather, setCurrentWeather] = useState(null)
  const [unitsSystem, setUnitsSystem] = useState('metric');

  useEffect(() =>{
    load()
  }, []);
  async function load() {
    try {
      let { status } = await Location.requestPermissionsAsync();
    
      if(status !== 'granted'){
        setErrorMessage('Access to location is needed to run the app');
        return 
      }

      const location = await Location.getCurrentPositionAsync();

      const {latitude, longitude} = location.coords;
    
      const weatherUrl = BASE_WEATHER_URL + 'lat=' + latitude + '&lon=' + longitude + '&units=' + unitsSystem + '&appid=' + WEATHER_API_KEY
      console.log(latitude, longitude)
      const response = await fetch(weatherUrl);
      
      const result = await response.json();

      if(response.ok){
        setCurrentWeather(result)
      } else {
        setErrorMessage(result.message);
      }

    } catch (error) {
      setErrorMessage(error.message)
    }
  }

  const SCREEN_WIDTH = Dimensions.get('screen').width;
  const SCREEN_HEIGHT = Dimensions.get('screen').height;

  if(currentWeather){ 
    const { main, wind } = currentWeather;
    return (
      <View style={{flex: 1, backgroundColor: '#00e0cd'}}>
        <View style={{flexDirection: 'row'}}>
          <View style={{width:'20%'}}></View>
          <WeatherInfo currentWeather={currentWeather} />
          <View style={{justifyContent: 'center', alignItems: "center", width: '20%'}}>
            <Ionicons name="settings" size={28} color="black" onPress={()=>{props.navigation.navigate('SettingsScreen')}} style={{paddingTop: 35}} />
          </View>
        </View>
        <ScrollView horizontal={true} pagingEnabled={true} showsHorizontalScrollIndicator={false} contentContainerStyle={{alignItems: "center"}} >
        <View style={{width: (SCREEN_WIDTH * 0.8), height: (SCREEN_HEIGHT * 0.6), borderRadius: 25, marginLeft: (SCREEN_WIDTH * 0.1), marginTop: '0%', shadowOpacity: 1, shadowRadius: 5, shadowOffset: {width: 0, height: 5}}}>
          <LinearGradient colors={['#0fecba', '#03acec']} style={{borderRadius: 25 }}>
            <View style={{width: (SCREEN_WIDTH * 0.8), height: (SCREEN_HEIGHT * 0.6), justifyContent: 'center', alignItems: 'center'}}>
            <View style={{ flex: .15, width: '100%', alignItems: 'center'}}>
                  <Text style={{fontSize: 40, color: 'white', fontFamily: 'Futura-Medium'}}>Temperature</Text>
                </View>
                <View style={{ flex: .9, width: '100%', justifyContent: 'center', alignItems: 'center'}}>
                  <Text style={{fontSize: 75, color: 'white', fontFamily: 'Futura-Medium'}}>{main.temp}</Text>
                  <Text style={{fontSize: 35, color: 'white', fontFamily: 'Futura-Medium'}}>&deg;{unitsSystem == 'metric' ? 'C' : 'F'}</Text>
                </View>
            </View>
          </LinearGradient>
        </View>
          <View style={{width: (SCREEN_WIDTH * 0.8), height: (SCREEN_HEIGHT * 0.6), borderRadius: 25, marginLeft: (SCREEN_WIDTH * 0.2), marginTop: '0%', shadowOpacity: 1, shadowRadius: 5, shadowOffset: {width: 0, height: 5}}}>
            <LinearGradient colors={['#30e7ed', '#32aeff']} style={{borderRadius: 25}} >
              <View style={{width: (SCREEN_WIDTH * 0.8), height: (SCREEN_HEIGHT * 0.6), justifyContent: 'center', alignItems: 'center'}}>
                <View style={{ flex: .15, width: '100%', alignItems: 'center'}}>
                  <Text style={{fontSize: 40, color: 'white', fontFamily: 'Futura-Medium'}}>Humidity</Text>
                </View>
                <View style={{ flex: .9, width: '100%', justifyContent: 'center', alignItems: 'center'}}>
                  <Text style={{fontSize: 75, color: 'white', fontFamily: 'Futura-Medium'}}>{main.humidity}%</Text>
                </View>
              </View>
            </LinearGradient>
          </View>
          <View style={{width: (SCREEN_WIDTH * 0.8), height: (SCREEN_HEIGHT * 0.6), borderRadius: 25, marginLeft: (SCREEN_WIDTH * 0.2), marginTop: '0%', shadowOpacity: 1, shadowRadius: 5, shadowOffset: {width: 0, height: 5}}}>
            <LinearGradient colors={['#65fced', '#039bca']} style={{borderRadius: 25}} >
              <View style={{width: (SCREEN_WIDTH * 0.8), height: (SCREEN_HEIGHT * 0.6), justifyContent: 'center', alignItems: 'center'}}>
              <View style={{ flex: .15, width: '100%', alignItems: 'center'}}>
                  <Text style={{fontSize: 40, color: 'white', fontFamily: 'Futura-Medium'}}>Presure</Text>
                </View>
                <View style={{ flex: .9, width: '100%', justifyContent: 'center', alignItems: 'center'}}>
                  <Text style={{fontSize: 75, color: 'white', fontFamily: 'Futura-Medium'}}>{main.pressure}</Text>
                  <Text style={{fontSize: 35, color: 'white', fontFamily: 'Futura-Medium'}}>hPa</Text>
                </View>
              </View>
            </LinearGradient>
          </View>
          <View style={{width: (SCREEN_WIDTH * 0.8), height: (SCREEN_HEIGHT * 0.6), borderRadius: 25, marginLeft: (SCREEN_WIDTH * 0.1), marginRight: (SCREEN_WIDTH * 0.1), marginTop: '0%', shadowOpacity: 1, shadowRadius: 5, shadowOffset: {width: 0, height: 5}}}>
            <LinearGradient colors={['#15f0ff', '#036cda']} style={{borderRadius: 25}} >
              <View style={{width: (SCREEN_WIDTH * 0.8), height: (SCREEN_HEIGHT * 0.6), justifyContent: 'center', alignItems: 'center'}}>
              <View style={{ flex: .15, width: '100%', alignItems: 'center'}}>
                  <Text style={{fontSize: 40, color: 'white', fontFamily: 'Futura-Medium'}}>Wind Speed</Text>
                </View>
                <View style={{ flex: .9, width: '100%', justifyContent: 'center', alignItems: 'center'}}>
                  <Text style={{fontSize: 75, color: 'white', fontFamily: 'Futura-Medium'}}>{wind.speed}</Text>
                  <Text style={{fontSize: 35, color: 'white', fontFamily: 'Futura-Medium'}}>{unitsSystem == 'metric' ? 'Meters/Second' : 'Miles/Hour'}</Text>
                </View>
              </View>
            </LinearGradient>
          </View>
        </ScrollView>
      </View>
    );22
  }else {
    return (
      <View>
        <Text>{errorMessage}</Text>
      </View>
    )
  }
}

export default WeatherScreen;