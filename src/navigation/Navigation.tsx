import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import Login, {screenOptions as LoginScreenOptions} from "../screens/auth/Login";
import Signup, {screenOptions as SignupScreenOptions} from "../screens/auth/Signup";

import TrainersDashboard, {screenOptions as TrainersDashboardScreenOptions} from "../screens/trainer/Dashboard";

import TraineesDashboard, {screenOptions as TraineesDashboardScreenOptions} from "../screens/dashboard/Dashboard";
import Schedule, {screenOptions as ScheduleScreenOptions} from "../screens/schedule/Schedule"; 
import Profile, {screenOptions as ProfileScreenOptions} from "../screens/profile/Profile";

import colors from "../services/colors";

import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'


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
const TraineesDashboardStackNavigator = createNativeStackNavigator();
const ProfileStackNavigator = createNativeStackNavigator();
const ScheduleStackNavigator = createNativeStackNavigator();

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

export const TraineesDashboardStack = () => {
  return(
    <TraineesDashboardStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <TraineesDashboardStackNavigator.Screen name="traineesDashboard" component={TraineesDashboard} options={TraineesDashboardScreenOptions}/>
    </TraineesDashboardStackNavigator.Navigator>
  )
}

export const ProfileStack = () => {
  return(
    <ProfileStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <ProfileStackNavigator.Screen name="profile" component={Profile} options={ProfileScreenOptions}/>
    </ProfileStackNavigator.Navigator>
  )
}

export const ScheduleStack = () => {
  return(
    <ScheduleStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <ScheduleStackNavigator.Screen name="schedule" component={Schedule} options={ScheduleScreenOptions}/>
    </ScheduleStackNavigator.Navigator>
  )
}


const AppBottomTabs = createMaterialBottomTabNavigator();
export const AppTabs = () => {
  return(
    <AppBottomTabs.Navigator
    activeColor={colors.dark_orange}
    inactiveColor={colors.white}
    barStyle={{ backgroundColor: colors.dark_tin }}
  >
      <AppBottomTabs.Screen
        options={{
          tabBarLabel: "Dashboard",
          tabBarIcon: ({ color }) => (
            <MaterialIcons color={color} size={30} name="space-dashboard" />
          ),
        }}
        name="dashboardTab"
        component={TraineesDashboardStack}
      />
      <AppBottomTabs.Screen
        options={{
          tabBarLabel: "Schedule",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons color={color} size={30} name="calendar-blank" />
          ),
        }}
        name="scheduleTab"
        component={ScheduleStack}
      />
      <AppBottomTabs.Screen
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color }) => (
            <MaterialIcons color={color} size={30} name="person" />
          ),
        }}
        name="profileTab"
        component={ProfileStack}
      />
    </AppBottomTabs.Navigator>
  )
}