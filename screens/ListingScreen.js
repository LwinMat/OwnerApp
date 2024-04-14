import React, { useState } from 'react';
import { View, Text, StyleSheet, Platform, StatusBar, SafeAreaView, TextInput, Switch, Pressable, ScrollView, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { db, storage } from '../firebaseConfig';
import { addDoc, collection } from 'firebase/firestore';

const ListingScreen = ({ navigation }) => {
    const [serviceType, setServiceType] = useState('');
    const [description, setDescription] = useState('');
    const [city, setCity] = useState('');
    const [address, setAddress] = useState('');
    const [price, setPrice] = useState('');
    const [includingParts, setIncludingParts] = useState(false);
    const [includingLabor, setIncludingLabor] = useState(false);
    const [imageUri, setImageUri] = useState(null);

    const handleChoosePhoto = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });
            if (!result.cancelled) {
                setImageUri(result.uri);
            }
        } catch (error) {
            console.error('Error choosing photo: ', error);
        }
    };

    const handleUploadPhoto = async () => {
        try {
            const response = await fetch(imageUri);
            const blob = await response.blob();
            const imageName = new Date().getTime().toString();
            const ref = storage.ref().child(`images/${imageName}`);
            await ref.put(blob);
            const url = await ref.getDownloadURL();
            return url;
        } catch (error) {
            console.error('Error uploading photo: ', error);
        }
    };

    const handleSubmit = async () => {
        try {
            const imageUrl = imageUri ? await handleUploadPhoto() : null;

            // Create an object with the form data
            const newData = {
                serviceType: serviceType,
                description: description,
                city: city,
                address: address,
                price: price,
                includingParts: includingParts,
                includingLabor: includingLabor,
                imageUrl: imageUrl, // Add image URL to data
            };

            // Add this object to Firebase collection
            const docRef = await addDoc(collection(db, 'booking'), newData);
            console.log('Document written with ID: ', docRef.id);
            // You can navigate to another screen if needed
            // navigation.navigate('NextScreen');
        } catch (error) {
            console.error('Error handling form submission: ', error);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={{ flexDirection: 'column' }}>
                <View style={styles.Views}>
                    <Text style={styles.text}>Enter Service Type:</Text>
                    <TextInput
                        style={styles.Input}
                        onChangeText={text => setServiceType(text)}
                        value={serviceType}
                    />
                </View>

                <View style={styles.Views}>
                    <Text style={styles.text}>Enter Description:</Text>
                    <TextInput
                        style={styles.DescriptionInput}
                        onChangeText={text => setDescription(text)}
                        value={description}
                    />
                </View>

                <View style={styles.Views}>
                    <Text style={styles.text}>Enter City:</Text>
                    <TextInput
                        style={styles.Input}
                        onChangeText={text => setCity(text)}
                        value={city}
                    />
                </View>

                <View style={styles.Views}>
                    <Text style={styles.text}>Enter Address:</Text>
                    <TextInput
                        style={styles.Input}
                        onChangeText={text => setAddress(text)}
                        value={address}
                    />
                </View>

                <View style={styles.Views}>
                    <Text style={styles.text}>Enter Price:</Text>
                    <TextInput
                        style={styles.Input}
                        onChangeText={text => setPrice(text)}
                        value={price}
                    />
                </View>

                <View style={{ flexDirection: 'column' }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.text}>Including parts: </Text>
                        <Switch
                            value={includingParts}
                            onValueChange={value => setIncludingParts(value)}
                            style={{ width: 54 }}
                        />
                    </View>

                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.text}>Including labor: </Text>
                        <Switch
                            value={includingLabor}
                            onValueChange={value => setIncludingLabor(value)}
                            style={{ width: 54 }}
                        />
                    </View>
                </View>

                <Pressable
                    style={styles.button}
                    onPress={handleChoosePhoto}
                >
                    <Text style={styles.buttonText}>Choose Photo</Text>
                </Pressable>

                {imageUri && (
                    <View style={styles.imageContainer}>
                        <Image source={{ uri: imageUri }} style={styles.image} />
                    </View>
                )}

                <Pressable
                    style={styles.button}
                    onPress={handleSubmit}
                >
                    <Text style={styles.buttonText}>Submit</Text>
                </Pressable>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#c7ecee",
        padding: 20,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
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
    Input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        backgroundColor: 'white'
    },
    DescriptionInput: {
        height: 100,
        borderColor: 'gray',
        borderWidth: 1,
        backgroundColor: 'white'
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: '#686de0',
        borderRadius: 10,
        margin: 10,
    },
    buttonText: {
        fontSize: 20,
        color: 'white'
    },
    imageContainer: {
        alignItems: 'center',
        marginVertical: 10,
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 10,
    },
});

export default ListingScreen;
