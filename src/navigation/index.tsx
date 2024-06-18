import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {BottomTab} from '../components/BottomTab';
import {
  About,
  Address,
  BirthdayAndGender,
  ContracInformation,
  Home,
  Welcome,
  ManageLevel,
  News,
  PersonalData,
  ProfileUser,
  Promotions,
  SheetNews,
  SheetPromotion,
  SocialMedia,
  LoginOrRegister,
  OTPVerification,
  TV,
  RegisterUser,
} from '../screens';
import React from 'react';

const Navigation = () => {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();

  const TabsNavigation: React.FC = () => {
    return (
      <Tab.Navigator
        tabBar={props => <BottomTab {...props} />}
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarHideOnKeyboard: true,
        }}>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Promotions" component={Promotions} />
        <Tab.Screen name="News" component={News} />
        <Tab.Screen name="ProfileUser" component={ProfileUser} />
      </Tab.Navigator>
    );
  };

  const TabsLoginRegister: React.FC = () => {
    return (
      <Tab.Navigator
        tabBar={props => <></>}
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarHideOnKeyboard: true,
        }}>
        <Tab.Screen name="Welcome" component={Welcome} />
        <Tab.Screen name="LoginOrRegister" component={LoginOrRegister} />
        <Tab.Screen name="OTPVerification" component={OTPVerification} />
        <Tab.Screen name="RegisterUser" component={RegisterUser} />
      </Tab.Navigator>
    );
  };

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="MainScreen" component={TabsNavigation} />
      <Stack.Screen name="WelcomeScreen" component={TabsLoginRegister} />
      <Stack.Screen name="SheetNews" component={SheetNews} />
      <Stack.Screen name="SheetPromotion" component={SheetPromotion} />
      <Stack.Screen name="PersonalData" component={PersonalData} />
      <Stack.Screen name="ManageLevel" component={ManageLevel} />
      <Stack.Screen name="SocialMedia" component={SocialMedia} />
      <Stack.Screen name="About" component={About} />
      <Stack.Screen name="ContractInformation" component={ContracInformation} />
      <Stack.Screen name="BirthdayAndGender" component={BirthdayAndGender} />
      <Stack.Screen name="Address" component={Address} />
      <Stack.Screen name="TV" component={TV} />
    </Stack.Navigator>
  );
};

export default Navigation;
