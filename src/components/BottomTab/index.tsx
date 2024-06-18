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
import TrackPlayer, {
  AppKilledPlaybackBehavior,
  Capability,
} from 'react-native-track-player';
import xmlJs from 'xml-js';
import { PlayerModal } from './components/PlayerModal';
import { getXML } from '@/services/api/get-xml';
import { useUrls } from '@/services/api/get-url';
import axios from 'axios';

export const BottomTab = ({ navigation, state }: BottomTabBarProps) => {
  const { data } = useUrls();
  const { translateValue } = useBottomTabAnimation();
  const [isShowPlayer, setShowPlayer] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isOnLive, setIsOnLive] = useState<boolean>(true);
  const [isComercial, setIsComercial] = useState<boolean>(false);
  const [infoMusic, setInfoMusic] = useState<{
    title: string;
    artist: string;
    coverImg: string;
  }>({ artist: '', title: '', coverImg: '' });

  useEffect(() => {
    if (data) {
      const urlMetadata = data.filter(item => {
        if (item.typeId == 4) {
          return item;
        }
      })[0].url;
      LoadMetadata(urlMetadata);
    }
  }, [data]);

  async function getInfoMusic(title: string, artistName: string) {
    const key = 'TVckWiLVGVPQtuPGnOXy';
    const secret = 'NvptTAmnzoSCvWzvDUXaIHORhbznqvft';
    const releaseTitle = title;
    const artist = artistName;
    const perPage = 1;
    const page = 1;
    const baseUrl = 'https://api.discogs.com/database/search';

    const url =
      baseUrl +
      '?release_title=' +
      releaseTitle +
      '&artist=' +
      artist +
      '&per_page= ' +
      perPage +
      '&page=' +
      page +
      '&key=' +
      key +
      '&secret=' +
      secret;

    await axios
      .get(url)
      .then(response => {
        const result = response.data.results[0];
        if (result) {
          setInfoMusic(state => ({
            ...state,
            coverImg: result.cover_image,
          }));
        } else {
          setInfoMusic(state => ({
            ...state,
            coverImg: '@/assets/logo.png',
          }));
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  async function LoadMetadata(URL: string) {
    try {
      const response = await fetch(URL);
      const xmlText = await response.text();
      const parsed = xmlJs.xml2js(xmlText, { compact: true });
      if (parsed.Playlist) {
        if (parsed.Playlist.OnAir.Break.Id._text != 'Comercial') {
          const title = parsed.Playlist.OnAir.CurMusic.Title._text;
          const artist = parsed.Playlist.OnAir.CurMusic.Artist._text;
          await getInfoMusic(title, artist);
          setIsComercial(false);
          return setInfoMusic(state => ({
            ...state,
            artist,
            title,
          }));
        }
      }

      setIsComercial(true);
      LoadAudio();
    } catch (error) {
      console.error('Error fetching XML:', error);
    }
  }

  async function LoadAudio() {
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
        url: 'https://radio.voxcast.com.br:7030/;?type=http&nocache=19',
        title: '103 FM Aracaju',
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
              className={`text-xs ${isCurrentRoute ? 'text-[#8257E5]' : 'text-neutral-500'
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
              className={`text-xs ${isCurrentRoute ? 'text-[#8257E5]' : 'text-neutral-500'
                }`}>
              Promoções
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
              className={`text-xs ${isCurrentRoute ? 'text-[#8257E5]' : 'text-neutral-500'
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
              className={`text-xs ${isCurrentRoute ? 'text-[#8257E5]' : 'text-neutral-500'
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
          <View className="flex flex-row items-center justify-between w-full px-2">
            <View className="relative w-20 h-20">
              <Image
                className="absolute w-20 h-12 rounded-md top-4"
                source={require('@/assets/logo.png')}
              />
            </View>
            {isComercial ? (
              <View className="flex flex-col w-[60%] overflow-hidden">
                <Text className="text-base font-medium text-black dark:text-white">
                  103 FM Aracaju
                </Text>
              </View>
            ) : (
              <View className="flex flex-col w-[60%] overflow-hidden">
                <Text className="text-sm font-medium text-black dark:text-white">
                  {infoMusic?.title}
                </Text>
                <Text
                  numberOfLines={2}
                  className="text-xs font-normal text-neutral-400">
                  {infoMusic?.artist}
                </Text>
              </View>
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
              <TouchableOpacity onPress={PauseAudio}>
                <PauseCircle size="40" color={'grey'} variant="Bulk" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={PlayAudio}>
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
                  onPress={() => navigation.navigate(route.name)}
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
      />
    </>
  );
};
