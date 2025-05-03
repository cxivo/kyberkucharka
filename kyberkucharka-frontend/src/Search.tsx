import { useEffect, useState } from "react";
import Select, { MultiValue } from "react-select";
import {
  Ingredient,
  OptionsList,
  Recipe,
  Tag,
} from "../../common-interfaces/interfaces";
import { fetchIngredients, fetchTags } from "./functions/communicationHelper";
import { useDebounce } from "use-debounce";
import { useSearchParams } from "react-router-dom";
import RecipeCard from "./recipeComponents/RecipeCard";
import HorizontalLine from "./HorizontalLine";


/* const styles: StylesConfig<OptionsList, true> = {
  multiValue: (base, state) => {
    return state.data.isFixed ? { ...base, backgroundColor: 'gray' } : base;
  },
  multiValueLabel: (base, state) => {
    return state.data.isFixed
      ? { ...base, fontWeight: 'bold', color: 'white', paddingRight: 6 }
      : base;
  },
  multiValueRemove: (base, state) => {
    return state.data.isFixed ? { ...base, display: 'none' } : base;
  },
};
 */

/* const orderOptions = (values: readonly OptionsList[]) => {
  return values
    .filter((v) => v.isFixed)
    .concat(values.filter((v) => !v.isFixed));
}; */


export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [availableTags, setAvailableTags] = useState<Tag[]>([]);
  const [requiredTags, setRequiredTags] = useState<Tag[]>([]);
  const [unwantedTags, setUnwantedTags] = useState<Tag[]>([]);

  const [availableIngredients, setAvailableIngredients] = useState<
    Ingredient[]
  >([]);
  const [requiredIngredients, setRequiredIngredients] = useState<Ingredient[]>(
    []
  );
  const [unwantedIngredients, setUnwantedIngredients] = useState<Ingredient[]>(
    []
  );
  const [onlyFromIngredients, setOnlyFromIngredients] = useState<Ingredient[]>(
    []
  );
  const [usingOnlyFrom, setUsingOnlyFrom] = useState<boolean>(false);

  const [foundRecipes, setFoundRecipes] = useState<Recipe[]>([]);

  const [loading, setLoading] = useState<boolean>(true);
  const [invalid, setInvalid] = useState<boolean>(false);

  const [searchText, setSearchText] = useState<string>(
    searchParams?.get("query") ?? ""
  );
  const [debouncedText] = useDebounce(searchText, 500);

  function getParamList(paramName: string): number[] {
    // searchParams.set(paramName, searchParams.get(paramName) ?? "[]");
    return JSON.parse(searchParams.get(paramName) ?? "[]") as number[];
  }

  // load tags and ingredients

  useEffect(() => {
    Promise.all([
      fetchIngredients().then((ingredients) => {
        setAvailableIngredients(ingredients);

        // required
        const paramRequiredList = getParamList("requiredIngredients");
        setRequiredIngredients(
          ingredients.filter(
            (ingredient) => paramRequiredList.indexOf(ingredient.id) >= 0
          )
        );

        // unwanted
        const paramUnwantedList = getParamList("unwantedIngredients");
        setUnwantedIngredients(
          ingredients.filter(
            (ingredient) => paramUnwantedList.indexOf(ingredient.id) >= 0
          )
        );

        // only from
        const paramOnlyFromList = getParamList("onlyFromIngredients");
        setOnlyFromIngredients(
          ingredients.filter(
            (ingredient) => paramOnlyFromList.indexOf(ingredient.id) >= 0 || ingredient.name === "voda" || ingredient.name === "soľ"
          )
        );

        // only from state...?
        if (paramOnlyFromList.length > 0) {
          setUsingOnlyFrom(true);
        }

      }),
      fetchTags().then((tags) => {
        setAvailableTags(tags);

        // required
        const paramRequiredList = getParamList("requiredTags");
        setRequiredTags(
          tags.filter((tag) => paramRequiredList.indexOf(tag.id) >= 0)
        );

        // unwanted
        const paramUnwantedList = getParamList("unwantedTags");
        setUnwantedTags(
          tags.filter((tag) => paramUnwantedList.indexOf(tag.id) >= 0)
        );
      }),
    ]).then(() => setLoading(false));
  }, []);

  // update search params
  useEffect(() => {
    setSearchParams(
      new URLSearchParams({
        query: debouncedText,
        requiredTags: JSON.stringify(requiredTags.map((tag) => tag.id)),
        unwantedTags: JSON.stringify(unwantedTags.map((tag) => tag.id)),
        requiredIngredients: JSON.stringify(
          requiredIngredients.map((ingredient) => ingredient.id)
        ),
        unwantedIngredients: JSON.stringify(
          unwantedIngredients.map((ingredient) => ingredient.id)
        ),
        onlyFromIngredients: JSON.stringify(
          usingOnlyFrom ? 
          onlyFromIngredients.map((ingredient) => ingredient.id)
          : []
        ),
      }),
      {
        replace: true /* prevents every search from being saved into history */,
      }
    );
  }, [
    debouncedText,
    requiredIngredients,
    unwantedIngredients,
    requiredTags,
    unwantedTags,
    onlyFromIngredients,
    usingOnlyFrom
  ]);


  

  function searchRecipes() {
    setLoading(true);
    console.log("searching");
    fetch(`/api/recipes/search?` + searchParams)
      .then((response) => {
        if (response.ok) {
          setInvalid(false);
          response.json().then((recipes) => setFoundRecipes(recipes));
        } else {
          setInvalid(true);
        }
      })
      .then(() => setLoading(false));
  }

  // search
  useEffect(() => {
    if (!loading) {
      searchRecipes();
    }
  }, [searchParams.toString()]);

  // also "search" when loading page
  useEffect(() => {
    searchRecipes();
  }, []);

  function selectForTags(
    id: string,
    placeholder: string,
    defaultTags: Tag[],
    onChange: (e: MultiValue<OptionsList>) => void
  ) {
    return (
      <Select
        id={id}
        className="search-select"
        isLoading={loading}
        options={availableTags.map((tag) => {
          return { value: tag.id, label: tag.name };
        })}
        isMulti
        loadingMessage={() => `Načítavam...`}
        noOptionsMessage={() => "...žiadne tagy s takýmto názvom"}
        placeholder={placeholder}
        value={defaultTags?.map((tag) => {
          return { value: tag.id, label: tag.name };
        })}
        onChange={onChange}
      />
    );
  }

  function selectForIngredients(
    id: string,
    placeholder: string,
    defaultIngredients: Ingredient[],
    onChange: (e: MultiValue<OptionsList>) => void,
    _hasFixed: boolean
  ) {
    return (
      <Select
        id={id}
        className="search-select"
        isLoading={loading}
        options={availableIngredients.map((ingredient) => {
          return {
            value: ingredient.id,
            label: ingredient.name,
            /* isFixed: hasFixed && ingredient.name === "voda", */
          };
        })}
        isMulti
        loadingMessage={() => `Načítavam...`}
        noOptionsMessage={() => "...žiadne ingrediencie s takýmto názvom"}
        placeholder={placeholder}
        value={defaultIngredients?.map((ingredient) => {
          return { value: ingredient.id, label: ingredient.name };
        })}
        /* styles={styles} */
        onChange={onChange}
      />
    );
  }

  return (
    <div className="search-page">
      <title>Vyhľadávanie - Kyberkuchárka</title>
      <div className="search-settings">
        <h1>Hľadať</h1>
        <form>
          <div className="grid-div">
          <label htmlFor="name">Názov: </label>
          <input
            type="text"
            id="name"
            onChange={(e) => setSearchText(e.target.value)}
            value={searchText}
            autoFocus
          />

          <label htmlFor="required-tags">Tagy, ktoré musí recept mať</label>
          {selectForTags(
            "required-tags",
            "Musí mať tagy",
            requiredTags,
            (e) => {
              setRequiredTags(
                e.map((o) => {
                  return { id: o.value, name: o.label };
                })
              );
            }
          )}

          <label htmlFor="unwanted-tags">Tagy, ktoré recept nesmie mať</label>
          {selectForTags(
            "unwanted-tags",
            "Nesmie mať tagy",
            unwantedTags,
            (e) => {
              setUnwantedTags(
                e.map((o) => {
                  return { id: o.value, name: o.label };
                })
              );
            }
          )}

          <label htmlFor="required-ingredients">
            Ingrediencie, ktoré musí recept používať
          </label>
          {selectForIngredients(
            "required-ingredients",
            "Musí používať ingrediencie",
            requiredIngredients,
            (e) => {
              setRequiredIngredients(
                e.map(
                  (o) => availableIngredients.find((i) => i.id === o.value)!
                )
              );
            },
            false
          )}

          <label htmlFor="unwanted-ingredients">
            Ingrediencie, ktoré recept nesmie používať
          </label>
          {selectForIngredients(
            "unwanted-ingredients",
            "Nesmie používať ingrediencie",
            unwantedIngredients,
            (e) => {
              setUnwantedIngredients(
                e.map(
                  (o) => availableIngredients.find((i) => i.id === o.value)!
                )
              );
            },
            false
          )}
          </div>

          <fieldset style={{ border: usingOnlyFrom ? undefined : "none" }}>
            <legend>
              <input
                type="checkbox"
                id="using-only"
                name="using-only"
                checked={usingOnlyFrom}
                onChange={(e) => setUsingOnlyFrom(e.target.checked)}
              ></input>
              <label htmlFor="using-only">Iba z ingrediencií</label>
            </legend>

            {usingOnlyFrom && (
              <>
                <label htmlFor="only-from-ingredients">
                  Recept môže používať iba tieto ingrediencie
                </label>
                {selectForIngredients(
                  "only-from-ingredients",
                  "Môže obsahovať len",
                  onlyFromIngredients,
                  (e) => {
                    setOnlyFromIngredients(
                      e.map(
                        (o) =>
                          availableIngredients.find((i) => i.id === o.value)!
                      )
                    );
                  },
                  true
                )}
              </>
            )}
          </fieldset>
        </form>
      </div>

      <HorizontalLine />

      {loading ? (
        <p>Načítavam...</p>
      ) : invalid ? (
        <p>Nastala neznáma chyba</p>
      ) : foundRecipes.length === 0 ? (
        <p>Nenašli sa žiadne recepty spĺňajúce zadané kritériá :(</p>
      ) : (
        <div className="card-container">
          {foundRecipes?.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe}></RecipeCard>
          ))}
        </div>
      )}
    </div>
  );
}
