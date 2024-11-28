import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {useColorScheme} from 'nativewind';
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {RegisterUserForm} from './components';
import {z} from 'zod';
import {registerFormSchema} from '../../schemas/registerUser/registerUserFormSchema';
import {SubmitHandler, useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {postAccountInfo} from '../../services/api/post-account-info';
import {RouteProp} from '@react-navigation/native';
import storage from '../../services/storage';
import {useState} from 'react';

interface RegisterUserProps {
  navigation: BottomTabNavigationProp<RootTabParamList, 'RegisterUser'>;
  route: RouteProp<RootTabParamList, 'RegisterUser'>;
}

export const RegisterUser: React.FC<RegisterUserProps> = ({
  navigation,
  route,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {phoneNumber} = route.params;
  type RegisterUserFormData = z.infer<typeof registerFormSchema>;

  const {control,handleSubmit,formState: {errors}, } = useForm<RegisterUserFormData>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      cellphone: phoneNumber.slice(3, 14),
      birthdate: new Date(),
    },
  });

  const onSubmit: SubmitHandler<RegisterUserFormData> = ({
    name,
    email,
    cellphone,
    birthdate,
    gender,
  }) => {
    setIsLoading(true);
    var postData = {
      provider: 'Phone',
      displayName: name,
      gender: gender,
      birthDate: birthdate,
      password: 'SEMSENHAAQUI',
      uid: null,
      userId: email,
      lastLogin: null,
      dateJoined: null,
      ExtraData: {
        name: name,
        email,
        phoneNumber: cellphone,
        uid: null,
      },
    };
    postAccountInfo(postData)
      .then(({socialAccount, person}) => {
        storage.saveUserInfo(socialAccount);
        storage.savePerson(person);
        navigation.navigate('ProfileUser', {refresh: true});
        setIsLoading(false);
      })
      .catch(error => {
        setIsLoading(false);
        console.log(error.response.data);
      });
  };

  return (
    <ScrollView className="bg-background-light dark:bg-background-dark">
      <View className="flex items-start justify-start p-5 space-y-5">
        <View className="flex flex-col justify-between w-full space-y-5">
          <View className="flex flex-col space-y-5">
            <View className="flex flex-col space-y-1">
              <Text className="text-2xl font-semibold text-black dark:text-white">
                Registro
              </Text>
              <Text className="text-sm font-normal text-left text-black dark:text-white">
                Faça o registro do seu usuario para ter acesso a todas as
                funcionalidades da nossa aplicação.
              </Text>
            </View>
            <View>
              <RegisterUserForm
                control={control}
                errors={errors}
                phoneNumber={phoneNumber}
              />
            </View>
            <View>
              <TouchableOpacity
                disabled={isLoading}
                onPress={handleSubmit(onSubmit)}
                className="flex items-center justify-center py-3 bg-white rounded-md dark:bg-background-darkLight">
                {isLoading ? (
                  <View className="py-1">
                    <ActivityIndicator size="small" color="#FFF" />
                  </View>
                ) : (
                  <Text className="text-base text-black dark:text-gray-200 font-Poppins-Medium">
                    Registrar
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
