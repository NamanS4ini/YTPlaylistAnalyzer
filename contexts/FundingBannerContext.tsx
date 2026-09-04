"use client";

import { createContext, useContext, useState } from "react";

interface FundingBannerContextType {
  isBannerVisible: boolean;
  setIsBannerVisible: (v: boolean) => void;
}

const FundingBannerContext = createContext<FundingBannerContextType>({
  isBannerVisible: false,
  setIsBannerVisible: () => {},
});

export const FundingBannerProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isBannerVisible, setIsBannerVisible] = useState(false);
  return (
    <FundingBannerContext.Provider value={{ isBannerVisible, setIsBannerVisible }}>
      {children}
    </FundingBannerContext.Provider>
  );
};

export const useFundingBanner = () => useContext(FundingBannerContext);
