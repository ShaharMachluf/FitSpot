import React from 'react'
import { View, Text } from 'react-native'
import style from '../services/style'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import colors from '../services/colors'

const LogoComponent = () => {
  return (
    <View style={style.logo_container}>
      <MaterialIcons
          color={colors.dark_orange}
          size={60}
          name="fitness-center"
        />
        <Text style={style.title}>FitSpot</Text>
      </View>
  )
}

export default LogoComponent