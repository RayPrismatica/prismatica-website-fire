'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface MobilePrototypeContextType {
  isPrototypeEnabled: boolean;
  togglePrototype: () => void;
}

const MobilePrototypeContext = createContext<MobilePrototypeContextType | undefined>(undefined);

export function MobilePrototypeProvider({ children }: { children: React.ReactNode }) {
  const [isPrototypeEnabled, setIsPrototypeEnabled] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('mobile-prototype-enabled');
    if (saved === 'true') {
      setIsPrototypeEnabled(true);
      document.body.classList.add('mobile-prototype');
    }
  }, []);

  const togglePrototype = () => {
    const newValue = !isPrototypeEnabled;
    setIsPrototypeEnabled(newValue);
    localStorage.setItem('mobile-prototype-enabled', String(newValue));

    if (newValue) {
      document.body.classList.add('mobile-prototype');
    } else {
      document.body.classList.remove('mobile-prototype');
    }
  };

  return (
    <MobilePrototypeContext.Provider value={{ isPrototypeEnabled, togglePrototype }}>
      {children}
    </MobilePrototypeContext.Provider>
  );
}

export function useMobilePrototype() {
  const context = useContext(MobilePrototypeContext);
  if (context === undefined) {
    throw new Error('useMobilePrototype must be used within MobilePrototypeProvider');
  }
  return context;
}
