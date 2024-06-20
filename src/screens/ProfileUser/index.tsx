import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {
  ArrowRight2,
  InfoCircle,
  MedalStar,
  Moon,
  Profile2User,
  Sun1,
  UserSquare,
} from 'iconsax-react-native';
import {useColorScheme} from 'nativewind';
import {useEffect, useState} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import storage from '../../services/storage';
import {DarkModeModal} from './components';
import {RouteProp} from '@react-navigation/native';
import {getAccountByAuthId} from '../../services/api/get-account-by-auth-id';
import Toast from 'react-native-toast-message';

interface ProfileUserScreenProps {
  navigation: BottomTabNavigationProp<RootTabParamList, 'ProfileUser'>;
  route: RouteProp<RootTabParamList, 'ProfileUser'>;
}

export const ProfileUser: React.FC<ProfileUserScreenProps> = ({
  navigation,
  route,
}) => {
  const {colorScheme} = useColorScheme();

  const [isDarkModeModal, setDarkModeModal] = useState<boolean>(false);
  const [currentDarkMode, setCurrentDarkMode] = useState<string>(colorScheme);
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const refreshData = () => setIsLogged(userInfo ? true : false);

  const theme = storage.getDarkMode();
  const userInfo = storage.getUserInfo();

  useEffect(() => {
    setCurrentDarkMode(theme ? theme : 'system');
  }, [theme]);

  useEffect(() => {
    if (route.params?.refresh || userInfo) {
      void refreshData();
    }
    if (userInfo) {
      AccountByAuthId(userInfo.id.toString());
    }
  }, [route.params, userInfo]);

  function AccountByAuthId(Id: string) {
    getAccountByAuthId(Id)
      .then(({person, socialAccount}) => {
        storage.saveUserInfo(socialAccount);
        storage.savePerson(person);
      })
      .catch(error => {
        console.log(error);
        Toast.show({
          type: 'error',
          text1: 'Erro!',
          text2: 'Erro ao solicitar dados do usuario.',
        });
      });
  }

  function goToPersonalData() {
    navigation.navigate('PersonalData');
  }

  function goToManageLevel() {
    navigation.navigate('ManageLevel');
  }

  function goToSocialMedia() {
    navigation.navigate('SocialMedia');
  }

  function goToAbout() {
    navigation.navigate('About');
  }

  function goToWelcome() {
    navigation.navigate('WelcomeScreen');
  }

  function handlerDarkModeModal() {
    setDarkModeModal(!isDarkModeModal);
  }

  function signOut() {
    setIsLogged(false);
    storage.removeUserInfo();
    storage.removePerson();
    navigation.navigate('Home');
  }

  return (
    <View className="items-center justify-start min-h-screen bg-background-light dark:bg-background-dark">
      <View className="px-5 py-3">
        <Text className="text-lg font-semibold text-black dark:text-white">
          Configurações do usuário
        </Text>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="flex flex-col w-full p-5 space-y-3">
        <View className="flex flex-col justify-start space-y-5 mb-72">
          <View>
            <Text className="text-base font-bold text-black dark:text-white">
              Configurações da conta
            </Text>
            <View className="flex flex-col space-y-5">
              {isLogged && (
                <TouchableOpacity
                  onPress={goToPersonalData}
                  className="flex flex-row items-center justify-between mt-5">
                  <View className="flex flex-row items-center gap-x-2">
                    <UserSquare
                      size="24"
                      color={colorScheme === 'dark' ? '#FFF' : '#000'}
                    />
                    <Text className="font-medium text-black dark:text-white">
                      Dados Pessoais
                    </Text>
                  </View>
                  <ArrowRight2
                    size="18"
                    color={colorScheme === 'dark' ? '#FFF' : '#000'}
                    variant="Linear"
                  />
                </TouchableOpacity>
              )}
              {isLogged && (
                <TouchableOpacity
                  onPress={goToManageLevel}
                  className="flex flex-row items-center justify-between mt-3">
                  <View className="flex flex-row items-center gap-x-2">
                    <MedalStar
                      size="24"
                      color={colorScheme === 'dark' ? '#FFF' : '#000'}
                    />
                    <Text className="font-medium text-black dark:text-white">
                      Gerenciar Level
                    </Text>
                  </View>
                  <ArrowRight2
                    size="18"
                    color={colorScheme === 'dark' ? '#FFF' : '#000'}
                    variant="Linear"
                  />
                </TouchableOpacity>
              )}
              <TouchableOpacity
                onPress={handlerDarkModeModal}
                className="flex flex-row items-center justify-between mt-5">
                <View className="flex flex-row items-center gap-x-2">
                  {colorScheme === 'dark' ? (
                    <Moon
                      size="24"
                      color={colorScheme === 'dark' ? '#FFF' : '#000'}
                    />
                  ) : (
                    <Sun1
                      size="24"
                      color={colorScheme === 'light' ? '#000' : '#FFF'}
                    />
                  )}
                  <Text className="font-medium text-black dark:text-white">
                    Dark Mode
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
          <View>
            <Text className="text-base font-bold text-black dark:text-white">
              Mais Informações e Suporte
            </Text>
            <View className="flex flex-col space-y-5">
              <TouchableOpacity
                onPress={goToSocialMedia}
                className="flex flex-row items-center justify-between mt-5">
                <View className="flex flex-row items-center gap-x-2">
                  <Profile2User
                    size="24"
                    color={colorScheme === 'dark' ? '#FFF' : '#000'}
                  />
                  <Text className="font-medium text-black dark:text-white">
                    Redes Sociais
                  </Text>
                </View>
                <ArrowRight2
                  size="18"
                  color={colorScheme === 'dark' ? '#FFF' : '#000'}
                  variant="Linear"
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={goToAbout}
                className="flex flex-row items-center justify-between mt-5">
                <View className="flex flex-row items-center gap-x-2">
                  <InfoCircle
                    size="24"
                    color={colorScheme === 'dark' ? '#FFF' : '#000'}
                  />
                  <Text className="font-medium text-black dark:text-white">
                    Sobre
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
          <View>
            <Text className="text-base font-bold text-black dark:text-white">
              Conta
            </Text>
            {isLogged ? (
              <View className="flex flex-col space-y-5">
                <TouchableOpacity
                  onPress={signOut}
                  className="flex flex-row items-center justify-between mt-5">
                  <Text className="text-sm font-semibold text-red-600">
                    Sair
                  </Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View className="mt-3">
                <TouchableOpacity
                  onPress={goToWelcome}
                  className="flex items-center justify-center py-3 bg-white rounded-md dark:bg-background-darkLight">
                  <Text className="text-base text-black dark:text-gray-200 font-Poppins-Medium">
                    Login
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
      <DarkModeModal
        onDarkModeModal={handlerDarkModeModal}
        isDarkModeModal={isDarkModeModal}
        currentDarkMode={currentDarkMode}
        setCurrentDarkMode={setCurrentDarkMode}
      />
    </View>
  );
};
