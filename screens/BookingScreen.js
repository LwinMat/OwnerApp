import {View, Text, StyleSheet, FlatList, TouchableOpacity, Platform, StatusBar, SafeAreaView} from 'react-native';

import React from 'react';

const BookingScreen = ({navigation}) => {
    return (
        <SafeAreaView style={[styles.container]}>
            <Text>Booking Screen</Text>

            
        </SafeAreaView>
    );
}

export default BookingScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#c7ecee",
      padding:20,
      paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      paddingLeft: Platform.OS === "android" ? StatusBar.currentWidth : 0,
      paddingBottom: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      paddingRight: Platform.OS === "android" ? StatusBar.currentWidth : 0
    },
    headingText: {
      fontSize: 20,
      textAlign: "center",
      paddingBottom: 5,
    },
    text: {
      fontSize: 12,
    },    
  });
