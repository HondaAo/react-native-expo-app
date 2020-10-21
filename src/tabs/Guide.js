import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { Button } from 'react-native-paper'
import { Card } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Tab1 } from './Home'


const Guide = ({ navigation }) => {
    const locations = [
        {
            country: 'Singapore',
            image: 'https://images.unsplash.com/photo-1517570123306-d58896657b2c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
        },
        {
            country: 'Malaysia',
            image: 'https://images.unsplash.com/photo-1582888736122-1b8900c586ce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
        },
        {
            country: 'Vietnam',
            image: 'https://images.unsplash.com/photo-1569271532956-3fb81a207115?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60'
        },
        {
            country: 'Thailand',
            image: 'https://images.unsplash.com/photo-1506801310323-534be5e7a730?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
        }
    ]
    return (
        <View style={styles.center}>
        <TouchableOpacity style={styles.button} title="Go back" onPress={() => navigation.goBack()}><Icon name="chevron-left" size={20} /></TouchableOpacity>
        <Text style={styles.title}>We have a lot of guides from these countries</Text>
         <ScrollView horizontal={true} style={{ minHeight: 40, padding: 5}}>
        { locations.map(location => (
          <Card 
              containerStyle={{ 
              borderRadius: 30,
              shadowColor: "#000",
              shadowOffset: {
	           width: 0,
	           height: 3,
              },
              shadowOpacity: 0.25,
              elevation: 6, 
            }}>
           <Card.Image source={{ uri: location.image}}
           style={{
            borderRadius: 10,
            width: 220,
           }} />
           <Text style={{margin: 10, fontSize: 20, fontWeight: '300'}} >
               {location.country}
           </Text>
          </Card>
        ))}
         </ScrollView>
         <Text style={styles.title}>Unique tour list with inhabitant</Text>
         <Text style={{ color: 'grey', marginLeft: 20, marginRight: 15}}>Having a huge fun with local nature and heritage site</Text>
         <ScrollView>
          <View>
              
          </View>
         </ScrollView>
        </View>
    )
}
const styles = StyleSheet.create({
    center: {
        padding: '8%'
    },
    button: {
        marginTop: 30
    },
    title: {
        fontSize: 20,
        margin: 20,
        fontWeight: "300"
    }

})
export default Guide
