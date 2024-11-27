import { NavigationProp } from '@react-navigation/native';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import storage from '../../services/storage';
import { ArrowLeft2 } from 'iconsax-react-native';
import { useColorScheme } from 'nativewind';

interface WelcomeProps {
  navigation: NavigationProp<RootTabParamList>;
}

export const Welcome: React.FC<WelcomeProps> = ({ navigation }) => {
  const userInfo = storage.getUserInfo();
  const { colorScheme } = useColorScheme();

  function goToLoginOrRegister() {
    navigation.navigate('LoginOrRegister');
  }

  if (userInfo) {
    navigation.navigate('MainScreen');
  }

  return (
    <View className="flex flex-col items-center justify-around flex-1 p-5 space-y-5 dark:bg-background-dark">
      <View className="flex flex-row items-center justify-start w-full mt-3">
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <ArrowLeft2
            size="18"
            color={colorScheme === 'dark' ? '#FFF' : '#000'}
            variant="Linear"
          />
        </TouchableOpacity>
      </View>
      <Image
        className="h-[50%] w-[100%]"
        source={require('../../assets/illustration.png')}
      />
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
        className="flex items-center justify-center w-full py-2 rounded-md bg-base-primary">
        <Text className="flex text-xl text-white font-Poppins-Medium">
          Iniciar
        </Text>
      </TouchableOpacity>
    </View>
  );
};
