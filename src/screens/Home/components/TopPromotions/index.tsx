import {NavigationProp} from '@react-navigation/native';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Swiper from 'react-native-swiper';
import {usePromotions} from '../../../../services/api/get-promotions';
import {isBefore, isEqual} from 'date-fns';

interface TopPromotionsProps {
  navigation: NavigationProp<RootTabParamList>;
}

export const TopPromotions: React.FC<TopPromotionsProps> = ({navigation}) => {
  const {data, isFetching} = usePromotions();

  const promotions = data.filter(item => {
    const endDate = new Date(item.endDate);
    const today = new Date();
    const promotionFinished =
      isBefore(endDate, today) || isEqual(endDate, today);
    if (item.isAd != true && promotionFinished == false) {
      return item;
    }
  });

  function goToSheetPromotion(promotiom: Promotiom) {
    navigation.navigate('SheetPromotion', {
      promotiom,
    });
  }

  return (
    <View className="flex flex-col gap-y-3">
      <View className="flex flex-row items-center gap-x-2">
        <View className="h-7 p-0.5 bg-[#8257E5] rounded-full" />
        <Text className="text-base text-black font-Poppins-Medium dark:text-white">
          Destaque
        </Text>
      </View>
      {isFetching ? (
        <View className="flex items-center justify-center px-2 py-3 bg-white rounded-b-lg dark:bg-background-darkLight h-44 w-[90vw]">
          <ActivityIndicator size="large" color="#FFF" />
        </View>
      ) : (
        <Swiper
          className="flex max-h-44"
          showsButtons={false}
          showsPagination={false}
          showsHorizontalScrollIndicator={false}>
          {promotions.map(promotiom => {
            return (
              <TouchableOpacity
                key={promotiom.id}
                onPress={() => goToSheetPromotion(promotiom)}>
                <Image
                  className="h-32 rounded-t-md"
                  source={{uri: promotiom.imageUrl}}
                />
                <View className="relative flex flex-col px-2 py-3 space-y-2 bg-white rounded-b-lg dark:bg-background-darkLight">
                  <Text className="text-sm text-gray-500 font-Poppins-Medium dark:text-gray-200">
                    {promotiom.title}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </Swiper>
      )}
    </View>
  );
};
