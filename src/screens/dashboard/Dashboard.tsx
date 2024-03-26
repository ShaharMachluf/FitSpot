import React from 'react'
import { Button, Text, Image, View } from 'react-native'
import { signOut } from 'firebase/auth'
import { auth } from '../../services/firebase-config'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import colors from '../../services/colors'
import style from '../../services/style'
import LogoComponent from '../../components/LogoComponent'

const handleSignOut = async() => {
  await auth.signOut()
}

const Dashboard = () => {

  return (
    <>
    {/* <View style={style.container}> */}
          <Image source={require('../../../assets/images/background2_1_20.jpg')} style={{marginLeft: -25}}/>
    <View style={style.img_view}>
      <LogoComponent />
    </View>
    {/* </View> */}

    
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