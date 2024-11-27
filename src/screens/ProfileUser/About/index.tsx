import { NavigationProp } from '@react-navigation/native';
import { ArrowLeft2, ArrowRight2, UserSquare } from 'iconsax-react-native';
import { useColorScheme } from 'nativewind';
import { Linking, Text, TouchableOpacity, View } from 'react-native';

interface AboutProps {
  navigation: NavigationProp<RootTabParamList>;
}

export const About: React.FC<AboutProps> = ({ navigation }) => {
  const { colorScheme } = useColorScheme();

  function goToPrivacyPolicy() {
    Linking.openURL(`https://playlistsolutions.com/pt/privacy/`);
  }

  return (
    <View className="items-start justify-start min-h-screen p-5 bg-background-light dark:bg-background-dark">
      <View className="flex flex-row items-center justify-start w-full mt-3">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft2
            size="18"
            color={colorScheme === 'dark' ? '#FFF' : '#000'}
            variant="Linear"
          />
        </TouchableOpacity>
      </View>
      <View className="flex flex-col justify-start w-full mt-5 space-y-5">
        <View className="flex flex-col space-y-1">
          <Text className="text-2xl font-semibold text-black dark:text-white">
            Sobre
          </Text>
          <View className="flex flex-col space-y-5">
            <TouchableOpacity
              onPress={goToPrivacyPolicy}
              className="flex flex-row items-center justify-between mt-5">
              <View className="flex flex-row items-center gap-x-2">
                <Text className="font-medium text-black dark:text-white">
                  Políticas de Privacidade
                </Text>
              </View>
              <ArrowRight2
                size="18"
                color={colorScheme === 'dark' ? '#FFF' : '#000'}
                variant="Linear"
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};
