import { createTheme } from "@mui/material/styles";

const primaryColor = "#08284f";
const secColor = "#4f4908";
const secColor2 = "#4f4908";
const tirthColor = "#066932";
const redColor = "#FF0000";

const theme = createTheme({
	fontFamily: [
		"-apple-system"
	].join(","),
	palette: {
        primary: {
            main: primaryColor,
            light: primaryColor,
            dark: primaryColor,
            contrastText: '#fff'
        },
        secondary: {
            main: secColor,
            light: secColor,
            dark: secColor,
            contrastText: '#fff'
        },
        secondary2: {
            main: secColor2,
            light: secColor2,
            dark: secColor2,
            contrastText: '#fff'
        },
        tirth: {
            main: tirthColor,
            light: tirthColor,
            dark: tirthColor,
            contrastText: '#fff'
        },
        red: {
            main: redColor,
            light: redColor,
            dark: redColor,
            contrastText: '#fff'
        }
    }
});

export default theme;