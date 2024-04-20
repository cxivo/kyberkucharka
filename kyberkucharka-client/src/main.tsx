import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import UserList from "./pages/UserList.tsx";
import { ErrorPage } from "./pages/error/ErrorPage.tsx";
import { getUsers } from "./api/getUsers.ts";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} errorElement={<ErrorPage />}>
      <Route
        path="users"
        element={<UserList />}
        loader={async () => {
          return await getUsers();
        }}
      />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
