import React from 'react'
import { Button, Text, View } from 'react-native'
import { auth } from '../../services/firebase-config'
import AddClassComponent from '../../components/AddClassComponent'
import style from '../../services/style'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import colors from '../../services/colors'
import ScheduleComponent from '../../components/ScheduleComponent'

const handleSignOut = async() => {
  await auth.signOut()
}

const Dashboard = () => {

  return (
    <>
    <View style={style.container}>
      <ScheduleComponent mode='trainer'/>
      <AddClassComponent />
    </View>
    </>

  )
}

export const screenOptions = () => {
  return {
      headerTitle: 'Trainer',
      headerRight: () => (
          <MaterialIcons 
              onPress={handleSignOut}
              name='logout' 
              color={colors.white} size={24} />
      )
  }
}

export default Dashboard