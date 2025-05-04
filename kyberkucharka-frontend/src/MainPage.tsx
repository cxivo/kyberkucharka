import {
  fetchAllRecipes,
  fetchLatestRecipes,
  fetchRecipesWithTag,
} from "./functions/communicationHelper";
import HorizontalLine from "./HorizontalLine";
import RecipeList from "./RecipeList";

export default function MainPage() {
  return (
    <div className="main-page">
      <title>Kyberkuchárka!</title>
      <h1>Vitajte na Kyberkuchárke!</h1>

      <h2>Najnovšie recepty</h2>
      <RecipeList
        dataSource={fetchLatestRecipes()}
        flexColumn={false}
      ></RecipeList>

      <HorizontalLine />

      <h2>Koláče</h2>
      <RecipeList
        dataSource={fetchRecipesWithTag(3 /* ID of tag "koláče" */)}
        flexColumn={false}
      ></RecipeList>

      <HorizontalLine />

      <h2>Sušienky</h2>
      <RecipeList
        dataSource={fetchRecipesWithTag(8 /* ID of tag "sušienky" */)}
        flexColumn={false}
      ></RecipeList>

      <HorizontalLine />

      <h2>Vegetariánsky výber</h2>
      <RecipeList
        dataSource={fetchRecipesWithTag(14 /* ID of tag "vegetariánske" */)}
        flexColumn={false}
      ></RecipeList>

      <HorizontalLine />

      {/* This will probably be removed once there are too many recipes on the site */}
      <h2>Všetky recepty na stránke</h2>
      <RecipeList
        dataSource={fetchAllRecipes()}
        flexColumn={false}
      ></RecipeList>
    </div>
  );
}
