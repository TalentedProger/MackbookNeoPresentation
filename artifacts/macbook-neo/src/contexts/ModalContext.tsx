import { createContext, useContext, useState, ReactNode } from "react";

interface ModalContextType {
  isPreOrderOpen: boolean;
  openPreOrder: () => void;
  closePreOrder: () => void;
}

const ModalContext = createContext<ModalContextType>({
  isPreOrderOpen: false,
  openPreOrder: () => {},
  closePreOrder: () => {},
});

export function useModal() {
  return useContext(ModalContext);
}

export function ModalProvider({ children }: { children: ReactNode }) {
  const [isPreOrderOpen, setIsPreOrderOpen] = useState(false);
  return (
    <ModalContext.Provider
      value={{
        isPreOrderOpen,
        openPreOrder: () => setIsPreOrderOpen(true),
        closePreOrder: () => setIsPreOrderOpen(false),
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}
