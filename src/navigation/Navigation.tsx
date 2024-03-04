import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login, {screenOptions as LoginScreenOptions} from "../screens/auth/Login";
import Signup from "../screens/auth/Signup";

const AuthStackNavigator = createNativeStackNavigator();

export const AuthStack = () => {
    return(
      <AuthStackNavigator.Navigator>
        <AuthStackNavigator.Screen name='login' component={Login} options={LoginScreenOptions}/>
        <AuthStackNavigator.Screen name='signup' component={Signup} />
      </AuthStackNavigator.Navigator>
    )
  }