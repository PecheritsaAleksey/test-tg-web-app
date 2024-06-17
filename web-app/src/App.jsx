import { useEffect, useState } from "react";
import { useTelegram } from "../hooks/useTelegram";

function App() {
  const { tg, onToggleButton } = useTelegram();

  useEffect(() => {
    tg.ready();
  }, []);

  return (
    <>
      <button onClick={onToggleButton}>Toggle</button>
    </>
  );
}

export default App;
