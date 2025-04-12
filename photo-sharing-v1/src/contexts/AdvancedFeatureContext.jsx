import React, { createContext, useState } from "react";

export const AdvancedFeatureContext = createContext();

export function AdvancedFeatureProvider({ children }) {
  const [advancedEnabled, setAdvancedEnabled] = useState(false);

  return (
    <AdvancedFeatureContext.Provider value={{ advancedEnabled, setAdvancedEnabled }}>
      {children}
    </AdvancedFeatureContext.Provider>
  );
}
