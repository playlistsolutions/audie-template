import {
  FlatList,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { Filter, SearchNormal1 } from 'iconsax-react-native';
import { useColorScheme } from 'nativewind';
import { useState } from 'react';
import { Header } from '../../components/Header';
import { usePromotions } from '../../services/api/get-promotions';
import { isBefore, isEqual } from 'date-fns';

interface PromorionScreenProps {
  navigation: BottomTabNavigationProp<RootTabParamList>;
}

export const Promotions: React.FC<PromorionScreenProps> = ({ navigation }) => {
  const { data } = usePromotions();
  const { colorScheme } = useColorScheme();
  const [input, setInput] = useState<string>('');

  const promotions = data.filter(item => {
    const endDate = new Date(item.endDate);
    const today = new Date();
    const promotionFinished =
      isBefore(endDate, today) || isEqual(endDate, today);
    if (item.isAd != true && promotionFinished == false) {
      return item;
    }
  });

  const [filterData, setFilterData] = useState([...promotions]);

  function goToSheetPromotion(promotiom: Promotiom) {
    navigation.navigate('SheetPromotion', {
      promotiom,
    });
  }

  function handleFilterInputData(value: string) {
    const filteredResult = data.filter(item => {
      const titleMatch = item.title.toLowerCase().includes(value.toLowerCase());
      return titleMatch;
    });
    const promotions = filteredResult.filter(item => {
      const endDate = new Date(item.endDate);
      const today = new Date();
      const promotionFinished = isBefore(endDate, today) || isEqual(endDate, today);
      if (item.isAd != true && promotionFinished == false) {
        return item;
      }
    })
    setFilterData(promotions);
    setInput(value);
  }

  return (
    <View className="items-center justify-start min-h-screen bg-background-light dark:bg-background-dark">
      <Header />
      <View className="flex flex-col w-full px-5 mt-3 space-y-3">
        <View className="flex flex-row items-center justify-between w-full border-0.5 dark:border-white rounded-lg px-2">
          <View className="flex flex-row items-center gap-x-2">
            <View>
              <SearchNormal1
                size={22}
                color={colorScheme === 'dark' ? 'white' : 'black'}
                variant="Outline"
              />
            </View>
            <TextInput
              className="h-12 text-xs text-black dark:text-white"
              onChangeText={handleFilterInputData}
              value={input}
              placeholderTextColor={colorScheme === 'dark' ? 'white' : 'black'}
              placeholder="Pesquise pelo título da promoção ou pelo nível"
            />
          </View>
        </View>
        <View className="flex flex-col mb-[470px]">
          <FlatList
            data={filterData}
            showsVerticalScrollIndicator={false}
            keyExtractor={filterData => filterData.id.toString()}
            renderItem={({ item: promotiom }) => {
              return (
                <TouchableOpacity
                  className="my-2"
                  onPress={() => goToSheetPromotion(promotiom)}
                  key={promotiom.id}>
                  <Image
                    className="h-32 rounded-t-md"
                    source={{ uri: promotiom.imageUrl }}
                  />
                  <View className="relative flex flex-col px-2 py-3 space-y-2 bg-white rounded-b-lg dark:bg-background-darkLight">
                    <Text className="text-sm font-Poppins-Medium text-neutral-700 dark:text-gray-200">
                      {promotiom.title}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </View>
    </View>
  );
};
