import {
  fetchAllRecipes,
  fetchLatestRecipes,
  fetchRecipesWithRandomTag,
} from "./functions/communicationHelper";
import HorizontalLine from "./HorizontalLine";
import InfoCard from "./staticPages/InfoCard";
import RecipeList from "./RecipeList";
import { useEffect, useState } from "react";
import { RecipesOfTag } from "../../common-interfaces/interfaces";
import { capitalizeFirstLetter } from "./functions/commonFunctions";

export default function MainPage() {
  const [recipesOfTag, setRecipesOfTag] = useState<RecipesOfTag[]>([]);

 useEffect(() => {
  const fetchData = async () => {
    const data = await fetchRecipesWithRandomTag();
    setRecipesOfTag(data);
  };
  fetchData();
}, []);


  return (
    <div className="main-page">
      <title>Kyberkuchárka!</title>
      <h1>Vitajte na Kyberkuchárke!</h1>

      <div className="card-container">
        <InfoCard
          title="Ako používať Kyberkuchárku?"
          text="Nie je to zložité, ale je dobré využiť možnosti stránky na sto percent"
          link="/how-to-use"
        />
        <InfoCard
          title="Ako čítať zahraničné recepty?"
          text={`Čo sakra je "cake flour", koľko je jedna libra a ako sa vôbec povie po anglicky "polohrubá múka"?`}
          link="/unit-conversion"
        />
      </div>

      <h2>Najnovšie recepty</h2>
      <RecipeList
        dataSource={fetchLatestRecipes()}
        flexColumn={false}
      ></RecipeList>
      <HorizontalLine />

      {recipesOfTag?.map((r) => (
        <div key={r.tag.id}>
          <RecipeList
            dataSource={Promise.resolve(r.partialRecipes)}
            flexColumn={false}
            displayText={capitalizeFirstLetter(r.tag.name)}
          ></RecipeList>
          <HorizontalLine />
        </div>
      ))}

      {/* This will probably be removed once there are too many recipes on the site */}
      <h2>Všetky recepty na stránke</h2>
      <RecipeList
        dataSource={fetchAllRecipes()}
        flexColumn={false}
      ></RecipeList>
    </div>
  );
}
