import {z} from 'zod';
import {NavigationProp} from '@react-navigation/native';
import {ArrowLeft2} from 'iconsax-react-native';
import {useColorScheme} from 'nativewind';
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {BirthdayAndGenderForm} from './components';
import {editBirthdayAndGenderSchema} from '@/schemas/personData/personDataFormSchema';
import {SubmitHandler, useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import storage from '@/services/storage';
import {Person} from '@/services/api/get-account-by-auth-id';
import Toast from 'react-native-toast-message';
import {updatePerson} from '@/services/api/post-edit-person';
import {useState} from 'react';

interface BirthdayAndGenderProps {
  navigation: NavigationProp<RootTabParamList>;
}

export const BirthdayAndGender: React.FC<BirthdayAndGenderProps> = ({
  navigation,
}) => {
  type EditBirthdayAndGenderFormData = z.infer<
    typeof editBirthdayAndGenderSchema
  >;
  const {colorScheme} = useColorScheme();
  const person = storage.getPerson();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<EditBirthdayAndGenderFormData>({
    resolver: zodResolver(editBirthdayAndGenderSchema),
    defaultValues: {
      birthdate: person?.birthDate ? new Date(person.birthDate) : new Date(''),
      gender: person?.gender ? person.gender : 3,
    },
  });

  const onSubmit: SubmitHandler<EditBirthdayAndGenderFormData> = ({
    birthdate,
    gender,
  }) => {
    setIsLoading(true);
    const updatePersonData: Person = {...person!, birthDate: birthdate, gender};
    updatePerson(person!.id, {
      ...updatePersonData,
      cellphone: person!.cellPhone,
    })
      .then(() => {
        Toast.show({
          type: 'success',
          text1: 'Sucesso!',
          text2: 'Alteração realizada com sucesso!',
        });
        storage.savePerson(updatePersonData);
        navigation.navigate('PersonalData', {refresh: true});
        setIsLoading(false);
      })
      .catch(error => {
        console.log(error.response.data);
        setIsLoading(false);
        Toast.show({
          type: 'error',
          text1: 'Erro!',
          text2: 'Erro ao atualizar a as informações do usuario.',
        });
      });
  };

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
          <View className="flex flex-col space-y-5">
            <View className="flex flex-col space-y-1">
              <Text className="text-2xl font-semibold text-black dark:text-white">
                Dados Pessoais
              </Text>
              <Text className="text-sm font-normal text-justify text-black dark:text-white">
                Gerencie suas informações pessoais para garantir que estejam
                sempre corretas e atualizadas.
              </Text>
            </View>
            <View>
              <BirthdayAndGenderForm control={control} errors={errors} />
            </View>
          </View>
          <View>
            <TouchableOpacity
              onPress={handleSubmit(onSubmit)}
              disabled={isLoading}
              className="flex items-center justify-center py-3 bg-white rounded-md dark:bg-background-darkLight">
              {isLoading ? (
                <View className="py-1">
                  <ActivityIndicator size="small" color="#FFF" />
                </View>
              ) : (
                <Text className="text-base text-black dark:text-gray-200 font-Poppins-Medium">
                  Salvar
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
