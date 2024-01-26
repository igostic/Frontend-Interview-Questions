import "./styles.css";
import React from "react";

import { FeatureFlagProvider, FeatureFlag } from "./context/FeatureFlag";

const Example = () => {
  // const { features } = React.useContext(FeatureFlag);
  /*
  return (
    <>
      <h1>{features.isGooglePayEnabled ? "Google" : ""}</h1>
      <h1>{features.isApplePayEnabled ? "Apple" : ""}</h1>
    </>
  ); */
  // Instead of writing it manually we
  // should create a feature comp

  return (
    <>
      <Feature feature="isGooglePayEnabled" value={true}>
        Google
      </Feature>
      <Feature feature="isApplePayEnabled" value={false}>
        Apple
      </Feature>
    </>
  );
};

const Feature = ({ feature, children, value }) => {
  const { features } = React.useContext(FeatureFlag);
  return features[feature] === value ? children : null;
};

export default function App() {
  return (
    <FeatureFlagProvider>
      <Example />
    </FeatureFlagProvider>
  );
}
