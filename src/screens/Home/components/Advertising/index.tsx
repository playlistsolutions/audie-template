import {
  Image,
  TouchableOpacity,
  Linking,
  ActivityIndicator,
  View,
} from 'react-native';
import { useEffect, useState } from 'react';
import { Advertising as IAdvertising, getAdvertising } from '@/services/api/get-advertising';

export const Advertising: React.FC = () => {
  const [randonAdvertising, setRandonAdvertising] = useState<IAdvertising | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    getAdvertising("1", undefined)
      .then((response) => {
        const advertising = response.filter(item => {
          return item.isAd == true;
        });
        setRandonAdvertising(
          advertising[Math.floor(Math.random() * advertising.length)],
        );
        setIsLoading(false)
      })
      .catch((error) => {
        setIsLoading(false)
        console.log(error)
      })
  }, [])

  function handlePress(url: string) {
    Linking.openURL(url).catch(err =>
      console.error('Não foi possivel carregar a página', err),
    );
  }

  return isLoading
    ?
    (
      <View className="flex items-center justify-center px-2 py-3 bg-white rounded-b-lg dark:bg-background-darkLight h-28">
        <ActivityIndicator size="large" color="#FFF" />
      </View>
    )
    :
    (
      randonAdvertising && (
        <TouchableOpacity
          onPress={() => handlePress(randonAdvertising.externalUrl)}
          className="w-full">
          <Image
            className="rounded-md h-28"
            source={{ uri: randonAdvertising.imageUrl }}
          />
        </TouchableOpacity>
      )
    );
};
