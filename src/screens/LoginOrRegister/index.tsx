import {NavigationProp} from '@react-navigation/native';
import {ArrowLeft2} from 'iconsax-react-native';
import {useColorScheme} from 'nativewind';
import {useState} from 'react';
import {
  ActivityIndicator,
  Image,
  Linking,
  ScrollView,
  Text,
} from 'react-native';
import {TouchableOpacity, View} from 'react-native';
import {TextInputMask} from 'react-native-masked-text';
import {getVerificationCode} from '../../services/api/get-verification-code';

interface LoginOrRegisterProps {
  navigation: NavigationProp<RootTabParamList>;
}

export const LoginOrRegister: React.FC<LoginOrRegisterProps> = ({
  navigation,
}) => {
  const {colorScheme} = useColorScheme();
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  function handlePhoneChange(formatted: string) {
    setPhoneNumber(formatted);
  }

  function validateCellPhoneInSubmit() {
    const hex = /[^a-z0-9]/gi;
    const number = '+55' + phoneNumber.replace(hex, '');
    setIsLoading(true);
    getVerificationCode({To: number, Message: ''})
      .then(() => {
        goToOTPVerification(number);
        setIsLoading(false);
        setPhoneNumber('');
      })
      .catch(error => {
        setIsLoading(false);
        console.log(error);
      });
  }

  function goToOTPVerification(number: string) {
    navigation.navigate('OTPVerification', {phoneNumber: number});
  }

  function goToPrivacyPolicy() {
    Linking.openURL(`https://fm103.com.br/privacidade-e-seguranca/`);
  }

  return (
    <ScrollView className="bg-background-light dark:bg-background-dark">
      <View className="flex items-start justify-start p-5 space-y-5">
        <View className="flex flex-row items-center justify-start w-full">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ArrowLeft2
              size="18"
              color={colorScheme === 'dark' ? '#FFF' : '#000'}
              variant="Linear"
            />
          </TouchableOpacity>
        </View>
        <View className="flex flex-col justify-between w-full space-y-5">
          <View className="flex items-center justify-center">
            <Image
              className="w-48 h-48"
              source={require('../../assets/otpVerification.png')}
            />
          </View>
          <View className="flex flex-col items-center justify-center flex-1 space-y-5">
            <View className="flex flex-col items-center w-full space-y-2">
              <View className="flex flex-col items-center">
                <Text className="text-xl font-semibold text-center text-black dark:text-white">
                  Entre com o seu número de telefone
                </Text>
                <Text className="text-sm font-normal text-center text-black dark:text-white">
                  Iremos lhe encaminhar um código para realizar a validação do
                  seu usuário
                </Text>
              </View>
            </View>
            <View className="w-full">
              <TextInputMask
                type={'cel-phone'}
                options={{
                  maskType: 'BRL',
                  withDDD: true,
                  dddMask: '(99) ',
                }}
                value={phoneNumber}
                onChangeText={handlePhoneChange}
                placeholder="(XX) X XXXX-XXXX"
                keyboardType="phone-pad"
                className="px-3 text-xs text-black bg-white rounded-lg dark:text-white dark:bg-background-darkLight"
              />
            </View>
          </View>
          <View className="flex flex-col flex-1 space-y-5">
            <TouchableOpacity
              disabled={isLoading}
              onPress={validateCellPhoneInSubmit}
              activeOpacity={0.5}
              className={`flex items-center justify-center w-full rounded-md bg-base-primary py-2 ${
                isLoading && 'bg-base-primary/60'
              }`}>
              {isLoading ? (
                <View className="py-1">
                  <ActivityIndicator size="small" color="#FFF" />
                </View>
              ) : (
                <Text className="flex text-xl text-white font-Poppins-Medium">
                  Continuar
                </Text>
              )}
            </TouchableOpacity>
            <View className="flex flex-col items-center justify-center">
              <Text className="text-xs font-normal text-black dark:text-white">
                Ao continuar, eu concordo com os
              </Text>
              <TouchableOpacity onPress={goToPrivacyPolicy}>
                <Text className="text-xs font-bold text-black dark:text-base-primary">
                  Políticas de Privacidade
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
