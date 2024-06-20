import {useEffect, useState} from 'react';
import {FlatList, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {useColorScheme} from 'nativewind';
import {useNews} from '../../services/api/get-news';

interface Categories {
  id: number;
  name: string;
}

interface HeaderProps {
  onFilterNewsByCategory?: (categoryId: number) => void;
}

export const Header: React.FC<HeaderProps> = ({onFilterNewsByCategory}) => {
  const {data} = useNews();
  const [categories, setCategories] = useState<Categories[]>([
    {id: -1, name: 'Todas'},
  ]);
  const [selectedCategory, setSelectedCategory] = useState<number>(-1);
  const route = useRoute();

  useEffect(() => {
    if (data && data.length > 0) {
      const newsCategories = data.map(item => {
        return {
          id: item.categoryId,
          name: item.category,
        };
      });
      const uniqueCategories = Array.from(
        new Set(newsCategories.map(category => JSON.stringify(category))),
      ).map(category => JSON.parse(category));

      setCategories([{id: -1, name: 'Todas'}, ...uniqueCategories]);
    }
  }, [data]);

  function FilterNewsByCategory(categoryId: number) {
    setSelectedCategory(categoryId);
    onFilterNewsByCategory!(categoryId);
  }

  return (
    <View
      className={`w-full flex flex-col justify-between bg-white dark:bg-background-dark2 ${
        route.name == 'News' ? 'h-28 px-5 pt-5' : 'p-5'
      }`}>
      <Text className="text-base font-normal text-black uppercase font-QuickExpress dark:text-white">
        103 FM{' '}
        <Text className="text-base font-normal text-[#8257E5]">News</Text>
      </Text>
      {route.name == 'News' && (
        <View>
          <FlatList
            showsHorizontalScrollIndicator={false}
            data={categories}
            keyExtractor={category => category.id.toString()}
            horizontal
            renderItem={({item: category}) => {
              return (
                <TouchableOpacity
                  onPress={() => FilterNewsByCategory(category.id)}
                  className="flex flex-col items-center ml-2 gap-y-3"
                  key={category.id}>
                  <Text
                    className={`${
                      selectedCategory == category.id
                        ? 'text-[#8257E5]'
                        : 'text-gray-200'
                    } font-Poppins-Medium text-sm`}>
                    {category.name.charAt(0) +
                      category.name.slice(1).toLowerCase()}
                  </Text>
                  {selectedCategory == category.id && (
                    <View className="p-0.5 rounded-full w-8 bg-[#8257E5]" />
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
