import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, View, Text, Button } from 'react-native'
import { Divider } from 'react-native-paper'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/FontAwesome'
import { AuthContext } from '../Auth/AuthProvider'
import { AppLoading } from 'expo'
import { Input } from 'react-native-elements'
import Axios from 'axios'

const PersonalInformation = ({ navigation }) => {
    const { setIsTabVisible, userInfo, setUserInfo } = useContext(AuthContext)
    const [ name, setName ] = useState(userInfo.name);
    const [ email, setEmail ] = useState(userInfo.email);
    const [ sex, setSex ] = useState(userInfo.sex)
    useEffect(()=> {
     
    },[])
    const onPress = () => {
        console.log(name)
        const info = {
            name,
            sex,
            email
        }
        Axios.put(`http://localhost:5000/api/user/setting/${userInfo._id}`,info)
        .then(res => {
            alert(res.data)
            AsyncStorage.setItem('userInfo', JSON.stringify(Info), (err)=> {
                if(err){
                    console.log("an error");
                    throw err;
                }
                console.log("success");
            }).catch((err)=> {
                console.log("error is: " + err);
            })
        })
        .catch(err => alert(err))
    }
     return (
        <ScrollView>
         <View style={styles.header}>
         <TouchableOpacity style={styles.button} title="Go back" onPress={() => {
           navigation.goBack()
           setIsTabVisible(prev=> !prev)
         }}><Icon name="chevron-left" size={20} /></TouchableOpacity>
         <Button  onPress={onPress} title="Save"/>
         </View> 
         <Divider />
         <View>
            <Text style={{ margin: 20}}>Edit My profile</Text>
            {userInfo ? (
             <View>
              <Input
                label='name'
                placeholder={userInfo.name}
                onChangeText={(text)=> setName(text)}
              />
              <Input 
                label='email'
                placeholder={userInfo.email}
                onChangeText={(text)=> setEmail(text)}
              />
              <Input
                label='sex'
                placeholder={userInfo.sex}
                onChangeText={(text)=> setSex(text)}
              />
             </View>
            ): <Text>Loading...</Text>}
         </View>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
   header: {
       marginTop: 30,
       height: 60,
       padding: '3%',
       display: 'flex',
       flexDirection: 'row',
       justifyContent: 'space-between',
   }
})

export default PersonalInformation
