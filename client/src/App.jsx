import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import AuthProvider from "./Provider/AuthProvider";
import FlashProvider from "./Provider/FlashProvider";
import GameProvider from "./Provider/GameProvider";

function App() {

  return (
    <FlashProvider>
      <GameProvider>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </GameProvider>
  </FlashProvider>
  )
}

export default App;
