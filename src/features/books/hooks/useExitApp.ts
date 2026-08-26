import { useEffect, useState } from 'react';
import { BackHandler } from 'react-native';

export const useExitApp = () => {
  const [exitModalVisible, setExitModalVisible] = useState<boolean>(false);

  useEffect(() => {
    const backAction = () => {
      setExitModalVisible(true);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  const handleExitApp = () => {
    BackHandler.exitApp();
  };

  const handleCancelExit = () => {
    setExitModalVisible(false);
  };

  return {
    exitModalVisible,
    handleExitApp,
    handleCancelExit,
  };
};
