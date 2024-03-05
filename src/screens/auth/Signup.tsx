import React, {useState} from 'react'
import { ActivityIndicator, Alert, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { Checkbox } from 'react-native-paper';
import style from '../../services/style'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import colors from '../../services/colors';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, database } from '../../services/firebase-config';
import { addDoc, collection } from 'firebase/firestore';


//same form for both trainers and trainees but there will be a checkbox to mark if your'e a trainer
const Signup: React.FC = (props) => {

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
      })
      .then(data => {
        setIsLoading(false)
        props.navigation.navigate("login")
      })
      .catch(err => {Alert.alert(err.message)})


    } else {
      Alert.alert("All inputs are require");
      setIsLoading(false);
    }
  };

  return (
    <>
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

        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate("login");
          }}
          style={style.outline_btn}
        >
          <Text style={style.outline_btn_txt}>Back to Login</Text>
        </TouchableOpacity>
      </View>
    </View>

    </>
  )
}

export const screenOptions = () => {
  return {
    headerShown: false,
  };
};

export default Signup