'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface CarmenChatContextType {
  isOpen: boolean;
  openChat: () => void;
  closeChat: () => void;
}

const CarmenChatContext = createContext<CarmenChatContextType | undefined>(undefined);

export function CarmenChatProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openChat = () => setIsOpen(true);
  const closeChat = () => setIsOpen(false);

  return (
    <CarmenChatContext.Provider value={{ isOpen, openChat, closeChat }}>
      {children}
    </CarmenChatContext.Provider>
  );
}

export function useCarmenChat() {
  const context = useContext(CarmenChatContext);
  if (context === undefined) {
    throw new Error('useCarmenChat must be used within a CarmenChatProvider');
  }
  return context;
}
