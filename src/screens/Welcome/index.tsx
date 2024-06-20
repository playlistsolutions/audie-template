import {NavigationProp} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import storage from '../../services/storage';

interface WelcomeProps {
  navigation: NavigationProp<RootTabParamList>;
}

export const Welcome: React.FC<WelcomeProps> = ({navigation}) => {
  const userInfo = storage.getUserInfo();

  function goToLoginOrRegister() {
    navigation.navigate('LoginOrRegister');
  }

  if (userInfo) {
    navigation.navigate('MainScreen');
  }

  return (
    <View className="items-center justify-between min-h-screen px-5 py-10 bg-background-light dark:bg-background-dark">
      <View />
      <Image
        className="w-80 h-80"
        source={require('../../assets/illustration.png')}
      />
      <View className="flex flex-col w-full space-y-10">
        <View className="flex flex-col items-center justify-center">
          <Text className="flex text-lg text-black dark:text-white font-Poppins-Medium">
            Bem-Vindo ao Playlist News
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
    </View>
  );
};
