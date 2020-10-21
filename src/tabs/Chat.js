import Axios from 'axios'
import React, { useContext, useEffect, useState,  } from 'react'
import { AsyncStorage, StyleSheet, TextInput, Button , Text, View, Platform,StatusBar,PermissionsAndroid } from 'react-native'
import { set } from 'react-native-reanimated'
import { AuthContext } from '../Auth/AuthProvider'
import { ListItem, Avatar } from 'react-native-elements'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { createStackNavigator } from '@react-navigation/stack'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Divider} from 'react-native-paper'
import { ScreenStackHeaderRightView } from 'react-native-screens'

const ChatList = ({ navigation }) => {
    const { userInfo, setUserInfo, setIsTabVisible } = useContext(AuthContext)
    const [ chats, setChats ] =useState([])
  useEffect(()=>{
    const getUser = async () => {
    const object = await AsyncStorage.getItem("userInfo")
    setUserInfo(JSON.parse(object))
    }
    getUser()
  },[])
  if(userInfo){
    Axios.get(`http://localhost:5000/api/chat/${userInfo._id}`)
    .then(res => {
        setChats(res.data)
    })
    .catch(err => console.log(err))
  }
    return (
        <>
        { chats.length > 0  ? (
        <View style={styles.center}>
         <Text style={styles.title}>Chat Page</Text>
         <ScrollView>
             <View>
             {
               chats.map((l, i) => (
                 <ListItem key={i} bottomDivider onPress={ ()=> {
                   navigation.navigate('Message', { userId: l.userId, myId: l.myId }); 
                   setIsTabVisible(prev=> !prev);}}
                 >
                   <Avatar rounded source={{ uri: l.userImage}} />
                   <ListItem.Content>
                     <ListItem.Title>{l.username}</ListItem.Title>
                     <ListItem.Subtitle style={{ color: 'grey'}}>{l.text}</ListItem.Subtitle>
                     <ListItem.Subtitle style={{ color: 'grey'}}>{l.createdAt.slice(11,19)}</ListItem.Subtitle>
                   </ListItem.Content>
                 </ListItem>
               ))
              }
             </View>
         </ScrollView>  
        </View>
        ): null }
        </>
    )
}
const styles = StyleSheet.create({
    title: {
       margin: 70,
       fontSize: 24,
       fontWeight: '300'
    },
    message: {
        marginTop: 60,
        
    },
    button: {
      marginTop: 0,
      marginLeft: 20
  },
    messageHeader: {
       marginLeft: 100,
       fontWeight: '600',
       fontSize: 25
    },
    recieveMessage: {
      backgroundColor: 'white',
      textAlign:　'left',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: '3%'
    },
    sendMessage: {
      backgroundColor: 'white',
      textAlign:　'right',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: '3%'
    },
    chatView: {
      padding: '5%',
    },
    textInput: {
      padding: '3%',
      backgroundColor: 'white',
      display: 'flex',
      flexDirection: 'row',
      alignItems:'center'
    }
})

const Message = ({ route,navigation }) =>{
    const [ chats, setChats ] = useState([]);
    const [ text, setText ] =useState('')
    const { setIsTabVisible, userInfo, setUserInfo } = useContext(AuthContext)
    const { userId, myId } = route.params
    useEffect(()=> {
      const getUser = async () => {
        const object = await AsyncStorage.getItem("userInfo")
        setUserInfo(JSON.parse(object))
      }
      getUser();
      Axios.get(`http://localhost:5000/api/chat/?userId=${userId}&myId=${myId}`)
      .then(res => {
          setChats(res.data)
      })
      .catch(err => console.log(err))
    },[])
    return(
    <View style={styles.message}>
       { chats.length > 0 && userInfo ? (
        <View>
         <TouchableOpacity style={styles.button} title="Go back" onPress={() => {
           navigation.goBack()
           setIsTabVisible(prev=> !prev)
         }}><Icon name="chevron-left" size={20} /></TouchableOpacity>
         <View  style={styles.messageHeader} >
           <Text>{chats[0].username}</Text>
         </View> 
         <Divider style={{ marginTop: 20}} />
         {chats.map(chat => (
           <ScrollView style={styles.chatView}>
           { chat.sender !== chat.myId ? (
              <View style={styles.recieveMessage}>
                <Avatar rounded source={{ uri: chat.myImage }} /> 
               <View>
                <Text>{chat.text}</Text>
               <Text>{chat.createdAt.slice(11,19)}</Text>
               </View>
              </View>
           ): (
              <View style={styles.sendMessage}>
              <View>
                <Text>{chat.text}</Text>
                <Text style={{ color: 'lightgrey'}}>{chat.createdAt.slice(11,19)}</Text> 
                </View>
                <Avatar rounded source={{ uri: chat.myImage }} />
              </View>
           )}
           </ScrollView>
         ))}
         <View style={styles.textInput}>
         <TextInput
           style={{ height: 40,width: '80%', marginLeft: '7%', borderColor: 'gray', borderWidth: 1, borderRadius: 20 }}
           onChangeText={(text) => setText(text)}
         />
         <Button title="send" onPress={() => {
          const message = {
            userId,
            username: chats[0].username,
            sendername: userInfo.name,
            myId: userInfo._id,
            text,
            sender: userInfo._id,
            myImage: userInfo.image,
            userImage: chats[0].userImage
          }
      Axios.post('http://localhost:5000/api/chat',message)
      .then(res => {
        setText('');
        setChats([...chats, res.data])
      })
      .catch(err => console.log(err))
    }} />
         </View>
        </View>

       ): <Text>Loading...</Text> }
    </View>
    )
}

const Stack = createStackNavigator();

export const Chat = ()=>{
    return(
           <Stack.Navigator initialRouteName="ChatList" screenOptions={{ headerShown: false }} >
            <Stack.Screen name="ChatList" component={ChatList} />
            <Stack.Screen name="Message" component={Message} />
           </Stack.Navigator> 
    )
}
