import Axios from 'axios'
import React, { useContext, useEffect } from 'react'
import { AsyncStorage, StyleSheet, Text, View , TouchableOpacity, Image } from 'react-native'
import { Divider } from 'react-native-elements'
import { AuthContext } from '../Auth/AuthProvider'
import Icon from 'react-native-vector-icons/FontAwesome'
import { ScrollView } from 'react-native-gesture-handler'
import { createStackNavigator } from '@react-navigation/stack'
import PersonalInformation from '../screens/PersonalInformation'

const Home = ({ navigation }) => {
  const { userInfo, setUserInfo, logout, setIsTabVisible } = useContext(AuthContext)
  useEffect(()=>{
    const getUser = async () => {
    const object = await AsyncStorage.getItem("userInfo");
    console.log(object)
    setUserInfo(JSON.parse(object))
    console.log(userInfo)
    }
    getUser();
  },[])
    return (
        <>
        { userInfo ? 
        (
        <ScrollView style={styles.center}>
         <View style={styles.header}>
          <Image source={{ uri: userInfo.image}} style={styles.image} />
          <Text style={{ marginLeft: 20, fontSize: 25, fontWeight: '600'}}>{userInfo.name}</Text>
         </View>
         <Divider style={styles.hr} />
         <View style={styles.information}>
             <Text style={{ color: 'grey'}}>setting</Text>
             <View 
             style={{
                 flexDirection: 'row',
                 justifyContent: 'space-between',
                 height: 40,
                 alignItems: 'center',
                 marginTop: 20
             }}
            
             >
                 <Text onPress={()=> {
                     navigation.navigate('Personal')
                     setIsTabVisible(prev => !prev)
                 }}>Personal Information</Text>
                 <Icon name="user" size={26} style={{ marginRight: 10}} />
             </View>
             <Divider style={styles.hr} />
             <View style={{
                 flexDirection: 'row',
                 justifyContent: 'space-between',
                 height: 40,
                 alignItems: 'center',
                 marginTop: 20
             }}>
                 <Text>Travel list</Text>
                 <Icon name="map" size={26} style={{ marginRight: 10}} />
             </View>
             <Divider style={styles.hr} />
             <View style={{
                 flexDirection: 'row',
                 justifyContent: 'space-between',
                 height: 40,
                 alignItems: 'center',
                 marginTop: 20
             }}>
                 <Text>Payment setting</Text>
                 <Icon name="money" size={26} style={{ marginRight: 10}} />
             </View>
             <Divider style={styles.hr} />
         </View>
         <View style={styles.information}>
             <Text style={{ color: 'grey'}}>hosting</Text>
             <View style={{
                 flexDirection: 'row',
                 justifyContent: 'space-between',
                 height: 40,
                 alignItems: 'center',
                 marginTop: 20
             }}>
                 <Text>Become a guide</Text>
                 <Icon name="users" size={26} style={{ marginRight: 10}} />
             </View>
             <Divider style={styles.hr} />
             <View style={{
                 flexDirection: 'row',
                 justifyContent: 'space-between',
                 height: 40,
                 alignItems: 'center',
                 marginTop: 20
             }}>
                 <Text>Host a tour</Text>
                 <Icon name="globe" size={26} style={{ marginRight: 10}} />
             </View>
             <Divider style={styles.hr} />
         </View>
         <View style={styles.information}>
             <Text style={{ color: 'grey'}}>post</Text>
             <View style={{
                 flexDirection: 'row',
                 justifyContent: 'space-between',
                 height: 40,
                 alignItems: 'center',
                 marginTop: 20
             }}>
                 <Text>Post a experience</Text>
                 <Icon name="pencil" size={26} style={{ marginRight: 10}} />
             </View>
             <Divider style={styles.hr} />
             <View style={{
                 flexDirection: 'row',
                 justifyContent: 'space-between',
                 height: 40,
                 alignItems: 'center',
                 marginTop: 20
             }}>
                 <Text>Post your resaturant or hotel</Text>
                 <Icon name="shopping-bag" size={26} style={{ marginRight: 10}} />
             </View>
             <Divider style={styles.hr} />
         </View>
         <TouchableOpacity onPress={logout} style={{ height: 40, padding: '2%', marginLeft: 16}}>
             <Text style={{ color: 'tomato'}}>Logout</Text>
         </TouchableOpacity>
        </ScrollView>
        )
        : null }
        </>
    )
}

const styles = StyleSheet.create({
    center: {
       flex: 1,
       marginTop: 50,
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        height: 80,
        padding: '3%'
    },
    hr: {
        shadowColor: "#000",
        shadowOffset: {
	     width: 0,
	     height: 7,
        },
        shadowOpacity: 0.25,
        elevation: 12,
        alignItems: 'center'
    },
    image: {
        height: 50,
        width: 50,
        borderRadius: 50
    },
    information: {
        padding: '5%'
    }
})


const Stack = createStackNavigator();

export const Mypage = () => {
   return(
    <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Home" component={Home} />
    <Stack.Screen name="Personal" component={PersonalInformation} />
    {/*<Stack.Screen name="Travel" component={TravelList} />
    <Stack.Screen name="Payment" component={Payment} />
    <Stack.Screen name="BeGuide" component={BeGuide} />
    <Stack.Screen name="BeTour" component={BeTour} />
    <Stack.Screen name="Post" component={Post} />
    <Stack.Screen name="PostStore" component={PostStore} /> */}
   </Stack.Navigator> 
   )
}