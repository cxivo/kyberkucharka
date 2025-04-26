import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.tsx";
import About from "./About.tsx";
import ReadRecipe from "./recipeComponents/ReadRecipe.tsx";
import NoPage from "./NoPage.tsx";
import MainPage from "./MainPage.tsx";
import EditRecipe, {
  createSubmit,
  editSubmit,
  forkSubmit,
} from "./recipeComponents/EditRecipe.tsx";
import UserPage from "./userPages/UserPage.tsx";
import Register from "./userPages/Register.tsx";
import Login from "./userPages/Login.tsx";
import IngredientsList from "./admin/IngredientsList.tsx";
import "./styles/index.css";
import "./styles/buttons.css";
import "./styles/cards.css";
import "./styles/recipe.css";
import "./styles/windows.css";
import "./styles/search.css";
import UsersList from "./admin/UsersList.tsx";
import Search from "./Search.tsx";

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
        <Login suggestRegistering={true} closeCallback={undefined}></Login>
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
    path: "/ingredient-list",
    element: (
      <App>
        <IngredientsList></IngredientsList>
      </App>
    ),
  },
  {
    path: "/user-list",
    element: (
      <App>
        <UsersList></UsersList>
      </App>
    ),
  },
  {
    path: "/search",
    element: (
      <App>
        <Search></Search>
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
