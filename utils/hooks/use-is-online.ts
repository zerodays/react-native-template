import * as Network from 'expo-network';
import { useEffect, useState } from 'react';

export default function useIsOnline() {
  // Custom hook to check if the user is online or offline
  // Returns a boolean
  const [isConnected, setIsConnected] = useState<boolean | undefined>(
    undefined,
  );

  useEffect(() => {
    // Check if the user is online or offline
    Network.getNetworkStateAsync().then((state) => {
      setIsConnected(state.isConnected);
    });
  }, []);

  return isConnected === true;
}
