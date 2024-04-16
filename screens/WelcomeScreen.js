import { db, auth } from "../firebaseConfig";
import {View, Text, StyleSheet, FlatList, Pressable, Platform, StatusBar, SafeAreaView, TextInput} from 'react-native';
import {createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from 'react';


const WelcomeScreen = ({navigation})=>{


    const buttonPressedOne = () => {
        navigation.navigate('Login');
    }

    const buttonPressedTwo = () => {
       // alert('2nd Button')
        navigation.navigate('SignUp');
    }

    return(
        
        <SafeAreaView style={styles.container}>
            <View style={{marginBottom: 100, marginTop: 40}}>
                <Text style={styles.headingText}> Bike&Ride</Text>
            </View>
            <View>
                <Pressable style={[styles.Button]} onPress={buttonPressedOne }>
                    <Text style={[styles.text, {color:'white'}]}>Login</Text>
                </Pressable>
            </View>

            <View>
                <Pressable style={[styles.Button]} onPress={buttonPressedTwo }>
                    <Text style={[styles.text, {color:'white'}]}>SignUp</Text>
                </Pressable>
            </View>
            
        </SafeAreaView>
    )

}

export default WelcomeScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      padding:20,
      paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      paddingLeft: Platform.OS === "android" ? StatusBar.currentWidth : 0,
      paddingBottom: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      paddingRight: Platform.OS === "android" ? StatusBar.currentWidth : 0
    },
    headingText: {
      fontSize: 60,
      textAlign: "center",
      paddingBottom: 50,
      fontFamily: 'Menlo',
      color:"#686de0"
    },
    headingBar:{
        flex: 0.3,
        alignItems:"center",
        backgroundColor:"#686de0",
        marginBottom:50,
        justifyContent:"center",
        marginHorizontal: 10
    },

    text: {
      fontSize: 25,
      fontWeight: "bold"
      
    },
    myfields:{
        flex: 0.2,
        flexDirection: "row",
        justifyContent:"space-evenly"
    },
    Views: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingVertical: 20,
        marginRight: 14
    },
    Input:{
        marginLeft: 20,
        height: 40, 
        borderColor: 'gray', 
        borderWidth: 1 ,
        borderRadius: 100, 
        backgroundColor:'white',
        width: 180,
        paddingLeft:20,
    },
    DescriptionInput:{
        height: 100, 
        borderColor: 'gray', 
        borderWidth: 1 , 
        backgroundColor:'white'
    },
    Button:{
        alignItems:'center', 
        justifyContent:'center', 
        padding:10, 
        backgroundColor:'#686de0', 
        borderRadius:10, 
        margin:10,
        
        height: 100
    }
  });