import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import style from '../../services/style'
import LogoComponent from '../../components/LogoComponent';
import LoginFormComponent from '../../components/LoginFormComponent';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/Navigation';


type Props = NativeStackScreenProps<RootStackParamList, "login">;

const Login: React.FC<Props> = ({ navigation }) => {

  return (
    <View style={style.container}>
      <LogoComponent />
      <View style={style.form_container}>
        <LoginFormComponent />
        <TouchableOpacity onPress={() => {navigation.navigate("signup")}} style={style.outline_btn}>
          <Text style={style.outline_btn_txt}>Don't have an account? SignUp Now!</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export const screenOptions = () => {
  return {
    headerShown: false
  }
}

export default Login