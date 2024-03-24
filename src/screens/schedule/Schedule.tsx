import React from 'react'
import { View, Text } from 'react-native'
import { auth } from '../../services/firebase-config'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import colors from '../../services/colors'
import style from '../../services/style'
import ScheduleComponent from '../../components/ScheduleComponent'

const handleSignOut = async() => {
    await auth.signOut()
  }

const Schedule = () => {
  return (
    <View style={style.container}>
        <ScheduleComponent mode='trainee'/>
    </View>
  )
}

export const screenOptions = () => {
    return {
        headerTitle: 'Schedule',
        headerRight: () => (
            <MaterialIcons 
                onPress={handleSignOut}
                name='logout' 
                color={colors.white} size={24} />
        )
    }
  }

export default Schedule