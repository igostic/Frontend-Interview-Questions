import React, { useState } from "react";

// now we can use this FeatureFlag
// throwout the application
// in the component that
// that has FeatureFlag
// provider
// To use the context we
// have to wrap the component
// featureflag provider
export const FeatureFlag = React.createContext({});

export const FeatureFlagProvider = ({ children }) => {
  // as we need to call the api
  // will persist it in state
  const [features, setFeatures] = useState({
    isGooglePayEnabled: true,
    isApplePayEnabled: false
  });
  // value passed as object so {{}}
  return (
    <FeatureFlag.Provider value={{ features }}>{children}</FeatureFlag.Provider>
  );
};
