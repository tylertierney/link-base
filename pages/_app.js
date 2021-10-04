import AuthContextProvider from "../context/authContext";
import "../styles/globals.css";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import "@fontsource/fredoka-one";
import "@fontsource/lato";
import "@fontsource/poppins";

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
  fonts: {
    heading: "Lato",
    body: "Poppins",
  },
});

const App = ({ Component, pageProps }) => {
  return (
    <AuthContextProvider>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </AuthContextProvider>
  );
};

export default App;
