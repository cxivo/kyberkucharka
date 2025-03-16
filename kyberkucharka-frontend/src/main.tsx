import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import About from "./About.tsx";
import Recipe from "./Recipe.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <App>
        <Recipe></Recipe>
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
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>
);
