import { useEffect, useState } from 'react';
import { FlatList, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useColorScheme } from 'nativewind';
import { getNews, News } from '@/services/api/get-news';

interface Categories {
  id: number;
  name: string;
}

interface HeaderProps {
  onFilterNewsByCategory?: (categoryId: number) => void;
}

export const Header: React.FC<HeaderProps> = ({ onFilterNewsByCategory }) => {
  const [categories, setCategories] = useState<Categories[]>([{ id: -1, name: 'Todas' },]);
  const [selectedCategory, setSelectedCategory] = useState<number>(-1);
  const route = useRoute();
  const [isFetching, setIsFetching] = useState<boolean>(true)
  const [data, setData] = useState<News[]>([])

  useEffect(() => {
    getNews("1", undefined)
      .then((response) => {
        if (response && response.length > 0) {
          const newsCategories = response.map(item => {
            return {
              id: item.newsCategory.id,
              name: item.newsCategory.name,
            };
          });

          const uniqueCategories = Array.from(
            new Map(newsCategories.map(item => [item.id, { id: item.id, name: item.name }])).values()
          );
          setCategories([{ id: -1, name: 'Todas' }, ...uniqueCategories]);
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  function FilterNewsByCategory(categoryId: number) {
    setSelectedCategory(categoryId);
    onFilterNewsByCategory!(categoryId);
  }

  return (
    <View
      className={`w-full flex flex-col justify-between bg-white dark:bg-background-dark2 ${route.name == 'News' ? 'h-28 px-5 pt-5' : 'p-5'}`}>
      <Text className="text-base font-normal text-black uppercase font-QuickExpress dark:text-white">
        Playlist{' '}
        <Text className="text-base font-normal text-base-primary">News</Text>
      </Text>
      {route.name == 'News' && (
        <View>
          <FlatList
            showsHorizontalScrollIndicator={false}
            data={categories}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            renderItem={({ item: category }) => {
              return (
                <TouchableOpacity
                  onPress={() => FilterNewsByCategory(category.id)}
                  className="flex flex-col items-center ml-2 gap-y-3"
                  key={category.id}>
                  <Text
                    className={`${selectedCategory == category.id
                      ? 'text-base-primary'
                      : 'text-gray-300'
                      } font-Poppins-Medium text-sm`}>
                    {category.name.charAt(0) +
                      category.name.slice(1).toLowerCase()}
                  </Text>
                  {selectedCategory == category.id && (
                    <View className="p-0.5 rounded-full w-8 bg-base-primary" />
                  )}
                </TouchableOpacity>
              );
            }}
          />
        </View>
      )}
    </View>
  );
};
