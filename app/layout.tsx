"use client";

import React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider } from "@emotion/react";
import createEmotionCache from "../src/styles/createEmotionCache";
import theme from "../src/styles/theme";

import { MsalProvider } from "@azure/msal-react";
import { PublicClientApplication, EventType } from "@azure/msal-browser";
import { msalConfig } from "../src/authConfig";
import Grid from "@mui/material/Grid";
import NavBar from "../src/ui-components/NavBar";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

const msalInstance = new PublicClientApplication(msalConfig);

msalInstance.initialize().then(() => {
  // Account selection logic is app dependent. Adjust as needed for different use cases.
  const accounts = msalInstance.getAllAccounts();
  if (accounts.length > 0) {
    msalInstance.setActiveAccount(accounts[0]);
  }

  msalInstance.addEventCallback((event) => {
    // @ts-ignore
    if (event.eventType === EventType.LOGIN_SUCCESS && event.payload.account) {
      // @ts-ignore
      const account = event.payload.account;
      msalInstance.setActiveAccount(account);
    }
  });
});

export default function RootLayout(props) {
  return (
    <html>
      <body>
        <CacheProvider value={clientSideEmotionCache}>
          <Head>
            <title>MSAL-React Next.js Sample</title>
            <meta
              name="viewport"
              content="minimum-scale=1, initial-scale=1, width=device-width"
            />
          </Head>
          <ThemeProvider theme={theme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <MsalProvider instance={msalInstance}>
              <NavBar />
              <Grid container justifyContent="center">
                {props.children}
              </Grid>
            </MsalProvider>
          </ThemeProvider>
        </CacheProvider>
      </body>
    </html>
  );
}
