import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import Login, {screenOptions as LoginScreenOptions} from "../screens/auth/Login";
import Signup, {screenOptions as SignupScreenOptions} from "../screens/auth/Signup";

export type RootStackParamList = {
  login: undefined;
  signup: undefined
}

const AuthStackNavigator = createNativeStackNavigator<RootStackParamList>();

export const AuthStack = () => {
    return(
      <AuthStackNavigator.Navigator>
        <AuthStackNavigator.Screen name='login' component={Login} options={LoginScreenOptions}/>
        <AuthStackNavigator.Screen name='signup' component={Signup} options={SignupScreenOptions} />
      </AuthStackNavigator.Navigator>
    )
  }