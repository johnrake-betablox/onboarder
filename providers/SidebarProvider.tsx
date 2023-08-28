"use client";

import { createContext, useState } from "react";

interface SidebarContextInterface {
  showSidebar: boolean;
  setShowSidebar: (value: boolean) => void;
}
export const SidebarContext = createContext<SidebarContextInterface>({
  showSidebar: false,
  setShowSidebar: () => {},
});

interface Props {
  children?: React.ReactNode;
}
export const SidebarProvider = ({ children }: Props) => {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <SidebarContext.Provider
      value={{
        showSidebar,
        setShowSidebar,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};
