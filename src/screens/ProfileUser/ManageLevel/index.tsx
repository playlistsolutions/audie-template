import {GetLevelResponse, getLevel} from '@/services/api/get-level';
import storage from '@/services/storage';
import {NavigationProp} from '@react-navigation/native';
import {AddCircle, ArrowLeft2, TickCircle} from 'iconsax-react-native';
import {useColorScheme} from 'nativewind';
import {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Toast from 'react-native-toast-message';

interface ManageLevelProps {
  navigation: NavigationProp<RootTabParamList>;
}

export const ManageLevel: React.FC<ManageLevelProps> = ({navigation}) => {
  const person = storage.getPerson();
  const {colorScheme} = useColorScheme();
  const [criteriaMet, setCriteriaMet] = useState<string[]>([]);
  const [maxLevel, setMaxLevel] = useState<boolean>(false);
  const [criteria, setCriteria] = useState<string[]>([]);
  const [data, setData] = useState<GetLevelResponse>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const criteriaFields = {
    cpf: 'CPF',
    number: 'Celular',
    rg: 'RG',
    address: 'Endereço Completo',
    socialMedia: 'Rede Sociais',
    contact: 'Contato do Ouvinte',
    birthdate: 'Data de Nacimento',
  };

  function handleImage(image: string | undefined) {
    const baseURL = 'https://app-aires-studio.s3.amazonaws.com/media/image/';
    return baseURL + image;
  }

  useEffect(() => {
    if (person) {
      setIsLoading(true);
      getLevel(person?.id)
        .then(response => {
          setData(response);
          handleLevel(response);
          setIsLoading(false);
        })
        .catch(error => {
          console.log(error);
          Toast.show({
            type: 'error',
            text1: 'Erro ao buscar level!',
            text2: 'Ocorreu um erro ao solicitar o seu level, tente novamente!',
          });
          setIsLoading(true);
        });
    }
    checkCriteria();
  }, []);

  function handleLevel(data: GetLevelResponse) {
    if (data.nextPromotionCriteria == 0) {
      setMaxLevel(true);
    }

    // @ts-ignore: Unreachable code error
    setCriteria(
      Object.keys(data?.nextPromotionCriteria).filter(item => {
        // @ts-ignore: Unreachable code error
        return data.nextPromotionCriteria[item] === true;
      }),
    );
  }

  function checkCriteria() {
    const {
      nationalRegister,
      cellPhone,
      stateRegister,
      addresses,
      socialMedia,
      contacts,
      birthDate,
    } = person!;
    const updateCriteriaMet = [...criteriaMet];

    if (nationalRegister != '' && nationalRegister != null) {
      updateCriteriaMet.push('cpf');
    }

    if (cellPhone != null) {
      updateCriteriaMet.push('number');
    }

    if (stateRegister != '' && stateRegister != null) {
      updateCriteriaMet.push('rg');
    }

    if (addresses.length != 0 && addresses != null) {
      updateCriteriaMet.push('address');
    }

    if (socialMedia.length != 0 && socialMedia != null) {
      updateCriteriaMet.push('socialMedia');
    }

    if (contacts.length != 0 && contacts != null) {
      updateCriteriaMet.push('contact');
    }

    if (birthDate != null) {
      updateCriteriaMet.push('birthdate');
    }

    setCriteriaMet(updateCriteriaMet);
  }

  function checkCriteriaMet() {
    let count = 0;
    for (const value of criteriaMet) {
      if (criteria.includes(value)) {
        count++;
      }
    }
    return count;
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
      <View className="flex flex-col justify-start w-full mt-5 space-y-5">
        <View className="flex flex-col space-y-1">
          <Text className="text-2xl font-semibold text-black dark:text-white">
            Gerenciar Level
          </Text>
        </View>
        <View className="flex flex-row">
          <View className="flex items-center justify-center flex-1 space-y-3">
            <View className="flex">
              {isLoading ? (
                <ActivityIndicator
                  size="large"
                  color="#FFF"
                  className="w-32 h-32"
                />
              ) : (
                <Image
                  className="flex w-32 h-32"
                  source={{
                    uri: `${handleImage(data?.currentLevel.levelImage)}`,
                  }}
                />
              )}
            </View>
            {!maxLevel && (
              <View>
                <Text className="text-sm font-semibold text-center text-black dark:text-white">
                  {checkCriteriaMet()} de {criteria.length} criterios atingidos
                  para o próximo nivel.
                </Text>
              </View>
            )}
          </View>
          <View className="flex flex-col items-center justify-center flex-1 space-y-2">
            {isLoading ? (
              <View className="py-1">
                <ActivityIndicator size="large" color="#FFF" />
              </View>
            ) : (
              <Text className="text-2xl font-extrabold text-black dark:text-white">
                {data?.currentLevel.levelName}
              </Text>
            )}
            {!maxLevel && (
              <Text className="text-sm font-semibold text-center text-black dark:text-white">
                É necessário completar mais{' '}
                {criteria.length - checkCriteriaMet()} criterios para subir de
                nível.
              </Text>
            )}
          </View>
        </View>
        {!maxLevel ? (
          <View className="flex flex-col">
            <View className="p-3 space-y-3 bg-white rounded-t-lg dark:bg-background-darkLight">
              <Text className="text-lg font-semibold text-black dark:text-white">
                Críterios
              </Text>
            </View>
            <View className="flex flex-col p-3 space-y-3 bg-white rounded-b-lg dark:bg-background-dark2">
              {isLoading ? (
                <View className="py-1">
                  <ActivityIndicator
                    size="large"
                    color="#FFF"
                    className="flex items-center justify-center w-full h-32"
                  />
                </View>
              ) : (
                <FlatList
                  data={criteria}
                  keyExtractor={item => item}
                  renderItem={({item}) => {
                    return (
                      <View className="flex flex-row items-center my-0.5 space-x-2">
                        {criteriaMet.includes(item) ? (
                          <TickCircle size="28" className="text-success-base" />
                        ) : (
                          <AddCircle
                            size="28"
                            className="rotate-45 text-danger-base"
                          />
                        )}
                        <View>
                          <Text className="text-sm font-semibold text-black dark:text-white">
                            {criteriaFields[item]}
                          </Text>
                        </View>
                      </View>
                    );
                  }}
                />
              )}
            </View>
          </View>
        ) : (
          <View className="flex flex-col">
            <View className="p-3 space-y-3 bg-white rounded-t-lg dark:bg-background-darkLight">
              <Text className="text-lg font-semibold text-black dark:text-white">
                Críterios
              </Text>
            </View>
            <View className="flex flex-col p-3 space-y-3 bg-white rounded-b-lg dark:bg-background-dark2">
              <View className="flex flex-row items-center justify-center space-x-2">
                <Text className="text-sm font-semibold text-center text-black dark:text-white">
                  Todos os críterios atingidos com sucesso!
                </Text>
              </View>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};
