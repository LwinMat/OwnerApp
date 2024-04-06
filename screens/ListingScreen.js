import {View, Text, StyleSheet, Platform, StatusBar, SafeAreaView, TextInput, Switch, Pressable, ScrollView} from 'react-native';

import React from 'react';

const ListingScreen = ({navigation}) => {
    return (
        <SafeAreaView style={[styles.container]}>
            {/* <Text>Listing Screen</Text> */}

            <ScrollView style={{flexDirection:'column'}}>
                <View style={[styles.Views]}>
                    <Text style={styles.text}>Enter Service Type:</Text>
                    <TextInput
                        style={[styles.Input]}
                        // onChangeText={text => onChangeText(text)}
                        // value={value}
                    />

                </View>
                

                <View style={[styles.Views]}>

                    {/* Description input text */}
                    <Text style={styles.text}>Enter Description:</Text>
                    <TextInput
                        style={styles.DescriptionInput}
                        // onChangeText={text => onChangeText(text)}
                        // value={value}
                    />
                </View>

                <View style={[styles.Views]}>
                    {/* insert City name */}
                    <Text style={styles.text}>Enter City:</Text>
                    <TextInput
                        style={[styles.Input]}
                        // onChangeText={text => onChangeText(text)}
                        // value={value}
                    />
                </View>

                <View style={[styles.Views]}>
                    {/* insert address */}
                    <Text style={styles.text}>Enter Address:</Text>
                    <TextInput
                        style={[styles.Input]}
                        // onChangeText={text => onChangeText(text)}
                        // value={value}
                    />
                </View>

                <View style={[styles.Views]}>
                    {/* set price */}
                    <Text style={styles.text}>Enter Price:</Text>
                    <TextInput
                        style={[styles.Input]}
                        // onChangeText={text => onChangeText(text)}
                        // value={value}
                    />
                </View>

                <View style={{flexDirection:'column'}}>
                    <View style={{flexDirection:'row'}}>
                        <Text style={styles.text}>Including parts: </Text>
                        <Switch
                            // trackColor={{ false: "#767577", true: "#81b0ff" }}
                            // thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                            // ios_backgroundColor="#3e3e3e"
                            // onValueChange={toggleSwitch}
                            // value={isEnabled}
                            style={{width:54}}
                        />
                    </View>

                    <View style={{flexDirection:'row'}}>
                        <Text style={styles.text}>Including labor: </Text>
                        <Switch
                            // trackColor={{ false: "#767577", true: "#81b0ff" }}
                            // thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                            // ios_backgroundColor="#3e3e3e"
                            // onValueChange={toggleSwitch}
                            // value={isEnabled}
                            style={{width:54}}
                        />
                    </View>
                </View>


                {/* place a pressable component in the center of the screen */}
                <Pressable
                    style={{alignItems:'center', justifyContent:'center', padding:10, backgroundColor:'#686de0', borderRadius:10, margin:10}}
                >
                    <Text style={{fontSize:20, color:'white'}}>Upload Photo</Text>
                </Pressable>

            </ScrollView>
        </SafeAreaView>
    );
}

export default ListingScreen;

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
      fontSize: 15,
    },
    Views: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingVertical: 10,
        marginRight: 14
    },
    Input:{
        height: 40, 
        borderColor: 'gray', 
        borderWidth: 1 , 
        backgroundColor:'white'
    },
    DescriptionInput:{
        height: 100, 
        borderColor: 'gray', 
        borderWidth: 1 , 
        backgroundColor:'white'
    },


  });
