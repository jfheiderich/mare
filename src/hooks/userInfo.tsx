"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import { IUserInfo } from "@/types/userInfo";

interface IUserInfoContext {
  userInfo: IUserInfo;
  setUserInfo: (key: keyof IUserInfo, value: string) => void;
  clearUserInfo: () => void;
}

const UserInfoContext = createContext<IUserInfoContext | undefined>(undefined);

const UserInfoProvider = ({ children }: { children: ReactNode }) => {
  const initialUserInfo: IUserInfo = {
    "@mare_access-token": localStorage.getItem("@mare_access-token") || "",
    "@mare_display_name": localStorage.getItem("@mare_display_name") || "",
    "@mare_user_email": localStorage.getItem("@mare_user_email") || "",
    "@mare_user_id": localStorage.getItem("@mare_user_id") || "",
    "@mare_user_role": localStorage.getItem("@mare_user_role") || "",
  };

  const [userInfo, setUserInfoState] = useState<IUserInfo>(initialUserInfo);

  const setUserInfo = (key: keyof IUserInfo, value: string) => {
    setUserInfoState((prevUserInfo) => ({
      ...prevUserInfo,
      [key]: value,
    }));
    localStorage.setItem(key, value);
  };

  const clearUserInfo = () => {
    setUserInfoState({
      "@mare_access-token": "",
      "@mare_display_name": "",
      "@mare_user_email": "",
      "@mare_user_id": "",
      "@mare_user_role": "",
    });
    Object.keys(initialUserInfo).forEach((key) => {
      localStorage.removeItem(key);
    });
  };

  return (
    <UserInfoContext.Provider value={{ userInfo, setUserInfo, clearUserInfo }}>
      {children}
    </UserInfoContext.Provider>
  );
};

const useUserInfo = () => {
  const context = useContext(UserInfoContext);

  if (context === undefined) {
    throw new Error("useUserInfo must be used within a UserInfoProvider");
  }

  return context;
};

export { UserInfoProvider, useUserInfo };
