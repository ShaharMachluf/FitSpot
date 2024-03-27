import React from 'react'
import { Text, Image, View, ScrollView } from 'react-native'
import { auth } from '../../services/firebase-config'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import colors from '../../services/colors'
import style from '../../services/style'
import LogoComponent from '../../components/LogoComponent'
import MyClassesComponent from '../../components/MyClassesComponent'

const handleSignOut = async() => {
  await auth.signOut()
}

const Dashboard = () => {

  return (
    <>
    <Image source={require('../../../assets/images/background2_1_20.jpg')} style={{marginLeft: -25}}/>
    <View style={style.img_view}>
      <LogoComponent />
    </View>
    <View style={[style.container]}>
      <Text style={style.upcoming_title}>Your upcoming classes:</Text>
      <MyClassesComponent />
    </View>
    
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