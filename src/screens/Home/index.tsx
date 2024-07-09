import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { ScrollView, View } from 'react-native';
import { Header } from '../../components/Header';
import { Advertising, AllNews, TopPromotions } from './components';
import { useColorScheme } from 'nativewind';
import { useEffect } from 'react';
import storage from '../../services/storage';

interface HomeScreenProps {
  navigation: BottomTabNavigationProp<RootTabParamList>;
}

export const Home: React.FC<HomeScreenProps> = ({ navigation }) => {
  const { setColorScheme } = useColorScheme();

  useEffect(() => {
    const theme = storage.getDarkMode();
    setColorScheme(theme ? theme : 'system');
  }, []);

  return (
    <View className="items-center justify-start min-h-screen bg-background-light dark:bg-background-dark">
      <Header />
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="flex flex-col px-5 py-2 space-y-2">
        <View>
          <TopPromotions navigation={navigation} />
        </View>
        <View>
          <Advertising />
        </View>
        <View>
          <AllNews navigation={navigation} />
        </View>
      </ScrollView>
    </View>
  );
};
