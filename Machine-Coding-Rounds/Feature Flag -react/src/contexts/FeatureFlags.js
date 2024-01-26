import React from "react";

import { fetchFeatures } from "../api";

export const FeatureFlags = React.createContext({});

export const FeatureFlagsProvider = ({ children }) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [features, setFeatures] = React.useState({});

  React.useEffect(() => {
    (async () => {
      try {
        const data = await fetchFeatures();
        if (data.features) {
          setFeatures(data.features);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return (
    <FeatureFlags.Provider value={{ features }}>
      {isLoading ? "Loading..." : children}
    </FeatureFlags.Provider>
  );
};

export const useFeatureFlags = () => React.useContext(FeatureFlags);
