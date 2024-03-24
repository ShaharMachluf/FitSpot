import React from 'react'
import { Button, Text } from 'react-native'
import { signOut } from 'firebase/auth'
import { auth } from '../../services/firebase-config'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import colors from '../../services/colors'

const handleSignOut = async() => {
  await auth.signOut()
}

const Dashboard = () => {

  return (
    <>
    <Text>Trainee's Dashboard</Text>
    </>

  )
}

export const screenOptions = () => {
  return {
      headerTitle: 'Dashboard',
      headerRight: () => (
          <MaterialIcons 
              onPress={handleSignOut}
              name='logout' 
              color={colors.white} size={24} />
      )
  }
}

export default Dashboard