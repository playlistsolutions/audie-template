import { NavigationProp } from '@react-navigation/native';
import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNews } from '@/services/api/get-news';

interface AllNewsProps {
  navigation: NavigationProp<RootTabParamList>;
}

export const AllNews: React.FC<AllNewsProps> = ({ navigation }) => {
  const { data, isFetching } = useNews();

  function goToNews() {
    navigation.navigate('News', {});
  }

  function goToSheetNews(news: any) {
    navigation.navigate('SheetNews', { news });
  }

  return (
    <View className="flex flex-col gap-y-2">
      <View className="flex flex-row items-center justify-between">
        <View className="flex flex-row items-center space-x-2">
          <View className="h-7 p-0.5 bg-[#8257E5] rounded-full" />
          <Text className="text-base text-black font-Poppins-Medium dark:text-white">
            Últimas notícias
          </Text>
        </View>
        <TouchableOpacity onPress={goToNews}>
          <Text className="font-Poppins-Regular text-xs text-[#8257E5]">
            Veja mais
          </Text>
        </TouchableOpacity>
      </View>
      <View className="flex flex-col w-full gap-y-3 mb-[285px]">
        {isFetching
          ? Array.from({ length: 3 }, (_, index) => {
            return (
              <View
                className="flex flex-row items-center w-full max-w-full p-3 space-x-2 bg-white rounded-md dark:bg-background-darkLight"
                key={index}>
                <View className="flex items-center justify-center w-full h-20">
                  <ActivityIndicator size="large" color="#FFF" />
                </View>
              </View>
            );
          })
          : data.slice(0, 3).map((news: any, index: number) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => goToSheetNews(news)}
                className="flex flex-row items-center w-full max-w-full p-3 space-x-2 bg-white rounded-md dark:bg-background-darkLight">
                <View className="w-20 h-20">
                  <Image
                    className="w-full h-full rounded-md"
                    source={{ uri: news.imageUrl }}
                  />
                </View>
                <View className="flex flex-col flex-1 gap-y-2">
                  <Text
                    numberOfLines={3}
                    className="text-xs text-justify text-gray-500 font-Poppins-Medium dark:text-gray-200">
                    {news.title}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
      </View>
    </View>
  );
};
