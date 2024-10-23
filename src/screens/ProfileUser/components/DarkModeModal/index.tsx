import {Text, TouchableOpacity, View} from 'react-native';
import Modal from 'react-native-modal';
import storage from '../../../../services/storage';
import {useColorScheme} from 'nativewind';

interface DarkModeModalProps {
  onDarkModeModal(): void;
  isDarkModeModal: boolean;
  currentDarkMode: string;
  setCurrentDarkMode: React.Dispatch<React.SetStateAction<string>>;
}

export const DarkModeModal: React.FC<DarkModeModalProps> = ({
  onDarkModeModal,
  isDarkModeModal,
  currentDarkMode,
  setCurrentDarkMode,
}) => {
  const {setColorScheme} = useColorScheme();

  function handlerAndSaveTheme(type: number) {
    switch (type) {
      case 0: // Modo Claro
        setCurrentDarkMode('light');
        setColorScheme('light');
        storage.setDarkMode('light');
        break;
      case 1: // Modo Escuro
        setCurrentDarkMode('dark');
        setColorScheme('dark');
        storage.setDarkMode('dark');
        break;
      case 2: // Padrão do Sistema
        setCurrentDarkMode('system');
        setColorScheme('system');
        storage.setDarkMode('system');
        break;
    }
  }

  return (
    <Modal
      backdropTransitionOutTiming={0}
      onSwipeComplete={onDarkModeModal}
      onBackdropPress={onDarkModeModal}
      onBackButtonPress={onDarkModeModal}
      isVisible={isDarkModeModal}
      swipeDirection="down"
      className="m-0">
      <View className="flex justify-end flex-1">
        <View className="h-[35%] bg-background-light dark:bg-background-dark rounded-t-3xl ">
          <View className="flex items-center justify-center p-2">
            <View className="w-10 h-[5px] rounded-full bg-gray-200 dark:bg-gray-600" />
          </View>
          <View className="flex flex-col justify-start">
            <Text className="p-5 text-xl font-extrabold text-black dark:text-white">
              Modo escuro
            </Text>
            <View className="p-[0.2px] w-full bg-gray-200 dark:bg-gray-600" />
            <View className="flex flex-col p-5 space-y-4">
              <TouchableOpacity
                onPress={() => handlerAndSaveTheme(0)}
                activeOpacity={0.5}
                className="flex flex-row items-center justify-between">
                <Text className="text-lg font-normal text-black dark:text-white">
                  Desativado
                </Text>
                <View className="flex justify-center items-center rounded-full w-5 h-5 bg-transparent border-2 border-base-primary">
                  {currentDarkMode == 'light' && (
                    <View className="bg-base-primary w-2.5 h-2.5 rounded-full" />
                  )}
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handlerAndSaveTheme(1)}
                activeOpacity={0.5}
                className="flex flex-row items-center justify-between">
                <Text className="text-lg font-normal text-black dark:text-white">
                  Ativado
                </Text>
                <View className="flex justify-center items-center rounded-full w-5 h-5 bg-transparent border-2 border-base-primary">
                  {currentDarkMode == 'dark' && (
                    <View className="bg-base-primary w-2.5 h-2.5 rounded-full" />
                  )}
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handlerAndSaveTheme(2)}
                activeOpacity={0.5}
                className="flex flex-row items-center justify-between">
                <Text className="text-lg font-normal text-black dark:text-white">
                  Padrão do sistema
                </Text>
                <View className="flex justify-center items-center rounded-full w-5 h-5 bg-transparent border-2 border-base-primary">
                  {currentDarkMode == 'system' && (
                    <View className="bg-base-primary w-2.5 h-2.5 rounded-full" />
                  )}
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};
