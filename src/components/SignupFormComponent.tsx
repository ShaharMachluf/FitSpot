import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react'
import { Alert, TextInput, View, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import { auth, database } from '../services/firebase-config';
import { addDoc, collection } from 'firebase/firestore';
import style from '../services/style';
import { Checkbox } from 'react-native-paper';
import colors from '../services/colors';

const SignupFormComponent = () => {

    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [firstName, setFirstName] = useState<string>("")
    const [lastName, setLastName] = useState<string>("")
    const [mobile, setMobile] = useState<string>("")
    const [isTrainer, setIsTrainer] = useState<boolean>(false)
  
    const [isLoading, setIsLoading] = useState<boolean>(false);
    // const [errMsg, setErrMsg] = useState(null);
  
    const signupAction = async() => {
      setIsLoading(true);
  
  
      if (email !== "" && password !== "" && firstName !== "" && lastName !== "" && mobile !== "") {
  
        const user = await createUserWithEmailAndPassword(auth, email, password);
  
        const docRef = await addDoc(collection(database, "accounts"), {
          firstName: firstName,
          lastName: lastName,
          mobile: mobile,
          email:email,
          isTrainer: isTrainer,
          uid: user.user.uid,
          myClasses: []
        })
        .then(data => {
          setIsLoading(false)
        })
        .catch(err => {Alert.alert(err.message)})
  
  
      } else {
        Alert.alert("All inputs are require");
        setIsLoading(false);
      }
    };

  return (
    <>
    <TextInput
    value={firstName}
    onChangeText={(text) => setFirstName(text)}
    keyboardType="default"
    placeholder="First name"
    style={style.input}
  />

  <TextInput
    value={lastName}
    onChangeText={(text) => setLastName(text)}
    keyboardType="default"
    placeholder="Last name"
    style={style.input}
  />

  <TextInput
    value={mobile}
    onChangeText={(text) => setMobile(text)}
    keyboardType="phone-pad"
    placeholder="Mobile"
    autoCapitalize="none"
    style={style.input}
  />

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
  <View style={style.checkBoxContainer}>
    <Checkbox
      status={isTrainer ? 'checked' : 'unchecked'}
      onPress={() => {
        setIsTrainer(!isTrainer);
      }}
      color={colors.dark_tin}
    />
    <Text style={style.checkBoxTxt}>I am a trainer</Text>
  </View>

  {isLoading ? (
    <ActivityIndicator size="large" color={colors.dark_orange} />
  ) : (
    <TouchableOpacity style={style.btn} onPress={signupAction}>
      <Text style={style.btn_txt}>Sign Up</Text>
    </TouchableOpacity>
  )}
    </>
  )
}

export default SignupFormComponent