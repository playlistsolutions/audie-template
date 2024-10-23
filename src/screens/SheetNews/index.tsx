import {NavigationProp} from '@react-navigation/native';
import {ArrowCircleLeft} from 'iconsax-react-native';
import {useColorScheme} from 'nativewind';
import {useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import HTMLView from 'react-native-htmlview';

interface SheetNewsProps {
  route: any;
  navigation: NavigationProp<RootTabParamList>;
}

export const SheetNews: React.FC<SheetNewsProps> = ({navigation, route}) => {
  const {colorScheme} = useColorScheme();
  const [numberOfLines, setNumberOfLines] = useState<number | undefined>(23);

  const {title, description, category, imageUrl} = route.params.news;

  function goBack() {
    navigation.goBack();
  }

  function handleNumberOfLines() {
    numberOfLines ? setNumberOfLines(undefined) : setNumberOfLines(23);
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
          <View className="bg-base-primary py-0.5 px-4 rounded-md flex">
            <Text className="font-medium text-white">
              {category.charAt(0) + category.slice(1).toLowerCase()}
            </Text>
          </View>
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
        <View className="flex flex-col justify-around flex-1 w-full p-2">
          <HTMLView
            textComponentProps={{
              style: {color: colorScheme === 'dark' ? '#FFF' : '#000'},
            }}
            value={description}
          />
        </View>
      </ScrollView>
    </View>
  );
};
