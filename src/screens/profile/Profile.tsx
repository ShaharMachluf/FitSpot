import React from 'react'
import { View, Text } from 'react-native'
import { auth } from '../../services/firebase-config'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import colors from '../../services/colors'

const handleSignOut = async() => {
    await auth.signOut()
  }

const Profile = () => {
  return (
    <View>
        <Text>Profile</Text>
    </View>
  )
}

export const screenOptions = () => {
    return {
        headerTitle: 'Profile',
        headerRight: () => (
            <MaterialIcons 
                onPress={handleSignOut}
                name='logout' 
                color={colors.white} size={24} />
        )
    }
  }

export default Profile