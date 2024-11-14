import { NavigationProp, RouteProp } from '@react-navigation/native';
import { ArrowLeft2 } from 'iconsax-react-native';
import { useColorScheme } from 'nativewind';
import { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  PostVerifyCodePayload,
  verifyCode,
} from '../../services/api/verify-code';
import { getAccountByAuthId, Person, SocialAccount } from '../../services/api/get-account-by-auth-id';
import storage from '../../services/storage';
import Toast from 'react-native-toast-message';
import { postActiveUser } from '@/services/api/post-active-user';

interface OTPVerificationProps {
  navigation: NavigationProp<RootTabParamList>;
  route: RouteProp<RootTabParamList, 'OTPVerification'>;
}

export const OTPVerification: React.FC<OTPVerificationProps> = ({ navigation, route }) => {
  const { colorScheme } = useColorScheme();
  const [OTP, setOTP] = useState<string[]>(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const inputs = useRef<TextInput[]>([]);
  const { phoneNumber } = route.params;

  function validateCode() {
    var Code = OTP.join('');
    setIsLoading(true);
    var Payload: PostVerifyCodePayload = {
      To: phoneNumber,
      Code,
      Valid: true,
    };
    verifyCode(Payload)
      .then((response) => {
        setIsError(false);
        AccountByAuthId(response);
      })
      .catch(error => {
        setIsError(true);
        setIsLoading(false);
        console.log(error);
        Toast.show({
          type: 'error',
          text1: 'Erro ao válidar código SMS',
          text2: 'Verifique se o código está correto ou o solicite novamente',
        });
      });
  }

  function AccountByAuthId(Id: string) {
    getAccountByAuthId(Id)
      .then(({ person }) => {
        setIsLoading(false);
        const saveSocialAccount = {
          id: person.id,
          extraData: { phoneNumber: person.cellPhone }
        }
        storage.saveUserInfo(saveSocialAccount as SocialAccount);
        storage.savePerson(person);
        goToHome();
        setOTP(['', '', '', '', '', '']);
      })
      .catch(error => {
        setOTP(['', '', '', '', '', '']);
        if (error.request.status == 404) {
          setIsLoading(false);
          setIsError(false);
          if (error.response.data.codeError === 'userInactive') {
            Toast.show({
              type: 'warning',
              text1: 'Usuario Desativado',
              text2: 'Seu usuário foi desativado, reativando usuario..',
            });
            postActiveUser(Id)
              .then(() => {
                return AccountByAuthId(Id)
              })
              .catch((error) => {
                console.log(error)
                setOTP(['', '', '', '', '', '']);
                setIsLoading(false);
                setIsError(false);
              })
          } else if (error.response.data.codeError === 'registerNotFound') {
            navigation.navigate('RegisterUser', { phoneNumber });
          }
        } else {
          setIsLoading(false);
          Toast.show({
            type: 'error',
            text1: 'Erro interno',
            text2: 'Ocorreu um problema, tente novamente mais tarde.',
          });
        }
      });
  }

  function goToHome() {
    navigation.navigate('ProfileUser', { refresh: true });
  }

  function selectInput(index: number) {
    inputs.current[index].focus();
  }

  function handleInput(value: string, index: number) {
    setIsError(false);
    const newOTP = [...OTP];
    newOTP[index] = value;
    setOTP(newOTP);

    if (value !== '' && index < 5) {
      inputs.current[index + 1].focus();
    }
    if (value == '' && index != 0) {
      inputs.current[index - 1].focus();
    }
  }

  return (
    <ScrollView className="bg-background-light dark:bg-background-dark">
      <View className="flex items-start justify-start p-5 space-y-10">
        <View className="flex flex-col items-start w-full space-y-5">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ArrowLeft2
              size="18"
              color={colorScheme === 'dark' ? '#FFF' : '#000'}
              variant="Linear"
            />
          </TouchableOpacity>
          <View className="flex flex-col space-y-1">
            <Text className="text-2xl font-semibold text-black dark:text-white">
              Validação do OTP
            </Text>
            <Text className="text-sm font-normal text-justify text-black dark:text-white">
              Informe o código enviado para o número com o final
            </Text>
            <Text className="flex font-semibold text-black dark:text-white">
              +{phoneNumber.slice(1, 3)} ******-{phoneNumber.slice(10, 14)}
            </Text>
          </View>
        </View>
        <View className="flex flex-col items-stretch justify-around flex-1 w-full">
          <View className="flex flex-row items-center justify-between">
            {[0, 1, 2, 3, 4, 5].map(index => (
              <TextInput
                maxLength={1}
                key={index}
                ref={ref => ref != null && (inputs.current[index] = ref)}
                onFocus={() => selectInput(index)}
                value={OTP[index]}
                onChangeText={value => handleInput(value, index)}
                keyboardType="number-pad"
                className={`flex items-center h-12 justify-center w-12 text-center text-white transition-colors ease-in rounded-lg bg-background-darkLight focus:border-2 focus:border-neutral-300 ${isError && 'border-2 border-red-500'
                  }`}
              />
            ))}
          </View>
        </View>
        <TouchableOpacity
          onPress={() => validateCode()}
          activeOpacity={0.5}
          disabled={isLoading}
          className={`flex items-center justify-center w-full rounded-md bg-base-primary py-2 ${isLoading && 'bg-base-primary/60'}`}>
          {isLoading ? (
            <View className="py-1">
              <ActivityIndicator size="small" color="#FFF" />
            </View>
          ) : (
            <Text className="flex text-xl text-white font-Poppins-Medium">
              Validar
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};
