import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import "bulma";
import "./share_styles/base.scss";
import { createContext, useEffect, useState } from "react";
import { WebsocketManager } from "./websocket/websocket.client";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export let wsContext = createContext<WebsocketManager | undefined>(undefined);

export default function App() {
  let [socket, setSocket] =  useState<WebsocketManager>();

  useEffect(() => {
    let websocket_manager = new WebsocketManager();
    // websocket_manager.connect();

    setSocket(websocket_manager);
    return () => {
    };
  }, []);
  

  return (<wsContext.Provider value={socket}>
    <Outlet />
  </wsContext.Provider>);
}
