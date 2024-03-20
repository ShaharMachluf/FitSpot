import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import Login, {screenOptions as LoginScreenOptions} from "../screens/auth/Login";
import Signup, {screenOptions as SignupScreenOptions} from "../screens/auth/Signup";

import TrainersDashboard, {screenOptions as TrainersDashboardScreenOptions} from "../screens/trainer/Dashboard";
import colors from "../services/colors";

export type RootStackParamList = {
  login: undefined;
  signup: undefined
}

const defaultNavOptions = {
  headerStyle: {backgroundColor: colors.dark_tin},
  headerTintColor: colors.white,
  headerTitleStyle: {fontFamily:'Raleway-Medium', fontSize:18}
}

const AuthStackNavigator = createNativeStackNavigator<RootStackParamList>();
const TrainersDahcboardStackNavigator = createNativeStackNavigator();

export const AuthStack = () => {
    return(
      <AuthStackNavigator.Navigator>
        <AuthStackNavigator.Screen name='login' component={Login} options={LoginScreenOptions}/>
        <AuthStackNavigator.Screen name='signup' component={Signup} options={SignupScreenOptions} />
      </AuthStackNavigator.Navigator>
    )
  }

export const TrainersDahcboardStack = () => {
  return(
    <TrainersDahcboardStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <TrainersDahcboardStackNavigator.Screen name="trainersDashboard" component={TrainersDashboard} options={TrainersDashboardScreenOptions}/>
    </TrainersDahcboardStackNavigator.Navigator>
  )
}