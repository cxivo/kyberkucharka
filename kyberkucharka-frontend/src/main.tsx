import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import About from "./About.tsx";
import ReadRecipe from "./ReadRecipe.tsx";
import NoPage from "./NoPage.tsx";
import MainPage from "./MainPage.tsx";
import EditRecipe, {
  createSubmit,
  editSubmit,
  forkSubmit,
} from "./EditRecipe.tsx";
import UserPage from "./userPages/UserPage.tsx";
import Register from './userPages/Register.tsx';
import Login from "./userPages/Login.tsx";

export const serverURL = "http://localhost:3000";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <App>
        <MainPage></MainPage>
      </App>
    ),
  },
  {
    path: "/about",
    element: (
      <App>
        <About></About>
      </App>
    ),
  },
  {
    path: "/recipes/:slug",
    element: (
      <App>
        <ReadRecipe />
      </App>
    ),
  },
  {
    path: "/create",
    element: (
      <App>
        <EditRecipe submitAction={createSubmit} type="create" />
      </App>
    ),
  },
  {
    path: "/fork/:slug",
    element: (
      <App>
        <EditRecipe submitAction={forkSubmit} type="fork" />
      </App>
    ),
  },
  {
    path: "/edit/:slug",
    element: (
      <App>
        <EditRecipe submitAction={editSubmit} type="edit" />
      </App>
    ),
  },
  {
    path: "/login",
    element: (
      <App>
        <Login suggestRegistering={true}></Login>
      </App>
    ),
  },
  {
    path: "/register",
    element: (
      <App>
        <Register></Register>
      </App>
    ),
  },
  {
    path: "/user/:slug",
    element: (
      <App>
        <UserPage></UserPage>
      </App>
    ),
  },
  {
    path: "*",
    element: (
      <App>
        <NoPage />
      </App>
    ),
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>
);
