import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { auth } from '../../services/firebase-config'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import colors from '../../services/colors'
import { useUser } from '../../stores/useUserStore'
import style from '../../services/style'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const handleSignOut = async() => {
    await auth.signOut()
  }

const Profile = () => {

  const currUser = useUser((state) => state.user)

  return (
    <View style={style.profile_container}>
      <View>
        <Text style={[style.upcoming_title, {fontSize: 30}]}>{currUser?.firstName} {currUser?.lastName}</Text>
        <View style={style.checkBoxContainer}>
          <MaterialCommunityIcons name='email-outline' size={20} />
          <Text style={style.checkBoxTxt}>  {currUser?.email}</Text>
        </View>
        <View style={style.checkBoxContainer}>
          <SimpleLineIcons name='phone' size={20}/>
          <Text style={style.checkBoxTxt}>  {currUser?.mobile}</Text>
        </View>
      </View>
      <View style={{width: '100%', padding: 0, marginBottom: -20}}>
        <TouchableOpacity style={[style.btn, style.add_class_btn, {width: '100%'}]}>
          <Text>Edit</Text>
        </TouchableOpacity>
      </View>
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