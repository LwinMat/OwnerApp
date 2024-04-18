import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Platform, StatusBar, SafeAreaView, Image, Button, Alert } from 'react-native';
import { db } from '../firebaseConfig';
import { collection, getDocs, updateDoc, doc, query, where } from 'firebase/firestore';
import { auth } from '../firebaseConfig';

const BookingScreen = ({ navigation }) => {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            // Specify which collection and document id to query
            const q = query(collection(db, "rentalListings"), where("ownerEmail", "==", auth.currentUser.email));
    
            const querySnapshot = await getDocs(q);
            console.log(querySnapshot)
            const resultsFromDB = []
    
            querySnapshot.forEach((currDoc) => {
              console.log(currDoc.id, " => ", currDoc.data());
              const user = {
                  id: currDoc.id,
                  ...currDoc.data()
              }
              resultsFromDB.push(user)
             
            
          })
          setBookings(resultsFromDB)
          console.log(bookings)
          console.log("email is " + user.email)
          console.log(resultsFromDB[0])
    
    
            // use the .exists() function to check if the document 
            // could be found
            
            
         } catch (err) {
            console.log(err)
         }
         

        // try {
        //     const querySnapshot = await getDocs(collection(db, 'booking'), where);
        //     const data = querySnapshot.docs.map(doc => ({
        //         id: doc.id,
        //         ...doc.data()
        //     }));
        //     setBookings(data);
        // } catch (error) {
        //     console.error('Error fetching bookings: ', error);
        // }
    };

    const handleCancelBooking = async (id) => {
        try {
            const bookingRef = doc(db, 'booking', id);
            await updateDoc(bookingRef, {
                status: 'CANCELLED'
            });

            Alert.alert('Booking Cancelled', 'Your booking has been cancelled.');

            console.log('Booking cancelled successfully');
        } catch (error) {
            console.error('Error cancelling booking: ', error);
        }
    };

    const renderItem = ({ item }) => {
        let statusColor = '#2ecc71'; 
        if (item.status === 'CANCELLED') {
            statusColor = '#e74c3c'; }


        console.log(item)
        return (
            <View style={[styles.bookingItem, { borderColor: statusColor }]}>
                <Text>Type of Service: {item.serviceType}</Text>
                <Text>Description: {item.description}</Text>
                <Text>City: {item.city}</Text>
                <Text>Address: {item.address}</Text>
                <Text>Price: {item.price}</Text>
                <Image src={item.image} height={200} width={100}/>
                <Text>Parts Included: {item.includingParts ? 'Yes' : 'No'}</Text>
                <Text>Labor Included: {item.includingLabor ? 'Yes' : 'No'}</Text>
                <Text>Owner Email: {item.ownerEmail}</Text>
                {item.ownerPhoto && <Image source={{ uri: item.ownerPhoto }} style={styles.ownerPhoto} />}
                <Text>Booking Status: {item.status}</Text>
                <Text>Confirmation Code: {item.confirmationCode}</Text>
                <View style={styles.buttonContainer}>
                    <Button
                        title="Cancel Booking"
                        onPress={() => handleCancelBooking(item.id)}
                        color="#e74c3c"
                    />
                </View>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.headingText}>Manage Bookings</Text>

            <FlatList
                data={bookings}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                contentContainerStyle={{ paddingBottom: 20 }}
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
    bookingItem: {
        backgroundColor: '#ffffff',
        padding: 10,
        marginVertical: 5,
        borderRadius: 5,
        borderWidth: 2,
    },
    ownerPhoto: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginTop: 5,
    },
    buttonContainer: {
        marginTop: 10,
    },
});

export default BookingScreen;