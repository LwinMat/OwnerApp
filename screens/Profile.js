import {View, Text, StyleSheet, FlatList, TouchableOpacity, Platform, StatusBar, SafeAreaView, Image, Pressable} from 'react-native';

import React from 'react';
import { db, auth } from '../firebaseConfig';
import {signOut} from 'firebase/auth'

const ProfileScreen = ({navigation}) => {
  console.log(auth.currentUser)
  //const userName = auth.currentUser?.f_name + " " + auth.currentUser?.l_name
  const userEmail = auth.currentUser.email
  const userURL = auth.currentUser?.profile_image


  const logOutPressed = async () => {
        try{
            if (auth.currentUser === null){
                console.log("No user logged in")
            }else{
                await signOut(auth)
                console.log("User logged out")
                navigation.navigate('Login')
            }
        }catch(err){
            console.log("Error logging out")
            console.log(err)
        }
    }

    return (
        <SafeAreaView style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
            <Image source={userURL} style={{height: 20, width: 20}} />
            <View style={{flexDirection:'column', alignItems:'center'}}>
                <Text style={{fontSize:30}}>
                    {userEmail}
                </Text>
            </View>
            <Pressable style={[styles.Button]} onPress={()=>{logOutPressed()}}>
                <Text style={[styles.text]}>Log out</Text>
            </Pressable>
        </SafeAreaView>
    );
}

export default ProfileScreen;

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
      fontSize: 20,
    },    
    headingBar:{
        flex: 0.2,
        alignItems:"center",
        backgroundColor:"#686de0",
        marginBottom:50,
        justifyContent:"center",
        marginHorizontal: 10
    },
    Button:{
        alignItems:'center', 
        justifyContent:'center', 
        padding:10, 
        backgroundColor:'#686de0', 
        borderRadius:10, 
        margin:10,
        marginTop: 50
    }
  });