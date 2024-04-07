import {View, Text, StyleSheet, FlatList, Pressable, Platform, StatusBar, SafeAreaView, TextInput} from 'react-native';

import React from 'react';

const LoginScreen = ({navigation}) => {
    return (
        <SafeAreaView style={[styles.container]}>
            {/* <Text>Booking Screen</Text> */}


            <View style={{marginTop: 50}}>
                <Text style={[styles.headingText]}>Owner Login</Text>

                <View style={[styles.Views]}>
                    <Text style={styles.text}>Enter Username:</Text>
                    <TextInput
                        style={[styles.Input]}
                        // onChangeText={text => onChangeText(text)}
                        // value={value}
                    />

                </View>

                <View style={[styles.Views]}>
                    <Text style={styles.text}>Enter Password:</Text>
                    <TextInput
                        style={styles.Input}
                        // onChangeText={text => onChangeText(text)}
                        // value={value}
                    />
                </View>

                <View style={[styles.Views]}>
                    <Pressable style={[styles.Button]} onPress={() => navigation.navigate('Home')}>
                        <Text style={[styles.text, {color:'white'}]}>Login</Text>
                    </Pressable>

                </View>

            </View>


            
        </SafeAreaView>
    );
}

export default LoginScreen;

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
      fontSize: 30,
      textAlign: "center",
      paddingBottom: 50,
    },
    text: {
      fontSize: 15,
    },
    Views: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingVertical: 20,
        marginRight: 14
    },
    Input:{
        height: 40, 
        borderColor: 'gray', 
        borderWidth: 1 , 
        backgroundColor:'white',
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
