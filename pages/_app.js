import UserProvider from "../context/authContext";
import "../styles/globals.css";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    brand: {
      100: "#FDECEE",
      200: "#FBDADE",
      300: "#F9C8CE",
      400: "#f8b5b9",
      500: "#f6a2a8",
      600: "#f49096",
      700: "#f27d85",
      800: "#f06a73",
      900: "#EE5862",
      1000: "#ED4551",
      text_dark: "#181114",
      text_light: "#F4F6F6",
    },
  },
});

const App = ({ Component, pageProps }) => {
  return (
    <UserProvider>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </UserProvider>
  );
};

export default App;
