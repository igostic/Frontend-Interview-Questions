export const fetchFeatures = async () => {
  const features = {
    isGooglePayEnabled: false,
    isApplePayEnabled: false
  };

  return Promise.resolve({ features });
};
