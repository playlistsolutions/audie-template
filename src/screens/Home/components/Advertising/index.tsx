import {
  Image,
  TouchableOpacity,
  Linking,
  ActivityIndicator,
  View,
} from 'react-native';
import {
  GetPromotionsResponse,
  usePromotions,
} from '@/services/api/get-promotions';
import {useEffect, useState} from 'react';

export const Advertising: React.FC = () => {
  const {data, isFetching} = usePromotions();
  const [randonAdvertising, setRandonAdvertising] =
    useState<GetPromotionsResponse | null>(null);

  useEffect(() => {
    if (advertising.length > 0) {
      setRandonAdvertising(
        advertising[Math.floor(Math.random() * advertising.length)],
      );
    }
  }, [data]);

  const advertising = data.filter(item => {
    return item.isAd == true;
  });

  function handlePress(url: string) {
    Linking.openURL(url).catch(err =>
      console.error('Não foi possivel carregar a página', err),
    );
  }

  return isFetching ? (
    <View className="flex items-center justify-center px-2 py-3 bg-white rounded-b-lg dark:bg-background-darkLight h-28">
      <ActivityIndicator size="large" color="#FFF" />
    </View>
  ) : (
    randonAdvertising && (
      <TouchableOpacity
        onPress={() => handlePress(randonAdvertising.externalUrl)}
        className="w-full">
        <Image
          className="rounded-md h-28"
          source={{uri: randonAdvertising.imageUrl}}
        />
      </TouchableOpacity>
    )
  );
};
