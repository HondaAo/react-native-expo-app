import React, { createContext, useState } from 'react' 
import { AsyncStorage } from 'react-native';
import axios from 'axios'

export const AuthContext = createContext();

export const AuthProvider = ({ children }) =>{
    const [ userInfo, setUserInfo ] = useState({})
    const [ isTabVisible, setIsTabVisible ] = useState(true)
    const register = async(userdata) => {
        const { data } = await axios.post('http://localhost:5000/api/user/register',userdata)
        if(data){
            setUserInfo(data)
            AsyncStorage.setItem('userInfo', JSON.stringify(data), (err)=> {
                if(err){
                    console.log("an error");
                    throw err;
                }
                console.log("success");
            }).catch((err)=> {
                console.log("error is: " + err);
            })
        }
    }
    const login = async(userdata)=>{
        const { data } = await axios.post('http://localhost:5000/api/user/login',userdata)
     if(data){
        setUserInfo(data)
        AsyncStorage.setItem('userInfo', JSON.stringify(data), (err)=> {
            if(err){
                console.log("an error");
                throw err;
            }
            console.log("success");
        }).catch((err)=> {
            console.log("error is: " + err);
        })
     }
    }
    const logout = ()=>{
                setUserInfo(null)
                AsyncStorage.removeItem('userInfo');
            }
    return(
        <AuthContext.Provider value={{
            userInfo,
            setUserInfo,
            login,
            register,
            logout ,
            isTabVisible,
            setIsTabVisible
        }}>
         {children}
        </AuthContext.Provider>
    )
}