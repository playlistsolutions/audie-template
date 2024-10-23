import {NavigationProp} from '@react-navigation/native';
import {ArrowLeft2, ArrowRight2} from 'iconsax-react-native';
import {useColorScheme} from 'nativewind';
import {Text, TouchableOpacity, View} from 'react-native';
import storage from '../../../services/storage';
import {format} from 'date-fns';
import {ptBR} from 'date-fns/locale';

interface PersonDataProps {
  navigation: NavigationProp<RootTabParamList>;
}

export const PersonalData: React.FC<PersonDataProps> = ({navigation}) => {
  const {colorScheme} = useColorScheme();
  const userInfo = storage.getUserInfo();
  const person = storage.getPerson();

  function goToContracInformation() {
    navigation.navigate('ContractInformation');
  }

  function goToBirthdayAndGender() {
    navigation.navigate('BirthdayAndGender');
  }

  function goToAddress() {
    navigation.navigate('Address');
  }

  function genderType(gender: number): string {
    switch (gender) {
      case 1:
        return 'Masculino';
      case 2:
        return 'Feminino';
      case 3:
        return 'Não informado';
      default:
        return 'Não informado';
    }
  }

  function handleBirthdate(birthDate: Date): string {
    return format(new Date(birthDate), "dd 'de' MMMM 'de' yyyy", {
      locale: ptBR,
    });
  }

  return (
    <View className="items-start justify-start min-h-screen p-5 bg-background-light dark:bg-background-dark">
      <View className="flex flex-row items-center justify-start w-full">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft2
            size="18"
            color={colorScheme === 'dark' ? '#FFF' : '#000'}
            variant="Linear"
          />
        </TouchableOpacity>
      </View>
      <View className="flex flex-col justify-start w-full mt-5">
        <View className="flex flex-col space-y-1">
          <Text className="text-2xl font-semibold text-black dark:text-white">
            Dados Pessoais
          </Text>
          <Text className="text-sm font-normal text-black dark:text-white">
            O 103 FM Aracaju utiliza essas informações para verificar sua
            identidade e criar relatórios visando aprimorar sua experiência com
            o aplicativo.
          </Text>
        </View>
        <View className="flex flex-col p-3 mt-5 space-y-3 bg-white rounded-lg dark:bg-background-darkLight">
          <TouchableOpacity
            onPress={goToContracInformation}
            className="flex flex-row items-center justify-between">
            <View className="flex flex-col">
              <Text className="text-sm font-medium text-black dark:text-white">
                Informações de contato
              </Text>
              <View>
                <Text className="text-sm font-normal text-neutral-500 dark:text-neutral-400">
                  {person?.email}
                </Text>
                <Text className="text-sm font-normal text-neutral-500 dark:text-neutral-400">
                  +55{userInfo?.extraData.phoneNumber}
                </Text>
              </View>
            </View>
            <View>
              <ArrowRight2
                size="18"
                color={colorScheme === 'dark' ? '#FFF' : '#000'}
                variant="Linear"
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={goToBirthdayAndGender}
            className="flex flex-row items-center justify-between">
            <View className="flex flex-col">
              <Text className="text-sm font-medium text-black dark:text-white">
                Data de nascimento e Gênero
              </Text>
              <View>
                <Text className="text-sm font-normal text-neutral-500 dark:text-neutral-400">
                  {handleBirthdate(person!.birthDate)}
                </Text>
                <Text className="text-sm font-normal text-neutral-500 dark:text-neutral-400">
                  {genderType(userInfo!.extraData.gender)}
                </Text>
              </View>
            </View>
            <View>
              <ArrowRight2
                size="18"
                color={colorScheme === 'dark' ? '#FFF' : '#000'}
                variant="Linear"
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={goToAddress}
            className="flex flex-row items-center justify-between">
            <View className="flex flex-col">
              <Text className="text-sm font-medium text-black dark:text-white">
                Endereço
              </Text>
              {person?.addresses.length! > 0 && (
                <View>
                  <Text className="text-sm font-normal text-neutral-500 dark:text-neutral-400">
                    {person?.addresses[0].city} - {person?.addresses[0].state}
                  </Text>
                  <Text className="text-sm font-normal text-neutral-500 dark:text-neutral-400">
                    {person?.addresses[0].street} N°
                    {person?.addresses[0].number} -{' '}
                    {person?.addresses[0].complement}
                  </Text>
                </View>
              )}
            </View>
            <View>
              <ArrowRight2
                size="18"
                color={colorScheme === 'dark' ? '#FFF' : '#000'}
                variant="Linear"
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
