import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react'
import { auth } from '../services/firebase-config';
import { ActivityIndicator, Alert, TextInput, TouchableOpacity, Text } from 'react-native';
import style from '../services/style';
import colors from '../services/colors';

const LoginFormComponent = () => {

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
    <>
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
    </>
  )
}

export default LoginFormComponent