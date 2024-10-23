import { NavigationProp } from '@react-navigation/native';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Swiper from 'react-native-swiper';
import { GetPromotionsResponse, usePromotions } from '../../../../services/api/get-promotions';

interface TopPromotionsProps {
  navigation: NavigationProp<RootTabParamList>;
}


export const TopPromotions: React.FC<TopPromotionsProps> = ({ navigation }) => {
  const { data, isFetching } = usePromotions();
  
  const shuffleArray = (arr: GetPromotionsResponse[]): GetPromotionsResponse[] => {
    const shuffled = [...arr];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };
  
  const sortedPromotions = data?.sort((a, b) => a.position - b.position) || [];

  const groupedPromotions = sortedPromotions.reduce((acc: { [key: number]: GetPromotionsResponse[] }, promotion) => {
    acc[promotion.position] = acc[promotion.position] || [];
    acc[promotion.position].push(promotion);
    return acc;
  }, {});

  const organizedPromotions = Object.values(groupedPromotions)
    .map(group => shuffleArray(group))
    .flat();

  const promotions = organizedPromotions.filter(item => {
    const today = new Date();
    const endDate = new Date(item.endDate);
    return item.isAd !== true && endDate > today &&  item.isActive;
  });

  function goToSheetPromotion(promotiom: Promotiom) {
    navigation.navigate('SheetPromotion', {
      promotiom,
    });
  }

  return (
    <View className="flex flex-col gap-y-3">
      <View className="flex flex-row items-center gap-x-2">
        <View className="h-7 p-0.5 bg-base-primary rounded-full" />
        <Text className="text-base text-black font-Poppins-Medium dark:text-white">
          Promoções
        </Text>
      </View>
      {isFetching ? (
        <View className="flex items-center justify-center px-2 py-3 bg-white rounded-lg dark:bg-background-darkLight h-44 w-[90vw]">
          <ActivityIndicator size="large" color="#FFF" />
        </View>
      ) : (
        <Swiper
          className="flex max-h-44"
          showsButtons={false}
          showsPagination={false}
          autoplay
          autoplayTimeout={5}
          showsHorizontalScrollIndicator={false}>
          {promotions.map(promotiom => {
            return (
              <TouchableOpacity
                key={promotiom.id}
                onPress={() => goToSheetPromotion(promotiom)}>
                <Image
                  className="h-full rounded-md"
                  source={{ uri: promotiom.imageUrl }}
                />
              </TouchableOpacity>
            );
          })}
        </Swiper>
      )}
    </View>
  );
};
