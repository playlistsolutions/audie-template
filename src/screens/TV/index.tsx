import { useEffect, useRef, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Video, { LoadError, OnBufferData } from 'react-native-video';
import Orientation from 'react-native-orientation-locker';
import { ChevronLeft, Volume2, VolumeX } from 'lucide-react-native';
import { NavigationProp } from '@react-navigation/native';
import { useUrls } from '@/services/api/get-url';

interface TVProps {
  navigation: NavigationProp<RootTabParamList>;
}

export const TV: React.FC<TVProps> = ({ navigation }) => {
  const { data, isFetched, isError } = useUrls();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [enableVideo, setEnableVideo] = useState<boolean>(false);
  const [urlStream, setUrlStream] = useState<string>('')
  const videoRef = useRef<any>(null);

  useEffect(() => {
    Orientation.lockToLandscape();

    return () => {
      Orientation.lockToPortrait();
    };
  }, []);

  useEffect(() => {
    if (data) {
      const urlStream = data.find((item) => item.typeId == 12).url;
      setUrlStream(urlStream)
      setEnableVideo(true)
    }
  }, [data]);

  function onBuffer(data: OnBufferData) {
    console.log(data);
  }

  function onError(error: LoadError) {
    console.log(error);
  }

  function handleLoad() {
    setIsLoading(true);
  }

  function handleAudio() {
    setIsMuted(!isMuted);
  }

  return (
    <>
      <View className="relative flex items-center justify-center w-full h-full">
        <View
          className={`absolute z-10 flex items-center justify-center w-full h-full bg-black/50 ${isLoading && 'hidden'
            }`}>
          <View className="">
            <Text className="text-black">Carregando...</Text>
          </View>
        </View>
        <View className="relative w-full h-full">
          {isLoading && (
            <>
              <View className="absolute z-50 left-5 top-5">
                <View className="flex flex-row items-center gap-0 p-0 m-0 bg-gray-700/50 rounded-xl">
                  <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    className="flex items-center justify-center p-3 px-4">
                    <ChevronLeft color={'white'} size={20} />
                  </TouchableOpacity>
                </View>
              </View>
              <View className="absolute z-50 right-5 top-5 bg-gray-800/40 rounded-xl">
                {isMuted ? (
                  <TouchableOpacity
                    onPress={handleAudio}
                    className="flex items-center justify-center p-3 px-4 ">
                    <VolumeX color={'white'} size={20} />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={handleAudio}
                    className="flex items-center justify-center p-3 px-4 ">
                    <Volume2 color={'white'} size={20} />
                  </TouchableOpacity>
                )}
              </View>
            </>
          )}
          {
            enableVideo
            &&
            <Video
              source={{ uri: urlStream }}
              onBuffer={onBuffer}
              onError={onError}
              onLoad={handleLoad}
              ref={videoRef}
              muted={isMuted}
              fullscreen
              resizeMode="stretch"
              className="w-full h-full"
            />
          }
        </View>
      </View>
    </>
  );
};
