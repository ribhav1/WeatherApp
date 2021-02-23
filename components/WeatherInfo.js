import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';

const WeatherInfo = ({ currentWeather, props }) => {
    const { main, weather: [details], name } = currentWeather;
    const { icon } = details;
    const iconUrl = 'https://openweathermap.org/img/wn/' + icon + '@4x.png';
    return (
        <View style={styles.weatherInfo}>
                <Text style={{fontSize: 40, fontFamily: 'Futura-Medium'}}>{name}</Text>     
        </View>
    );
};

const styles = StyleSheet.create({
    weatherInfo: {
        paddingTop: '10%',
        flexDirection: 'row',
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center'    
    },
});

export default WeatherInfo;
