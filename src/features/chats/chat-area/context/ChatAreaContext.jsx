import React, { createContext, useContext } from "react";

const ChatAreaContext = createContext(null);

export const ChatAreaProvider = ({ value, children }) => {
  return (
    <ChatAreaContext.Provider value={value}>
      {children}
    </ChatAreaContext.Provider>
  );
};

export const useChatAreaContext = () => {
  const context = useContext(ChatAreaContext);

  if (!context) {
    throw new Error("useChatAreaContext must be used inside ChatAreaProvider");
  }

  return context;
};

