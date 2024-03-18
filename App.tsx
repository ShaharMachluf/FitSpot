import { ActivityIndicator, Alert, View } from "react-native";
import { useFonts } from "expo-font";
import { useCallback, useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import { NavigationContainer } from "@react-navigation/native";
import {
  MD3LightTheme as DefaultTheme,
  Provider as PaperProvider,
} from "react-native-paper";
import colors from "./src/services/colors";
import { AuthStack } from "./src/navigation/Navigation";
import style from "./src/services/style";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "./src/services/firebase-config";
import TraineesDashboard from "./src/screens/dashboard/Dashboard";
import TrainersDashboard from "./src/screens/trainer/Dashboard";
import { useUser } from "./src/stores/useUserStore";
import { fetchUser } from "./src/services/userService";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    secondaryContainer: colors.dark_tin,
  },
};

export default function App() {
  const currUser = useUser((state) => state.user);
  const setUser = useUser((state) => state.setUser);
  const [isTrainer, setIsTrainer] = useState<boolean | null | undefined>(null);

  const [isUser, setIsUser] = useState<boolean>(false);
  const handleAuthStateChange = async (authUser: User | null) => {
    if (authUser) {
      setIsUser(true);
      await checkUsersType();
    } else {
      setIsUser(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, handleAuthStateChange);
    return unsubscribe;
  }, []);

  const [fontsLoaded] = useFonts({
    "Raleway-Bold": require("./assets/fonts/Raleway-Bold.ttf"),
    "Raleway-Light": require("./assets/fonts/Raleway-Light.ttf"),
    "Raleway-Medium": require("./assets/fonts/Raleway-Medium.ttf"),
    "Raleway-Regular": require("./assets/fonts/Raleway-Regular.ttf"),
    "RobotoCondensed-Bold": require("./assets/fonts/RobotoCondensed-Bold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  const checkUsersType = async (): Promise<void> => {
    try {
      const result = await fetchUser();
      setIsTrainer(result.isTrainer);
      setUser(result);
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Failed to fetch results");
    }
  };

  return (
    <View style={style.container} onLayout={onLayoutRootView}>
      <NavigationContainer>
        <PaperProvider theme={theme}>
          {isUser ? (
            <>
              {isTrainer !== null ? (
                isTrainer ? (
                  <TrainersDashboard />
                ) : (
                  <TraineesDashboard />
                )
              ) : (
                <ActivityIndicator />
              )}
            </>
          ) : (
            <AuthStack />
          )}
        </PaperProvider>
      </NavigationContainer>
    </View>
  );
}
