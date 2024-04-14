import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Platform, StatusBar, SafeAreaView } from 'react-native';
import { db } from '../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

const BookingScreen = ({ navigation }) => {
    const [listings, setListings] = useState([]);

    useEffect(() => {
        const fetchListings = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'booking'));
                const data = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setListings(data);
            } catch (error) {
                console.error('Error fetching listings: ', error);
            }
        };

        fetchListings();

        // Cleanup function to unsubscribe when component unmounts
        return () => {};
    }, []);

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.itemContainer}>
            <Text style={styles.itemText}>Service Type: {item.serviceType}</Text>
            <Text style={styles.itemText}>Description: {item.description}</Text>
            <Text style={styles.itemText}>City: {item.city}</Text>
            <Text style={styles.itemText}>Address: {item.address}</Text>
            <Text style={styles.itemText}>Price: {item.price}</Text>
            <Text style={styles.itemText}>Including Parts: {item.includingParts ? 'Yes' : 'No'}</Text>
            <Text style={styles.itemText}>Including Labor: {item.includingLabor ? 'Yes' : 'No'}</Text>
            {item.imageUrl && (
                <Image source={{ uri: item.imageUrl }} style={styles.image} />
            )}
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.headingText}>Previous Listings</Text>
            <FlatList
                data={listings}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                style={{ marginTop: 10 }}
            />
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
    headingText: {
        fontSize: 20,
        textAlign: "center",
        paddingBottom: 10,
    },
    itemContainer: {
        backgroundColor: '#ffffff',
        padding: 10,
        marginVertical: 5,
        borderRadius: 5,
    },
    itemText: {
        fontSize: 16,
        marginBottom: 5,
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 10,
        alignSelf: 'center',
        marginTop: 10,
    },
});

export default BookingScreen;
