import { useState, useEffect, useCallback } from 'react';

interface BluetoothState {
  isConnected: boolean;
  deviceName: string | null;
  lastConnected: string | null;
}

const STORAGE_KEY = 'bluetooth-connection';

export const useBluetooth = () => {
  const [state, setState] = useState<BluetoothState>({
    isConnected: false,
    deviceName: null,
    lastConnected: null,
  });

  // Load state from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as BluetoothState;
        setState(parsed);
      }
    } catch (error) {
      console.error('Error loading bluetooth state:', error);
    }
  }, []);

  // Confirm connection
  const confirmConnection = useCallback((deviceName: string) => {
    const newState: BluetoothState = {
      isConnected: true,
      deviceName,
      lastConnected: new Date().toISOString(),
    };
    setState(newState);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
  }, []);

  // Disconnect
  const disconnect = useCallback(() => {
    const newState: BluetoothState = {
      isConnected: false,
      deviceName: null,
      lastConnected: null,
    };
    setState(newState);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  // Check if we can detect audio devices (experimental)
  const detectAudioDevices = useCallback(async () => {
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
        return [];
      }
      const devices = await navigator.mediaDevices.enumerateDevices();
      return devices.filter(device => device.kind === 'audiooutput');
    } catch (error) {
      console.error('Error detecting audio devices:', error);
      return [];
    }
  }, []);

  return {
    ...state,
    confirmConnection,
    disconnect,
    detectAudioDevices,
  };
};
