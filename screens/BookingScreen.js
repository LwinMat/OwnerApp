import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Platform, StatusBar, SafeAreaView, Button, Alert } from 'react-native';
import { db } from '../firebaseConfig';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';

const BookingScreen = ({ navigation }) => {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'booking'));
                const data = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setBookings(data);
            } catch (error) {
                console.error('Error fetching bookings: ', error);
            }
        };

        fetchBookings();

        // Cleanup function to unsubscribe when component unmounts
        return () => {};
    }, []);

    const handleAccept = async (id) => {
        try {
            const bookingRef = doc(db, 'booking', id);
            await updateDoc(bookingRef, {
                status: 'Accepted',
            });
            console.log('Booking accepted:', id);
            Alert.alert('Booking Accepted', 'You have accepted the booking.');
        } catch (error) {
            console.error('Error accepting booking:', error);
        }
    };

    const handleDecline = async (id) => {
        try {
            const bookingRef = doc(db, 'booking', id);
            await updateDoc(bookingRef, {
                status: 'Declined',
            });
            console.log('Booking declined:', id);
            Alert.alert('Booking Declined', 'You have declined the booking.');
        } catch (error) {
            console.error('Error declining booking:', error);
        }
    };

    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
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
            <View style={styles.buttonContainer}>
                <Button
                    title="Accept"
                    onPress={() => handleAccept(item.id)}
                    color="green"
                />
                <Button
                    title="Decline"
                    onPress={() => handleDecline(item.id)}
                    color="red"
                />
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.headingText}>Booking Requests</Text>
            <FlatList
                data={bookings}
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
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
});

export default BookingScreen;