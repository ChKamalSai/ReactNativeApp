import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DonationLogin from "./Files/DonationLogin";
import DonationRegistration from "./Files/DonationRegistration";
export default function App(){
  const stack=createNativeStackNavigator()
  return (
    <NavigationContainer>
      <stack.Navigator>
        <stack.Screen name="Login" component={DonationLogin}/>
        <stack.Screen name="Registration" component={DonationRegistration}/>
      </stack.Navigator>
    </NavigationContainer>
  );
}