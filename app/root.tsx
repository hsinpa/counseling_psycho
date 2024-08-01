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
import { WebsocketManager } from "./websocket/websocket";

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
  const [socket, setSocket] =  useState<WebsocketManager>(new WebsocketManager());

  useEffect(() => {
    socket.connect();

    return () => {
    };
  }, []);
  

  return (<wsContext.Provider value={socket}>
    <Outlet />
  </wsContext.Provider>);
}
