import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useContext, useState } from 'react'
import { Text, View, TouchableOpacity, AsyncStorage  } from 'react-native'
import { Input } from 'react-native-elements';
import { styles } from '../style/styles'
import { Button, Colors } from 'react-native-paper'
import { AuthContext } from '../Auth/AuthProvider'
import Icon from 'react-native-vector-icons/FontAwesome';

const Login = ({navigation}) => {
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const { login, register } = useContext(AuthContext)
    const onPress = async() => {
        const user = {
            email,
            password
        }
        login(user)
    }
    return (
        <View style={styles.center}>
         <Text style={styles.title}>Login</Text>  
         <Input
           label="Email"
           value={email}
           placeholder="name@example.com"
           onChangeText={value => setEmail(value)}
           style={{
               width: '90%',
               margin: '5%'
           }}
           leftIcon={
  　　　　　　  <Icon
  　　　　　　    name='inbox'
  　　　　　　    size={24}
  　　　　　　    color='black'
  　　　　　　  />
  　　　　　　}
         /> 
         <Input
           label="Password"
           placeholder='Password'
  　　　　　　
           value={password}
           onChangeText={value => setPassword(value)}
           style={{
               width: '90%',
               margin: '5%',
           }}
           leftIcon={
             <Icon
               name='lock'
               size={24}
               color='black'
             />
           }
         /> 
         <Button 
         mode="contained" 
         onPress={onPress}
         style={{
            width: '90%',
            margin: '5%',
            backgroundColor: Colors.red300
        }}>
           Login
         </Button>
         <Text>Don't have account
         <TouchableOpacity onPress={()=> navigation.navigate('Register')}><Text style={{ color: 'blue'}}>Sign up</Text></TouchableOpacity>
        </Text> 
        </View>
    )
}


const Register = ({ navigation}) => {
    const [ name, setName ] = useState('')
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const { login, register } = useContext(AuthContext)
    const onPress = async() =>{
        const user = {
            name,
            email,
            password
        }
        register(user)
    }
    return (
        <View style={styles.center}>
         <Text style={styles.title}>Register</Text>  
         <Input
           label="Name"
           value={name}
           placeholder="username"
           onChangeText={value => setName(value)}
           style={{
               width: '90%',
               margin: '5%'
           }}
           leftIcon={
  　　　　　　  <Icon
  　　　　　　    name='user'
  　　　　　　    size={24}
  　　　　　　    color='black'
  　　　　　　  />
  　　　　　　}
         /> 
         <Input
           label="Email"
           value={email}
           placeholder="name@example.com"
           onChangeText={value => setEmail(value)}
           style={{
               width: '90%',
               margin: '5%'
           }}
           leftIcon={
  　　　　　　  <Icon
  　　　　　　    name='inbox'
  　　　　　　    size={24}
  　　　　　　    color='black'
  　　　　　　  />
  　　　　　　}
         /> 
         <Input
           label="Password"
           placeholder='Password'
  　　　　　　
           value={password}
           onChangeText={value => setPassword(value)}
           style={{
               width: '90%',
               margin: '5%',
           }}
           leftIcon={
             <Icon
               name='lock'
               size={24}
               color='black'
             />
           }
         /> 
         <Button 
         mode="contained" 
         onPress={onPress}
         style={{
            width: '90%',
            margin: '5%',
            backgroundColor: Colors.red300
        }}>
           Login
         </Button>
         <Text>Have account?</Text> 
         <TouchableOpacity onPress={()=> navigation.navigate('Login')}><Text style={{ color: 'blue' }}>Login</Text></TouchableOpacity>
        </View>
    )
}


const Stack = createStackNavigator();

export const Tab2 = ()=>{
    return(
           <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
           </Stack.Navigator> 
    )
}

