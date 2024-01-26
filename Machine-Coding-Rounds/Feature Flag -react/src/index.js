import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
import { FeatureFlagsProvider } from "./contexts/FeatureFlags";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <FeatureFlagsProvider>
      <App />
    </FeatureFlagsProvider>
  </StrictMode>
);
