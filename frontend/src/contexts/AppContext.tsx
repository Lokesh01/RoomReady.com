import React, { useContext, useState } from "react";
import Toast from "../components/Toast";
import { useQuery } from "react-query";
import { validateTokenAPI } from "../apis/auth-api";

type ToastMessageType = {
  message: string;
  type: "SUCCESS" | "ERROR";
};

type AppContextType = {
  showToast: (toastMessage: ToastMessageType) => void;
  isLoggedIn: boolean;
};

const AppContext = React.createContext<AppContextType | undefined>(undefined);

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [toast, setToast] = useState<ToastMessageType | undefined>(undefined);
  const { isError } = useQuery("validateToken", validateTokenAPI, {
    retry: false,
  });
  return (
    <AppContext.Provider
      value={{
        showToast: (toastMessage) => {
          setToast(toastMessage);
        },
        isLoggedIn: !isError,
      }}
    >
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(undefined)}
        />
      )}
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  return context as AppContextType;
};
