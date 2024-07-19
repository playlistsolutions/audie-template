import { NavigationProp } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import storage from '../../services/storage';

interface WelcomeProps {
  navigation: NavigationProp<RootTabParamList>;
}

export const Welcome: React.FC<WelcomeProps> = ({ navigation }) => {
  const userInfo = storage.getUserInfo();

  function goToLoginOrRegister() {
    navigation.navigate('LoginOrRegister');
  }

  if (userInfo) {
    navigation.navigate('MainScreen');
  }

  return (
    <View className="flex flex-col items-center justify-center flex-1 p-2 space-y-5 dark:bg-background-dark">
      <Image
        className="h-[50%] w-[100%]"
        source={require('../../assets/illustration.png')}
      />
      <View className="flex flex-col items-center justify-center">
        <Text className="flex text-lg text-black dark:text-white font-Poppins-Medium">
          Bem-Vindo ao 103 FM Aracaju
        </Text>
        <Text className="flex text-xs text-center text-gray-300 font-Poppins-Regular">
          Músicas, Noticias, Promoções e muito mais, tudo em um só lugar.
        </Text>
      </View>
      <TouchableOpacity
        onPress={goToLoginOrRegister}
        activeOpacity={0.5}
        className="flex items-center justify-center w-full rounded-md bg-[#8257E5] py-2">
        <Text className="flex text-xl text-white font-Poppins-Medium">
          Iniciar
        </Text>
      </TouchableOpacity>
    </View>
  );
};
