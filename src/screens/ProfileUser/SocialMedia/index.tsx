import { useUrls } from '../../../services/api/get-url';
import { NavigationProp } from '@react-navigation/native';
import { ArrowLeft2, Instagram, Whatsapp, Youtube } from 'iconsax-react-native';
import { useColorScheme } from 'nativewind';
import { Image, Linking, Text, TouchableOpacity, View } from 'react-native';

interface SocialMediaProps {
  navigation: NavigationProp<RootTabParamList>;
}

export const SocialMedia: React.FC<SocialMediaProps> = ({ navigation }) => {
  const { data } = useUrls();
  const { colorScheme } = useColorScheme();

  const hasUrlTikTok = data?.find(({ urls }: any) => urls.typeId == 10)
  const hasUrlFacebook = data?.find(({ urls }: any) => urls.typeId == 5)
  const hasUrlTwitter = data?.find(({ urls }: any) => urls.typeId == 6)
  const hasUrlYoutube = data?.find(({ urls }: any) => urls.typeId == 8)
  const hasUrlInstagram = data?.find(({ urls }: any) => urls.typeId == 7)
  const hasUrlWhatsApp = data?.find(({ urls }: any) => urls.typeId == 9)

  function openWhatsApp() {
    if (data) {
      const urlWhats = data.find((item: any) => {
        if (item.urls.typeId == 9) {
          return item;
        }
      }).urls.url

      Linking.openURL(`https://wa.me/${urlWhats}`);
    }
  }

  function goTo(type: number) {
    const socialMediaUrl = data.find((item: any) => {
      if (item.urls.typeId == type) {
        return item;
      }
    }).urls.url

    Linking.openURL(`https://${socialMediaUrl}`);
  }

  return (
    <View className="items-start justify-start min-h-screen p-5 bg-background-light dark:bg-background-dark">
      <View className="flex flex-row items-center justify-start w-full">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft2
            size="18"
            color={colorScheme === 'dark' ? '#FFF' : '#000'}
            variant="Linear"
          />
        </TouchableOpacity>
      </View>
      <View className="flex flex-col justify-start w-full mt-5 space-y-5">
        <View className="flex flex-col space-y-1">
          <Text className="text-2xl font-semibold text-black dark:text-white">
            Redes Sociais
          </Text>
        </View>
        <View className="flex flex-col space-y-6">
          {
            hasUrlTikTok &&
            <TouchableOpacity
              onPress={() => goTo(10)}
              className="flex flex-row items-center space-x-2">
              {colorScheme === 'dark' ? (
                <Image
                  className="w-8 h-8"
                  source={require('../../../assets/icons/tiktokIconDark.png')}
                />
              ) : (
                <Image
                  className="w-8 h-8"
                  source={require('../../../assets/icons/tiktokIcon.png')}
                />
              )}
              <Text className="text-base font-bold text-black dark:text-white">
                Tik Tok
              </Text>
            </TouchableOpacity>
          }
          {
            hasUrlFacebook &&
            <TouchableOpacity
              onPress={() => goTo(5)}
              className="flex flex-row items-center space-x-2">
              {colorScheme === 'dark' ? (
                <Image
                  className="w-8 h-8"
                  source={require('../../../assets/icons/facebookIconDark.png')}
                />
              ) : (
                <Image
                  className="w-8 h-8"
                  source={require('../../../assets/icons/facebookIcon.png')}
                />
              )}
              <Text className="text-base font-bold text-black dark:text-white">
                Facebook
              </Text>
            </TouchableOpacity>
          }
          {
            hasUrlTwitter &&
            <TouchableOpacity
              onPress={() => goTo(6)}
              className="flex flex-row items-center space-x-2">
              {colorScheme === 'dark' ? (
                <Image
                  className="w-8 h-8"
                  source={require('../../../assets/icons/twitterIconDark.png')}
                />
              ) : (
                <Image
                  className="w-8 h-8"
                  source={require('../../../assets/icons/twitterIcon.png')}
                />
              )}
              <Text className="text-base font-bold text-black dark:text-white">
                Twitter
              </Text>
            </TouchableOpacity>
          }
          {
            hasUrlYoutube &&
            <TouchableOpacity
              onPress={() => goTo(8)}
              className="flex flex-row items-center space-x-2">
              <Youtube
                size={32}
                color={colorScheme === 'dark' ? '#FFF' : '#000'}
                variant="Bold"
              />
              <Text className="text-base font-bold text-black dark:text-white">
                Youtube
              </Text>
            </TouchableOpacity>
          }
          {
            hasUrlInstagram &&
            <TouchableOpacity
              onPress={() => goTo(7)}
              className="flex flex-row items-center space-x-2">
              <Instagram
                size={32}
                color={colorScheme === 'dark' ? '#FFF' : '#000'}
                variant="Bold"
              />
              <Text className="text-base font-bold text-black dark:text-white">
                Instagram
              </Text>
            </TouchableOpacity>
          }
        </View>
      </View>
      {
        hasUrlWhatsApp &&
        <TouchableOpacity
          onPress={openWhatsApp}
          className="absolute flex items-center justify-center rounded-full bottom-10 right-8">
          <Whatsapp size="50" color="#25D366" variant="Bold" />
        </TouchableOpacity>
      }
    </View>
  );
};
