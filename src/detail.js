import React from 'react'
import { Button, Text, View } from 'react-native'
import { styles } from './style/styles'

const Detail = ({ navigation }) => {
    return (
        <View style={styles.center}>
         <Text style={styles.title}>Detail Screen</Text>   
         <Button
         title="view Bottom Tabs"
         onPress={()=>{ navigation.navigate('Bottom Tabs')}}
         />
         {/* <Button 
          title="View Top Tab"
          onPress={()=> { navigation.navigate('Top Tabs')}}
          /> */}
        </View>
    )
}

export default Detail
