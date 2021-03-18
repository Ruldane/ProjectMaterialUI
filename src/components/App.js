import React from "react";
import Header from "./ui/Header";
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import theme from "./ui/Theme"

function App() {
  return (
    <ThemeProvider theme={theme}>
        <Header />
        hello
    </ThemeProvider>
  );
}

export default App;
