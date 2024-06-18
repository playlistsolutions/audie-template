import {ArrowLeft2, TickCircle} from 'iconsax-react-native';
import {Text, TouchableOpacity, View} from 'react-native';

interface NumPadProps {
  handleInput(value: number): void;
  cleanInput(): void;
}

export const NumPad: React.FC<NumPadProps> = ({handleInput, cleanInput}) => {
  return (
    <>
      <View className="flex flex-row justify-between">
        <TouchableOpacity onPress={() => handleInput(1)} className="p-2">
          <Text className="font-medium text-white text-3xl">1</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleInput(2)} className="p-2">
          <Text className="font-medium text-white text-3xl">2</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleInput(3)} className="p-2">
          <Text className="font-medium text-white text-3xl">3</Text>
        </TouchableOpacity>
      </View>
      <View className="flex flex-row justify-between">
        <TouchableOpacity onPress={() => handleInput(4)} className="p-2">
          <Text className="font-medium text-white text-3xl">4</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleInput(5)} className="p-2">
          <Text className="font-medium text-white text-3xl">5</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleInput(6)} className="p-2">
          <Text className="font-medium text-white text-3xl">6</Text>
        </TouchableOpacity>
      </View>
      <View className="flex flex-row justify-between">
        <TouchableOpacity onPress={() => handleInput(7)} className="p-2">
          <Text className="font-medium text-white text-3xl">7</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleInput(8)} className="p-2">
          <Text className="font-medium text-white text-3xl">8</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleInput(9)} className="p-2">
          <Text className="font-medium text-white text-3xl">9</Text>
        </TouchableOpacity>
      </View>
      <View className="flex flex-row justify-between items-center">
        <TouchableOpacity onPress={cleanInput} className="p-2">
          <ArrowLeft2 size="32" color="#FFF" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleInput(0)} className="p-2">
          <Text className="font-medium text-white text-3xl">0</Text>
        </TouchableOpacity>
        <TouchableOpacity className="p-2">
          <TickCircle size="32" color="#FFF" />
        </TouchableOpacity>
      </View>
    </>
  );
};
