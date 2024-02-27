import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "../screens/auth/Login";
import Signup from "../screens/auth/Signup";
import SignupAsTrainee from "../screens/auth/SignupAsTrainee";
import SignupAsTrainer from "../screens/auth/SignupAsTrainer";

const AuthStackNavigator = createNativeStackNavigator();

export const AuthStack: React.FC = () => {
    return(
      <AuthStackNavigator.Navigator>
        <AuthStackNavigator.Screen name='login' component={Login} />
        <AuthStackNavigator.Screen name='signup' component={Signup} />
        <AuthStackNavigator.Screen name='signupAsTrainer' component={SignupAsTrainer} />
        <AuthStackNavigator.Screen name='signupAsTrainee' component={SignupAsTrainee} />
      </AuthStackNavigator.Navigator>
    )
  }