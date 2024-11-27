import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AttemptState {
  resetAttempts: number;
  verifyAttempts: number;
  resetBlockUntil: number | null;
  verifyBlockUntil: number | null;
}

interface AttemptContextType extends AttemptState {
  decrementResetAttempts: () => Promise<void>;
  decrementVerifyAttempts: () => Promise<void>;
  resetAttemptCounts: () => Promise<void>;
}

const AttemptContext = createContext<AttemptContextType | undefined>(undefined);

interface AttemptProviderProps {
  children: ReactNode;
}

export const AttemptProvider: React.FC<AttemptProviderProps> = ({ children }) => {
  const [state, setState] = useState<AttemptState>({
    resetAttempts: 3,
    verifyAttempts: 3,
    resetBlockUntil: null,
    verifyBlockUntil: null,
  });

  useEffect(() => {
    loadAttemptData();
  }, []);

  const loadAttemptData = async () => {
    try {
      const storedData = await AsyncStorage.getItem('attemptData');
      if (storedData) {
        const parsedData: AttemptState = JSON.parse(storedData);
        const now = Date.now();

        // Reset attempts if block time has passed
        if (parsedData.resetBlockUntil && now >= parsedData.resetBlockUntil) {
          parsedData.resetAttempts = 3;
          parsedData.resetBlockUntil = null;
        }
        if (parsedData.verifyBlockUntil && now >= parsedData.verifyBlockUntil) {
          parsedData.verifyAttempts = 3;
          parsedData.verifyBlockUntil = null;
        }

        setState(parsedData);
      }
    } catch (error) {
      console.error('Error loading attempt data:', error);
    }
  };

  const saveAttemptData = async (newState: AttemptState) => {
    try {
      await AsyncStorage.setItem('attemptData', JSON.stringify(newState));
    } catch (error) {
      console.error('Error saving attempt data:', error);
    }
  };

  const decrementResetAttempts = async () => {
    setState(prevState => {
      const newState = { ...prevState };
      if (newState.resetBlockUntil && Date.now() < newState.resetBlockUntil) {
        // If blocked, don't decrement further
        return newState;
      }
      newState.resetAttempts = Math.max(prevState.resetAttempts - 1, 0);
      if (newState.resetAttempts === 0) {
        newState.resetBlockUntil = Date.now() + 60 * 60 * 1000; // 1 hour
      }
      saveAttemptData(newState);
      return newState;
    });
  };

  const decrementVerifyAttempts = async () => {
    setState(prevState => {
      const newState = { ...prevState };
      if (newState.verifyBlockUntil && Date.now() < newState.verifyBlockUntil) {
        // If blocked, don't decrement further
        return newState;
      }
      newState.verifyAttempts = Math.max(prevState.verifyAttempts - 1, 0);
      if (newState.verifyAttempts === 0) {
        newState.verifyBlockUntil = Date.now() + 60 * 60 * 1000; // 1 hour
      }
      saveAttemptData(newState);
      return newState;
    });
  };

  const resetAttemptCounts = async () => {
    const newState = {
      resetAttempts: 3,
      verifyAttempts: 3,
      resetBlockUntil: null,
      verifyBlockUntil: null,
    };
    setState(newState);
    await saveAttemptData(newState);
  };

  return (
    <AttemptContext.Provider
      value={{
        ...state,
        decrementResetAttempts,
        decrementVerifyAttempts,
        resetAttemptCounts,
      }}
    >
      {children}
    </AttemptContext.Provider>
  );
};

export const useAttempt = () => {
  const context = useContext(AttemptContext);
  if (context === undefined) {
    throw new Error('useAttempt must be used within an AttemptProvider');
  }
  return context;
};