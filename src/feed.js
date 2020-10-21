import React from 'react'
import { Button, Text, View } from 'react-native'
import { styles } from './style/styles'
const Feed = ({ navigation }) => {
    return (
        <View style={styles.center}>
          <Text style={styles.title}>Navigation Drawer</Text> 
          <Button title="Go to Feed Item" onPress={()=> { navigation.navigate('Detail')}}
          /> 
        </View>
    )
}

export default Feed
