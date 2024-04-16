import {View, Text, StyleSheet, FlatList, Pressable, Platform, StatusBar, SafeAreaView, TextInput} from 'react-native';
import {createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from 'react';
import { db, auth } from '../firebaseConfig'

// TODO: import the specific functions from the service
import { collection, addDoc } from "firebase/firestore";
import { signInWithEmailAndPassword } from "firebase/auth";



const LoginScreen = ({navigation}) =>{

    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    const loginPressed = async () => {
        try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password)
        console.log(`loginPressed: Who is the currently logged in user? ${auth.currentUser.uid}`)
       // alert("Login complete!");
        navigation.navigate('Home');
        } catch(error) {
        console.log(`Error code: ${error.code}`)
        console.log(`Error message: ${error.message}`)
        // full error message
        console.log(error)
        }
        }
        


return(
    
<SafeAreaView style={[styles.container]}>
        
<View style={{marginTop: 50, flex: 0.9}}>
                <View style={styles.headingBar}>
                <Text style={{fontFamily: 'Menlo', fontSize:46, alignContent:"center"}}>Renter Login</Text>
                </View>
                

                


                <View style={[styles.myfields]}>
                    <Text style={styles.text}>Email:</Text>
                    <TextInput
                        style={[styles.Input]} onChangeText={setEmail} value={email} type="email" 
                    />

                </View>

                <View style={[styles.myfields]}>
                    <Text style={styles.text}>  Password:</Text>
                    <TextInput
                        style={styles.Input}
                        type="password"
                        onChangeText={setPassword} value={password} 
                    />
                </View>
                <Text style={{fontSize:17, paddingLeft:40, fontWeight:"bold"}}>Welcome to the Renter App of Bike&Ride</Text>
                <Text style={{fontSize:15, paddingHorizontal:50, paddingTop:20, textAlign:"center"}}> Login to your existing Renter Account  </Text>
                

               
           


            </View>
            <View >
                    <Pressable style={[styles.Button]} onPress={loginPressed }>
                        <Text style={[styles.text, {color:'white'}]}>Login</Text>
                    </Pressable>

                </View>

        </SafeAreaView>
    
);
}

export default LoginScreen;


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
      fontSize: 30,
      textAlign: "center",
      paddingBottom: 50,
      
    },
    headingBar:{
        flex: 0.2,
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
        margin:10
    }
  });