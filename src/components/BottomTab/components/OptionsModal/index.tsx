import axios from 'axios';
import {PauseCircle, PlayCircle} from 'iconsax-react-native';
import {useEffect, useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {WaveIndicator} from 'react-native-indicators';
import Modal from 'react-native-modal';

interface OptionsModalProps {
  onShowOptionsPlayer(): void;
  onSelectedOptions(options: string): void;
  PlayAudio(): Promise<void>;
  PauseAudio(): Promise<void>;
  showOptionsPlayer: boolean;
  isPlaying: boolean;
  isLoading: boolean;
  selectedOptions: string;
  infoMusic: {
    title: string;
    artist: string;
  };
  letter: string;
}

export const OptionsModal: React.FC<OptionsModalProps> = ({
  onShowOptionsPlayer,
  onSelectedOptions,
  PlayAudio,
  PauseAudio,
  showOptionsPlayer,
  isLoading,
  isPlaying,
  selectedOptions,
  letter,
  infoMusic,
}) => {
  return (
    <Modal
      backdropTransitionOutTiming={0}
      onSwipeComplete={onShowOptionsPlayer}
      isVisible={showOptionsPlayer}
      swipeDirection="down"
      className="m-0">
      <View className="flex justify-end flex-1 bg-background-dark2">
        <View className="flex flex-row items-center justify-between flex-1 px-5 bg-background-dark2">
          <View className="flex flex-row items-center space-x-2">
            <View>
              <Image
                className="flex h-8 w-14"
                source={require('../../../../assets/logo.png')}
              />
            </View>
            <View className="flex flex-col">
              <Text className="text-base font-medium text-black dark:text-white">
                103 FM Aracaju
              </Text>
            </View>
          </View>
          <View className="flex items-center justify-center">
            {isLoading ? (
              <WaveIndicator
                size={40}
                count={2}
                waveFactor={0.3}
                color="white"
              />
            ) : (
              <View>
                {isPlaying ? (
                  <TouchableOpacity onPress={PauseAudio}>
                    <PauseCircle size="40" color={'grey'} variant="Bulk" />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity onPress={PlayAudio}>
                    <PlayCircle size="40" color={'grey'} variant="Bulk" />
                  </TouchableOpacity>
                )}
              </View>
            )}
          </View>
        </View>
        <View className="flex bg-background-dark h-[90%] rounded-t-2xl py-5 px-3">
          <View className="flex flex-row justify-center w-full">
            <TouchableOpacity
              onPress={() => onSelectedOptions('LETRA')}
              activeOpacity={0.8}
              className={`flex w-full p-3 justify-center items-center ${
                selectedOptions == 'LETRA'
                  ? 'border-b-2 border-neutral-100'
                  : 'border-b-0.5 border-neutral-400'
              }`}>
              <Text
                className={`text-sm font-medium ${
                  selectedOptions == 'LETRA'
                    ? 'text-neutral-600 dark:text-neutral-100'
                    : 'text-neutral-600 dark:text-neutral-500'
                }`}>
                LETRA
              </Text>
            </TouchableOpacity>
          </View>
          <View className="flex items-center justify-center flex-1 w-full">
            {letter == '' ? (
              <Text>Não foi possivel carregar a letra</Text>
            ) : (
              <Text>{letter}</Text>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};
