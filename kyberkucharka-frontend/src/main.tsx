import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import About from "./About.tsx";
import ReadRecipe from "./ReadRecipe.tsx";
import NoPage from "./NoPage.tsx";
import MainPage from "./MainPage.tsx";
import EditRecipe from "./EditRecipe.tsx";

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
    path: "/edit",
    element: (
      <App>
        <EditRecipe />
      </App>
    ),
  },
  {
    path: "/edit/:slug",
    element: (
      <App>
        <EditRecipe />
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
