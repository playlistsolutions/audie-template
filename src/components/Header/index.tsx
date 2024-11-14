import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { getNews } from '@/services/api/get-news';

interface Categories {
  id: number;
  name: string;
}

interface HeaderProps {
  onFilterNewsByCategory?: (categoryId: number, categoryName: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onFilterNewsByCategory }) => {
  const [categories, setCategories] = useState<Categories[]>([{ id: -1, name: 'Todas' },]);
  const [selectedCategory, setSelectedCategory] = useState<number>(-1);
  const route = useRoute();
  const [isFetching, setIsFetching] = useState<boolean>(true)

  useEffect(() => {
    getNews("1", 10)
      .then((response) => {
        if (response && response.result.length > 0) {
          const newsCategories = response.result.map((item, index) => {
            return {
              id: index,
              name: item.category,
            };
          });

          const uniqueCategories: { id: number; name: string; }[] = [];
          const seenNames = new Set();

          newsCategories.forEach(item => {
            if (!seenNames.has(item.name)) {
              seenNames.add(item.name);
              uniqueCategories.push(item);
            }
          });

          setCategories([{ id: -1, name: 'Todas' }, ...uniqueCategories]);
          setIsFetching(false)
        }
      })
      .catch((error) => {
        setIsFetching(false)
        console.log(error)
      })
  }, [])

  function FilterNewsByCategory(categoryId: number, categoryName: string) {
    setSelectedCategory(categoryId);
    onFilterNewsByCategory!(categoryId, categoryName);
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
          {
            isFetching
              ?
              <View className='flex flex-row gap-x-3'>
                {
                  Array.from({ length: 5 }, (_, index) => {
                    return (
                      <View
                        className="flex flex-row items-center p-3 bg-white rounded-md dark:bg-background-darkLight"
                        key={index}>
                        <View className="flex items-center justify-center w-12 h-1 animate-pulse" />
                      </View>
                    );
                  })
                }
              </View>
              :
              <FlatList
                showsHorizontalScrollIndicator={false}
                data={categories}
                keyExtractor={(item) => item.id.toString()}
                horizontal
                renderItem={({ item: category }) => {
                  return (
                    <TouchableOpacity
                      onPress={() => FilterNewsByCategory(category.id, category.name)}
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
          }

        </View>
      )
      }
    </View >
  );
};
