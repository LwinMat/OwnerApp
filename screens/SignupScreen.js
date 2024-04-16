import {View, Text, StyleSheet, FlatList, Pressable, Platform, StatusBar, SafeAreaView, TextInput} from 'react-native';
import {createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from 'react';
import { db, auth } from '../firebaseConfig'

// TODO: import the specific functions from the service
import { collection, addDoc } from "firebase/firestore";


const SignupScreen = ({navigation}) => {

    const [firstName, setfirstName] = useState("");
    const [lastName, setlastName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [error,setError] = useState(null);

    const buttonPressed = async () => {
        
        const user = {
            f_name : firstName,
            l_name : lastName,
            u_email: email,
            is_owner : true, 
            bookings : [],
            profile_image : "https://cdn.pixabay.com/photo/2017/11/10/05/48/user-2935527_960_720.png"
        }

        try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        console.log("Account creation success")
        console.log(userCredential)
        alert("Account created!")
      } catch (err) {
        setError(err)
        console.log("Error when creating user")
        console.log(`Error code: ${err.code}`)
        console.log(`Error message: ${err.message}`)
        return;
      }
   
 
 
 
        // insert into database
        try {
            // this code inserts into the "students" collecction
            // addDoc() will return you a copy of the document that was inserted
            const docRef = await addDoc(collection(db, "users"), user)
           // alert("Data inserted, check console for output")
            console.log(`Id of inserted document is: ${docRef.id}`);
            navigation.navigate('Home')
        } catch (err) {
            console.log(err)
            setError(err)
        }
 
 
   }
 
 
 




    return (
        <SafeAreaView style={[styles.container]}>
            {/* <Text>Booking Screen</Text> */}


            <View style={{marginTop: 50, flex: 0.9}}>
                <View style={styles.headingBar}>
                <Text style={{fontFamily: 'Menlo', fontSize:46, alignContent:"center"}}>Owner Account</Text>
                </View>
                <View style={[styles.myfields]}>
                    <Text style={styles.text}> First Name:</Text>
                    <TextInput
                        style={[styles.Input]} onChangeText={setfirstName} value={firstName} 
                    />

                </View>

                <View style={[styles.myfields]}>
                    <Text style={styles.text}>Last Name:</Text>
                    <TextInput
                        style={[styles.Input]} onChangeText={setlastName} value={lastName} 
                    />

                </View>

                <View style={[styles.myfields]}>
                    <Text style={styles.text}>Email:</Text>
                    <TextInput
                        style={[styles.Input]} onChangeText={setEmail} value={email} 
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
                <Text style={{fontSize:17, paddingLeft:40, fontWeight:"bold"}}>Welcome to the Owner App of Bike&Ride</Text>
                <Text style={{fontSize:15, paddingHorizontal:50, paddingTop:20, textAlign:"center"}}>Here you can choose from a wide range
                of listings to get your dream bike. Create an account to start searching for your dream bike through your very own Owner Account </Text>
                </View>

                <View >
                    <Pressable style={[styles.Button]} onPress={buttonPressed }>
                        <Text style={[styles.text, {color:'white'}]}>SignUp</Text>
                    </Pressable>

                </View>
               


            
        </SafeAreaView>
    );
}

export default SignupScreen;

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
        fontSize: 20
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