import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { store } from "../redux/reducers";
import "../styles/globals.css";
import AuthProvider from "./components/AuthProvider";
import "react-toastify/dist/ReactToastify.css";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <div>
        <AuthProvider>
          <ChakraProvider>
            <Component {...pageProps} />
          </ChakraProvider>
        </AuthProvider>
      </div>
      <ToastContainer />
    </Provider>
  );
}

export default MyApp;
