import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet, Text, View } from "react-native";
import { QueryClient, QueryClientProvider } from "react-query";
import { StackParamList } from "./src/features/types/types";
import FetchWeather from "./src/views/FetchWeather";
import Weather from "./src/views/Weather";
import SearchLocation from "./src/views/SearchLocation/SearchLocation";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const Stack = createNativeStackNavigator<StackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <QueryClientProvider client={queryClient}>
        <Stack.Navigator
          initialRouteName="InitialSearch"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="InitialSearch" component={SearchLocation} />
          <Stack.Screen name="FetchWeather" component={FetchWeather} />

          {/* <InitialSearch /> */}
        </Stack.Navigator>
      </QueryClientProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
