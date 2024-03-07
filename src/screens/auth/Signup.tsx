import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import style from '../../services/style'
import LogoComponent from '../../components/LogoComponent';
import SignupFormComponent from '../../components/SignupFormComponent';


//same form for both trainers and trainees but there will be a checkbox to mark if your'e a trainer
const Signup: React.FC = (props) => {

  return (
    <>
    <View style={style.container}>
      <LogoComponent />

      <View style={style.form_container}>
        <SignupFormComponent />
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