import { z } from 'zod';
import { NavigationProp } from '@react-navigation/native';
import { ArrowLeft2 } from 'iconsax-react-native';
import { useColorScheme } from 'nativewind';
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { editPersonFormSchema } from '../../../../schemas/personData/personDataFormSchema';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ContactInformationForm } from './components';
import storage from '../../../../services/storage';
import { updatePerson } from '../../../../services/api/post-edit-person';
import Toast from 'react-native-toast-message';
import { Person } from '../../../../services/api/get-account-by-auth-id';
import { useState } from 'react';

interface ContracInformationProps {
  navigation: NavigationProp<RootTabParamList>;
}

export const ContracInformation: React.FC<ContracInformationProps> = ({
  navigation,
}) => {
  type EditPersonFormData = z.infer<typeof editPersonFormSchema>;
  const { colorScheme } = useColorScheme();
  const person = storage.getPerson();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<EditPersonFormData>({
    resolver: zodResolver(editPersonFormSchema),
    defaultValues: {
      name: person?.name ? person?.name : '',
      cellphone: person?.cellPhone ? person?.cellPhone : '',
      cpf: person?.nationalRegister ? person?.nationalRegister : '',
      email: person?.email ? person?.email : '',
      rg: person?.stateRegister ? person?.stateRegister : '',
    },
  });

  const onSubmit: SubmitHandler<EditPersonFormData> = ({
    name,
    email,
    cellphone,
    cpf,
    rg,
  }) => {
    setIsLoading(true);
    const { birthDate, gender } = person!
    const updatePersonData: Person = { ...person! };
    updatePerson(person!.id, { ...updatePersonData, cellphone, name, email, nationalRegister: cpf, stateRegister: rg, birthDate: birthDate ? new Date(birthDate) : new Date(), gender: gender ? gender : 3 })
      .then(() => {
        Toast.show({
          type: 'success',
          text1: 'Sucesso!',
          text2: 'Alteração realizada com sucesso!',
        });
        const person = storage.getPerson();
        const updatedPerson = {
          ...person,
          name,
          nationalRegister: cpf,
          stateRegister: rg,
          email,
        };
        storage.savePerson(updatedPerson as Person);
        navigation.navigate('PersonalData', { refresh: true });
        setIsLoading(false);
      })
      .catch(error => {
        setIsLoading(false);
        console.log(error);
        Toast.show({
          type: 'error',
          text1: 'Erro!',
          text2: 'Erro ao atualizar a as informações do usuario.',
        });
      });
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      className="bg-background-light dark:bg-background-dark">
      <View className="flex items-start justify-start p-5 space-y-5">
        <View className="flex flex-row items-center justify-start w-full mt-3">
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
                Informações de contato
              </Text>
              <Text className="text-sm font-normal text-justify text-black dark:text-white">
                Gerencie suas informações de contato para garantir que estejam
                sempre corretas e atualizadas.
              </Text>
            </View>
            <ContactInformationForm control={control} errors={errors} />
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
