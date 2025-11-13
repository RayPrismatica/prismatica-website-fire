'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface AthenaChatContextType {
  isOpen: boolean;
  openChat: () => void;
  closeChat: () => void;
}

const AthenaChatContext = createContext<AthenaChatContextType | undefined>(undefined);

export function AthenaChatProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openChat = () => setIsOpen(true);
  const closeChat = () => setIsOpen(false);

  return (
    <AthenaChatContext.Provider value={{ isOpen, openChat, closeChat }}>
      {children}
    </AthenaChatContext.Provider>
  );
}

export function useAthenaChat() {
  const context = useContext(AthenaChatContext);
  if (context === undefined) {
    throw new Error('useAthenaChat must be used within an AthenaChatProvider');
  }
  return context;
}
