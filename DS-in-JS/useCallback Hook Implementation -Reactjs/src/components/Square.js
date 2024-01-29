import React from "react";
import { useCountRenders } from "../hooks/useCountRenders";

export const Square = React.memo(({ n, increment }) => {
  useCountRenders();

  return <button onClick={() => increment(n)}>{n}</button>;
});
