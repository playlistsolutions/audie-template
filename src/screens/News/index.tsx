import {
  FlatList,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';
import { SearchNormal1 } from 'iconsax-react-native';
import { useColorScheme } from 'nativewind';
import { useEffect, useState } from 'react';
import { Header } from '../../components/Header';
import { getNews, News as INews } from '../../services/api/get-news';

type NewsScreenProps = {
  navigation: BottomTabNavigationProp<RootTabParamList, 'News'>;
};

export const News: React.FC<NewsScreenProps> = ({ navigation }) => {
  const { colorScheme } = useColorScheme();
  const [input, setInput] = useState<string>('');
  const [filterData, setFilterData] = useState<INews[]>([]);
  const [currentEndIndex, setCurrentEndIndex] = useState(10);
  const [visibleData, setVisibleData] = useState<INews[]>([]);
  const [data, setData] = useState<INews[]>([])

  useEffect(() => {
    getNews("1", undefined)
      .then((response) => {
        setData(response)
        setFilterData(response)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  useEffect(() => {
    filterData && setVisibleData(filterData.slice(0, currentEndIndex));
  }, [filterData]);

  function goToSheetNews(news: any) {
    navigation.navigate('SheetNews', { news });
  }

  function filterNewsByCategory(categoryId: number) {
    if (categoryId == -1) {
      return setFilterData(data);
    }
    const filterByCategoryId = data.filter(
      item => item.newsCategory.id === categoryId,
    );
    setFilterData(filterByCategoryId);
  }

  function handleFilterInputData(value: string) {
    const filteredResult = data?.filter(item => {
      const titleMatch = item.title.toLowerCase().includes(value.toLowerCase());
      const categoryMatch = item.newsCategory.name.toLowerCase().includes(value.toLowerCase());
      return titleMatch || categoryMatch;
    });
    setFilterData(filteredResult);
    setInput(value);
  }

  function handlePaginationScrolling() {
    const lastId = data[data.length - 1].id.toString()
    getNews("1", lastId)
      .then((response) => {
        const news = response
        const updateNews = [...data, ...news]
        setData(updateNews)
        setFilterData(updateNews)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <View className="items-center justify-start min-h-screen bg-background-light dark:bg-background-dark">
      <Header onFilterNewsByCategory={filterNewsByCategory} />
      <View className="flex flex-col w-full px-5 mt-3 space-y-3">
        <View className="flex flex-row items-center w-full space-x-2 border-0.5 dark:border-white rounded-lg px-2">
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
            placeholder="Pesquise pelo título da nóticias ou pela categoria"
          />
        </View>
        <View className="flex flex-col mb-[565px]">
          <FlatList
            showsVerticalScrollIndicator={false}
            data={visibleData}
            onEndReached={handlePaginationScrolling}
            keyExtractor={news => news.id.toString()}
            renderItem={({ item: news }) => {
              return (
                <TouchableOpacity
                  className="my-2"
                  onPress={() => goToSheetNews(news)}
                  key={news.id}>
                  <Image
                    className="h-32 rounded-t-md"
                    source={{ uri: news.imageUrl }}
                  />
                  <View className="relative flex flex-col px-2 py-3 space-y-2 bg-white rounded-b-lg dark:bg-background-darkLight">
                    <View className="absolute py-0.5 px-4 rounded-md -top-4 left-2 flex bg-white">
                      <Text className="font-medium text-black">
                        {news.newsCategory.name.charAt(0) + news.newsCategory.name.slice(1).toLowerCase()}
                      </Text>
                    </View>
                    <Text
                      numberOfLines={2}
                      className="text-xs font-Poppins-Medium text-neutral-700 dark:text-neutral-200">
                      {news.title}
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
