import React from 'react';
import logo from './logo.svg';
import './App.css';
import {createTheme, ThemeProvider} from "@mui/material";
import {Helmet, HelmetProvider} from "react-helmet-async";
import {globalSettings} from "./environments/environments";
import {Outlet} from "react-router-dom";
import {refreshToken, verifyToken} from "./environments/apiHandler";
import {Subject} from "rxjs";

const theme = createTheme({
    palette: {
        primary: {
            main: globalSettings.primaryColor
        }
    },
    typography: {
        fontFamily: [
            globalSettings.fontPrimary,
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(',')
    },
});

export class App extends React.Component<any, any> {

    destroy$ = new Subject()

    constructor(props: any) {
        super(props);

        refreshToken().then(
            res => {
                if (res.status === 200) {
                    return verifyToken(res.data.access_token)
                }
            }
        )
    }

    render() {
        return (
            <ThemeProvider theme={theme}>
                <HelmetProvider>
                    <Helmet>
                        <meta name="viewport"
                              content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
                    </Helmet>
                    <div className="App" style={{fontFamily: globalSettings.fontPrimary}}>
                        <Outlet/>
                    </div>
                </HelmetProvider>
            </ThemeProvider>
        )
    }
}
