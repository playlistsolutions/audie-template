import {useState, useRef, useEffect} from 'react';
import {Animated, Dimensions, Keyboard} from 'react-native';

const useBottomTabAnimation = () => {
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const translateValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      hideBottomTab,
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      showBottomTab,
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  function hideBottomTab() {
    Animated.timing(translateValue, {
      toValue: 180,
      duration: 700,
      useNativeDriver: true,
    }).start();

    setIsKeyboardOpen(true);
  }

  function showBottomTab() {
    Animated.timing(translateValue, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();

    setIsKeyboardOpen(false);
  }

  return {
    isKeyboardOpen,
    translateValue,
  };
};

export default useBottomTabAnimation;
