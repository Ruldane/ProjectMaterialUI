import { createMuiTheme } from '@material-ui/core/styles';

const arcBlue = "#0B72b9"
const arcOrange = "#FFBA60"

export default createMuiTheme({
   palette: {
       common: {
           arcBlue: `${arcBlue}`,
           arcOrange: `${arcOrange}`
       },
       primary: {
           main: `${arcBlue}`
       },
       secondary: {
           main: `${arcOrange}`
       },
   },
    typography: {
       tab: {
           fontFamily: "Raleway",
           textTransform: "none",
           fontWeight: 700,
           fontSize: "1rem",
       },
        estimate: {
            fontFamily: "Pacifico",
            fontSize: "1rem",
            textTransform: "none",
            color: "white"
        }
    }
});