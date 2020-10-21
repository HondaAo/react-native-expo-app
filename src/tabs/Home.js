import React from 'react';
import { Searchbar } from 'react-native-paper';
import { View, Text, Image, Dimensions } from 'react-native'
import { Card, ListItem, Button, Icon } from 'react-native-elements'
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import Guide from './Guide';
import Tour from './Tour';
import Local from './Local';


const Home = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = query => setSearchQuery(query);
  return (
    <SafeAreaView style={{ flex: 1 }}>
    <ScrollView>
    <>
    <Searchbar
      placeholder="Where do you go next?"
      onChangeText={onChangeSearch}
      value={searchQuery}
      style={{
          marginTop: 15,
          width: "90%",
          marginLeft: "5%" 
       }}
    />
    <Image
          style={{
            alignSelf: 'stretch',
            width: '90%',
            height: 400,
            margin: '5%',
            borderRadius: 20,
            position: 'relative'
          }}
          source={{uri: 'https://images.unsplash.com/photo-1483683804023-6ccdb62f86ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'}}
    />
    <Text
     style={{
         position: 'absolute',
         top: 90,
         left: 50,
         color: 'white',
         fontSize: 25
     }}
    >Travel with Expo</Text>
    </>
    <Card onPress={()=> { navigation.navigate('Guide')}}>
       <Card.Image source={{ uri: 'https://images.unsplash.com/photo-1552925690-47ab745613c9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'}} />
       <Text style={{margin: 10, fontSize: 20}} onPress={()=> { navigation.navigate('Guide')}}>
           Search Guide
       </Text>
       <Text style={{ color: 'lightgrey'}}>
           Let's meet new experience
       </Text>
     </Card>
     <Card onPress={()=> { navigation.navigate('Tour')}}>
       <Card.Image onPress={()=> { navigation.navigate('Tour')}} source={{ uri: 'https://images.unsplash.com/photo-1504214208698-ea1916a2195a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'}} />
       <Text style={{margin: 10, fontSize: 20}}>
           Unique Tour
       </Text>
       <Text style={{ color: 'lightgrey'}}>
           Let's meet new experience
       </Text>
     </Card>
     <Card onPress={()=> { navigation.navigate('Local')}}>
       <Card.Image onPress={()=> { navigation.navigate('Local')}} source={{uri: 'https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'}} />
       <Text style={{margin: 10, fontSize: 20}}>
           Stylish restaurant and bar
       </Text>
       <Text style={{ color: 'lightgrey'}}>
           Let's meet new experience
       </Text>
     </Card>
     </ScrollView>
     </SafeAreaView>
  );
};


const Stack = createStackNavigator();

export const Tab1 = ()=>{
    return(
           <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Guide" component={Guide} options={{ headerTitle: 'Guide'}} />
            <Stack.Screen name="Tour" component={Tour} />
            <Stack.Screen name="Local" component={Local} />
           </Stack.Navigator> 
    )
}



