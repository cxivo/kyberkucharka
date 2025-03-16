import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Recipe() {
  const [recipeData, setRecipeData] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);

  let { slug } = useParams();
  if (!slug) {
    slug = "0";
  }

  const apiCall = () => {
    axios.get("http://localhost:3000").then((data) => {
      //this console.log will be in our frontend console
      console.log(data);
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulating a delay to show loading state
        setTimeout(async () => {
          const response = await fetch(
            `http://localhost:3000/api/recipes/${slug}`
          );
          const result = await response.json();
          setRecipeData(result);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="recipe">
      {loading ? (
        <p>načítavam...</p>
      ) : (
        <>
          <h2>{recipeData.title}</h2>
          <img src="https://i.imgur.com/MK3eW3Am.jpg" alt="Katherine Johnson" />
          <p>autor: {recipeData.author}</p>
          <p>Tento recept robia odjakživa moja stará mama (na obrázku)</p>
          <h3>Ingrediencie</h3>
          <ul className="ingredientList">
            <li>Milý pohľad</li>
            <li>Vrúcne srdce</li>
            <li>Veľa lásky</li>
            <li>Štipka humoru</li>
          </ul>
          <h3>Postup</h3>
          <p>Všetko zmiešame a posypané láskou podávame.</p>
        </>
      )}
      <button onClick={apiCall}>apikól</button>
    </div>
  );
}
