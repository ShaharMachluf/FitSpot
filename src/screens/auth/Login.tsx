import React, { useState } from 'react'
import { TextInput, View, Text, ActivityIndicator, TouchableOpacity, Alert } from 'react-native'
import style from '../../services/style'
import colors from '../../services/colors'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../services/firebase-config'

const Login = (props) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errMsg, setErrMsg] = useState(null);

  const loginAction = () => {
  setIsLoading(true)
  if(email !== "" && password !== ""){
      signInWithEmailAndPassword(auth, email, password)
      .then(res => {
        setIsLoading(false)
          console.log(res);
      })
      .catch(err => {
          Alert.alert(err.message)
          setIsLoading(false)
      })
  } else {
      Alert.alert("All inputs are require")
      setIsLoading(false)
  }
}

  return (
    // <Text>Login</Text>
    <View style={style.container}>
      <View style={style.logo_container}>
        <MaterialIcons
          color={colors.dark_orange}
          size={60}
          name="fitness-center"
        />
        <Text style={style.title}>FitSpot</Text>
      </View>

      <View style={style.form_container}>
        <TextInput
          value={email}
          onChangeText={(text) => setEmail(text)}
          keyboardType="email-address"
          placeholder="Email address"
          autoCapitalize="none"
          style={style.input}
        />
        <TextInput
          value={password}
          onChangeText={(text) => setPassword(text)}
          keyboardType="default"
          secureTextEntry={true}
          autoCapitalize="none"
          placeholder="Password"
          style={style.input}
        />

        {
          isLoading ? (<ActivityIndicator size='large' color={colors.dark_orange} />) : 
          (<TouchableOpacity style={style.btn} onPress={loginAction}>
            <Text style={style.btn_txt}>Login</Text>
          </TouchableOpacity>)
        }

        <TouchableOpacity onPress={() => {props.navigation.navigate("signup")}} style={style.outline_btn}>
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