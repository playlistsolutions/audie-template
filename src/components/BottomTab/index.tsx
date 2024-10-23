import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import {
  DiscountShape,
  Home,
  Notepad2,
  PauseCircle,
  PlayCircle,
  ProfileCircle,
} from 'iconsax-react-native';
import { Animated, Image, Text, TouchableOpacity, View } from 'react-native';
import useBottomTabAnimation from '../../hooks/useBottomTabAnimation';
import { useEffect, useState } from 'react';
import { WaveIndicator } from 'react-native-indicators';
import TrackPlayer, { AppKilledPlaybackBehavior, Capability } from 'react-native-track-player';
import { PlayerModal } from './components/PlayerModal';
import { useUrls } from '../../services/api/get-url';
import axios from 'axios';
import { Tv } from 'lucide-react-native';
import { useMetadata } from '@/services/api/get-metadata';

export const BottomTab = ({ navigation, state }: BottomTabBarProps) => {
  const { data } = useUrls();
  const { data: xmlData } = useMetadata()
  const { translateValue } = useBottomTabAnimation();
  const [isShowPlayer, setShowPlayer] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isOnLive, setIsOnLive] = useState<boolean>(true);
  const [isComercial, setIsComercial] = useState<boolean>(true);
  const [infoMusic, setInfoMusic] = useState<{ title: string; artist: string; coverImg: string; }>({ artist: '', title: '', coverImg: '' });

  useEffect(() => {
    if (data) {
      const urlStream = data.find((item) => item.typeId == 1).url;
      LoadAudio(urlStream);
    }
    if (xmlData) {
      LoadMetadata()
    }
  }, [data]);

  async function getInfoMusic(albumTitle: string, artistName: string) {
    const artist = encodeURIComponent(artistName);
    const album = encodeURIComponent(albumTitle);
    const DISCOGS_BASE_URL= 'https://api.discogs.com/database/search'
    const DISCOGS_KEY= 'TVckWiLVGVPQtuPGnOXy'
    const DISCOGS_SECRET= 'NvptTAmnzoSCvWzvDUXaIHORhbznqvft'

    const url = `${DISCOGS_BASE_URL}?q=${album}&artist=${artist}&type=release&key=${DISCOGS_KEY}&secret=${DISCOGS_SECRET}`;

    await axios.get(url)
      .then(({ data }) => {
        if (data) {
          const coverImg = data.results[0].cover_image
          setInfoMusic(state => ({
            ...state,
            coverImg
          }));
        } else {
          setInfoMusic(state => ({
            ...state,
            coverImg: '../../assets/logo.png',
          }));
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  async function LoadMetadata() {
    try {
      if (xmlData.Playlist) {
        if (xmlData.Playlist.OnAir.Break.Id._text != 'Comercial') {
          const currentMusic = xmlData.Playlist.OnAir.CurMusic
          const title = currentMusic.Title
          const artist = currentMusic.Artist
          const album = currentMusic.Album
          await getInfoMusic(album, artist);
          setIsComercial(false);
          return setInfoMusic(state => ({
            ...state,
            title,
            artist,
          }));
        }
      }

      setIsComercial(true);
    } catch (error) {
      console.log(error)
      setIsComercial(true);
    }
  }

  async function LoadAudio(urlStream: string) {
    setIsLoading(true);
    try {
      await TrackPlayer.setupPlayer();
      TrackPlayer.updateOptions({
        capabilities: [Capability.Play, Capability.Pause],
        android: {
          appKilledPlaybackBehavior:
            AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification,
        },
      });
      await TrackPlayer.add({
        title: '103 FM Aracaju',
        url: urlStream,
      });
      setIsLoading(false);
      setIsLoaded(true);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  }

  async function PlayAudio() {
    await TrackPlayer.play();
    setIsPlaying(true);
  }

  async function PauseAudio() {
    await TrackPlayer.pause();
    setIsPlaying(false);
    setIsOnLive(false);
  }

  function handlerShowPlayer() {
    setShowPlayer(!isShowPlayer);
  }

  function goTo(route: string) {
    if (route != 'Television') {
      navigation.navigate(route);
    } else {
      navigation.navigate('TV');
    }
  }

  const getIconComponent = (routeName: RouteName, isCurrentRoute: boolean) => {
    switch (routeName) {
      case 'Home':
        return (
          <View className="flex flex-col items-center justify-center space-y-1">
            <Home
              size={32}
              color={isCurrentRoute ? '#8257E5' : 'grey'}
              variant={isCurrentRoute ? 'Bold' : 'Outline'}
            />
            <Text
              className={`text-xs ${isCurrentRoute ? 'text-base-primary' : 'text-neutral-500'
                }`}>
              Início
            </Text>
          </View>
        );
      case 'Promotions':
        return (
          <View className="flex flex-col items-center justify-center space-y-1">
            <DiscountShape
              size={32}
              color={isCurrentRoute ? '#8257E5' : 'grey'}
              variant={isCurrentRoute ? 'Bold' : 'Outline'}
            />
            <Text
              className={`text-xs ${isCurrentRoute ? 'text-base-primary' : 'text-neutral-500'
                }`}>
              Promoções
            </Text>
          </View>
        );
      case 'Television':
        return (
          <View className="flex flex-col items-center justify-center space-y-1">
            <Tv size={32} color={isCurrentRoute ? '#8257E5' : 'grey'} />
            <Text
              className={`text-xs ${isCurrentRoute ? 'text-base-primary' : 'text-neutral-500'
                }`}>
              TV
            </Text>
          </View>
        );
      case 'News':
        return (
          <View className="flex flex-col items-center justify-center space-y-1">
            <Notepad2
              size={32}
              color={isCurrentRoute ? '#8257E5' : 'grey'}
              variant={isCurrentRoute ? 'Bold' : 'Outline'}
            />
            <Text
              className={`text-xs ${isCurrentRoute ? 'text-base-primary' : 'text-neutral-500'
                }`}>
              Notícias
            </Text>
          </View>
        );
      case 'ProfileUser':
        return (
          <View className="flex flex-col items-center justify-center space-y-1">
            <ProfileCircle
              size={32}
              color={isCurrentRoute ? '#8257E5' : 'grey'}
              variant={isCurrentRoute ? 'Bold' : 'Outline'}
            />
            <Text
              className={`text-xs ${isCurrentRoute ? 'text-base-primary' : 'text-neutral-500'
                }`}>
              Ouvinte
            </Text>
          </View>
        );
    }
  };

  return (
    <>
      <Animated.View
        style={{ transform: [{ translateY: translateValue }] }}
        className={`absolute bg-white bottom-2 left-5 right-5 rounded-xl shadow-2xl shadow-slate-300 dark:shadow-transparent dark:bg-background-dark2`}>
        <TouchableOpacity
          disabled={isLoading}
          onPress={handlerShowPlayer}
          activeOpacity={1}>
          <View className="flex flex-row items-center w-full px-2 space-x-2">
            {isComercial ? (
              <>
                <View className="relative w-20 h-20">
                  <Image
                    className="absolute rounded-md left-2 h-14 w-14 top-4"
                    source={require('../../assets/logo.png')}
                  />
                </View>
                <View className="flex flex-col w-[60%] overflow-hidden">
                  <Text className="text-base font-medium text-black dark:text-white">
                  103 FM Aracaju
                  </Text>
                </View>
              </>
            ) : (
              <>
                <View className="relative w-20 h-20">
                  <Image
                    className="absolute rounded-md left-2 h-14 w-14 top-4"
                    source={{ uri: infoMusic.coverImg }}
                  />
                </View>
                <View className="flex flex-col w-[60%] overflow-hidden">
                  <Text className="text-sm font-medium text-black dark:text-white">
                    {infoMusic.title}
                  </Text>
                  <Text
                    numberOfLines={2}
                    className="text-xs font-normal text-neutral-400">
                    {infoMusic.artist}
                  </Text>
                </View>
              </>
            )}
            {isLoading ? (
              <View>
                <WaveIndicator
                  size={40}
                  count={2}
                  waveFactor={0.3}
                  color="white"
                />
              </View>
            ) : isPlaying ? (
              <TouchableOpacity
                className="absolute right-3"
                onPress={PauseAudio}>
                <PauseCircle size="40" color={'grey'} variant="Bulk" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                className="absolute right-3"
                onPress={PlayAudio}>
                <PlayCircle size="40" color={'grey'} variant="Bulk" />
              </TouchableOpacity>
            )}
          </View>
        </TouchableOpacity>
        <View className="flex-row items-center justify-around flex-1 py-4">
          {state.routes.map((route, index) => {
            const isCurrentRoute = state.index === index;
            return (
              <View key={route.key}>
                <TouchableOpacity
                  onPress={() => goTo(route.name)}
                  className="items-center justify-center flex-1">
                  {getIconComponent(route.name as RouteName, isCurrentRoute)}
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      </Animated.View>
      <PlayerModal
        onShowPlayer={handlerShowPlayer}
        PlayAudio={PlayAudio}
        PauseAudio={PauseAudio}
        isShowPlayer={isShowPlayer}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        isLoaded={isLoaded}
        setIsLoaded={setIsLoaded}
        isOnLive={isOnLive}
        setIsOnLive={setIsOnLive}
        navigation={navigation}
        infoMusic={infoMusic}
        isComercial={isComercial}
      />
    </>
  );
};
