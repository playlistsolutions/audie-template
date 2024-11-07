import { getNews, News } from '@/services/api/get-news';
import { NavigationProp } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

interface AllNewsProps {
  navigation: NavigationProp<RootTabParamList>;
}

export const AllNews: React.FC<AllNewsProps> = ({ navigation }) => {
  const [isFetching, setIsFetching] = useState<boolean>(true)
  const [data, setData] = useState<News[]>([])

  useEffect(() => {
    getNews("1", undefined)
      .then((response) => {
        setIsFetching(false)
        setData(response)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  function goToNews() {
    navigation.navigate('News', {});
  }

  function goToSheetNews(news: any) {
    navigation.navigate('SheetNews', { news });
  }

  return (
    <View className="flex flex-col gap-y-0.5">
      <View className="flex flex-row items-center justify-between">
        <View className="flex flex-row items-center space-x-2">
          <View className="h-7 p-0.5 bg-base-primary rounded-full" />
          <Text className="text-base font-semibold text-black dark:text-white">
            Últimas notícias
          </Text>
        </View>
        <TouchableOpacity onPress={goToNews}>
          <Text className="text-xs font-Poppins-Regular text-base-primary">
            Veja mais
          </Text>
        </TouchableOpacity>
      </View>
      <View className="flex flex-col w-full gap-y-1.5 mb-[285px]">
        {isFetching
          ?
          Array.from({ length: 3 }, (_, index) => {
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
          :
          data && data.slice(0, 3).map((news: any, index: number) => {
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
          })
        }
      </View>
    </View>
  );
};
