import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import AuthProvider from "./Provider/AuthProvider";
import FlashProvider from "./Provider/FlashProvider";

function App() {

  return (
    <FlashProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
  </FlashProvider>
  )
}

export default App;
