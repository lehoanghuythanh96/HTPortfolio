import React, {useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import {createTheme, ThemeProvider} from "@mui/material";
import {Helmet, HelmetProvider} from "react-helmet-async";
import {globalSettings} from "./environments/environments";
import {Outlet} from "react-router-dom";
import {refreshToken, verifyToken} from "./environments/apiHandler";
import {Subject} from "rxjs";
import { useDispatch } from 'react-redux';
import {setUserInfo} from "./store/reducers/userinfo.reducer";

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

export const App = () => {

    let dispatcher = useDispatch()

    useEffect(
        () => {
            refreshToken().then(
                async res => {
                    if (res.status === 200) {
                        let checker = await verifyToken(res.data.access_token)
                        if (checker.status === 200 && checker.data) {
                            dispatcher(setUserInfo(checker.data))
                        }
                    }
                }
            )
        }
    )

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
