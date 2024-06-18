import {NavigationProp, RouteProp} from '@react-navigation/native';
import {ArrowCircleLeft, TicketDiscount} from 'iconsax-react-native';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {format} from 'date-fns';
import HTMLView from 'react-native-htmlview';
import storage from '@/services/storage';
import {
  GetParticipantResponse,
  getParticipant,
  useParticipants,
} from '@/services/api/get-participants-by-id';
import {useEffect, useState} from 'react';
import {postParticipant} from '@/services/api/post-participant';
import {useColorScheme} from 'nativewind';

interface SheetPromotionProps {
  navigation: NavigationProp<RootTabParamList>;
  route: RouteProp<RootTabParamList, 'SheetPromotion'>;
}

export const SheetPromotion: React.FC<SheetPromotionProps> = ({
  navigation,
  route,
}) => {
  const {colorScheme} = useColorScheme();
  const [isParticipant, setIsParticipant] = useState<boolean>(false);
  const [infoParticipant, setInfoParticipant] =
    useState<GetParticipantResponse>();
  const person = storage.getPerson();
  const {
    imageUrl,
    title,
    endDate,
    description,
    id: promotionId,
  } = route.params.promotiom;
  const {data, isFetching} = useParticipants(promotionId.toString());

  useEffect(() => {
    getParticipant(promotionId.toString());
    if (data) {
      data.filter(item => {
        if (item.personId == person?.id && item.promotionId == promotionId) {
          setIsParticipant(true);
          setInfoParticipant(item);
        }
      });
    }
  }, [data, promotionId]);

  function goBack() {
    navigation.goBack();
  }

  function goToWelcome() {
    navigation.navigate('WelcomeScreen');
  }

  function postPromotion() {
    const payload = {
      isActive: true,
      personId: person!.id,
      promotionId,
    };
    postParticipant(payload)
      .then(response => {
        setIsParticipant(true);
        setInfoParticipant(response);
      })
      .catch(error => {
        console.log(error);
      });
  }

  return (
    <View className="flex flex-col flex-1 p-2 dark:bg-background-dark">
      <View className="relative w-full overflow-hidden h-2/5 rounded-xl">
        <View className="absolute z-10 p-3">
          <TouchableOpacity onPress={goBack}>
            <ArrowCircleLeft size="45" color="#FFFF" variant="Bulk" />
          </TouchableOpacity>
        </View>
        <Image
          className="object-cover w-full h-full"
          source={{uri: imageUrl}}
        />
        <View className="absolute bottom-0 flex flex-col items-start px-4 py-4 gap-y-3">
          <View className="flex flex-row items-center pr-4 gap-x-2">
            <View className="h-10 p-0.5 bg-white rounded-full" />
            <Text
              numberOfLines={2}
              className="text-base text-white font-Poppins-Medium">
              {title}
            </Text>
          </View>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="p-2">
          <View className="flex flex-col w-full space-y-2">
            <View className="flex flex-row items-center justify-end">
              <Text className="font-Poppins-Regular text-[10px] text-gray-300">
                Data do sorteio {format(new Date(endDate), 'dd/MM/yyyy')}
              </Text>
            </View>
            <HTMLView
              textComponentProps={{
                style: {color: colorScheme === 'dark' ? '#FFF' : '#000'},
              }}
              value={description}
            />
          </View>
        </View>
      </ScrollView>
      {isFetching ? (
        <View>
          <TouchableOpacity className="flex items-center justify-center py-3 bg-white rounded-md dark:bg-background-darkLight">
            <ActivityIndicator size="small" color="#FFF" />
          </TouchableOpacity>
        </View>
      ) : (
        <View className="flex px-2 py-5">
          {!person && (
            <View>
              <TouchableOpacity
                onPress={goToWelcome}
                className="flex items-center justify-center py-3 bg-white rounded-md dark:bg-background-darkLight">
                <Text className="text-base text-black dark:text-gray-200 font-Poppins-Medium">
                  Realizar Login
                </Text>
              </TouchableOpacity>
            </View>
          )}
          {person &&
            (!isParticipant ? (
              <View>
                <TouchableOpacity
                  onPress={postPromotion}
                  className="flex items-center justify-center py-3 bg-white rounded-md dark:bg-background-darkLight">
                  <Text className="text-base text-black dark:text-gray-200 font-Poppins-Medium">
                    Participar da Promoção
                  </Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View className="flex flex-row items-center">
                <View className="flex flex-col w-[70%]">
                  <View className="p-4 bg-[#8257E5] rounded-tl-lg">
                    <Text className="text-xs text-white font-Poppins-SemiBold">
                      Ticket da Promoção
                    </Text>
                  </View>
                  <View className="p-4 bg-white rounded-bl-lg dark:bg-background-darkLight">
                    <View className="flex flex-col">
                      <View className="flex flex-col">
                        <Text className="font-Poppins-Light text-[11px] text-gray-900 dark:text-gray-400">
                          Promoção
                        </Text>
                        <Text
                          numberOfLines={1}
                          className="font-Poppins-Medium text-[11px] text-gray-600 dark:text-gray-100">
                          {title}
                        </Text>
                      </View>
                      <View className="flex flex-col">
                        <Text className="font-Poppins-Light text-[11px] text-gray-900 dark:text-gray-400">
                          Nome
                        </Text>
                        <Text className="font-Poppins-Medium text-[11px] text-gray-600 dark:text-gray-100">
                          {person?.name}
                        </Text>
                      </View>
                      <View className="flex flex-col">
                        <Text className="font-Poppins-Light text-[11px] text-gray-900 dark:text-gray-400">
                          Data do Sorteio
                        </Text>
                        <Text className="font-Poppins-Medium text-[11px] text-gray-600 dark:text-gray-100">
                          {format(new Date(endDate), 'dd/MM/yyyy')}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
                <View className="flex flex-col w-[30%] h-full border-l-2 border-dashed border-black dark:border-white">
                  <View className="flex py-2 justify-center items-center bg-[#8257E5] rounded-tr-lg">
                    <TicketDiscount size="35" color="#FFFF" variant="Outline" />
                  </View>
                  <View className="flex flex-col items-center justify-center flex-1 p-4 bg-white rounded-br-lg dark:bg-background-darkLight">
                    <Text
                      numberOfLines={1}
                      className="text-xl text-center text-black font-Poppins-SemiBold dark:text-white">
                      #{infoParticipant?.id}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
        </View>
      )}
    </View>
  );
};
