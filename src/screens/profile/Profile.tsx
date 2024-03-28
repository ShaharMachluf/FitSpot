import React from 'react'
import { View, Text } from 'react-native'
import { auth } from '../../services/firebase-config'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import colors from '../../services/colors'
import { useUser } from '../../stores/useUserStore'
import style from '../../services/style'

const handleSignOut = async() => {
    await auth.signOut()
  }

const Profile = () => {

  const currUser = useUser((state) => state.user)

  return (
    <View style={style.container}>
        <Text>{currUser?.firstName} {currUser?.lastName}</Text>
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