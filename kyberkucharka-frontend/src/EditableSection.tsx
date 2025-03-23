import { ReactNode, useEffect, useState } from "react";
import { Ingredient, Section, UsedIngredient } from "../../common-interfaces/interfaces";
import EditableIngredient from "./EditableIngredient";
import { serverURL } from "./main";
import Select from "react-select";

interface EditableSectionProps {
  section: Section;
  index: number;
  deleteSection: (index: number) => void;
  setSection: (index: number, section: Section) => void;
}

type OptionsList = {
  value: number;
  label: string;
};

export default function EditableSection({
  section,
  index,
  deleteSection,
  setSection,
}: EditableSectionProps): ReactNode {
  const [nextUsedIngredientID, setNextUsedIngredientID] = useState<number>(0);
  //const [debouncedText] = useDebounce(searchText, 500);
  const [selectableIngredients, setSelectableIngredients] = useState<
    Ingredient[]
  >([]);

  const [selectedOption, setSelectedOption] = useState<
    Ingredient | undefined
  >();

  const [optionsList, setOptionsList] = useState<OptionsList[]>([]);

  // convert the list of ingredients from the server into a list of options for the Select
  useEffect(() => {
    setOptionsList(
      selectableIngredients.map((ingredient) => {
        return { value: ingredient.id, label: ingredient.name };
      })
    );
  }, [selectableIngredients]);

  useEffect(() => {
    setNextUsedIngredientID(
      section.used_ingredients.reduce((x, y) => (x && x.id > y.id ? x : y), {
        id: 0,
      }).id + 1
    );
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          //`${serverURL}/api/ingredients/name/${debouncedText}`
          `${serverURL}/api/ingredients`
        );
        const result = (await response.json()) as Ingredient[];

        setSelectableIngredients(result);
        console.log(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  function addIngredient(ingredient: Ingredient) {
    const newSection: Section = { ...section };
    newSection.used_ingredients.push({
      id: nextUsedIngredientID,
      ingredient,
      amount: 0,
    });
    setNextUsedIngredientID(nextUsedIngredientID + 1);
    setSection(index, newSection);
  }

  // when the section is renamed
  function changeTitle(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const newSection: Section = { ...section, name: e.target.value };
    setSection(index, newSection);
  }

  // when user selects an igredient, add it
  function selectChange(newValue: OptionsList | null) {
    const selected = selectableIngredients.find(
      (ingredient) => ingredient.id === newValue?.value
    );

    if (selected) {
      addIngredient(selected);
      setSelectedOption(undefined); // reset, so the Select element is clear again
    }
  }

  function setIngredientAmount(ingredientIndex: number, amount: number) {
    const newSection: Section = { ...section };
    newSection.used_ingredients[ingredientIndex].amount = amount;
    setSection(index, newSection);
  }

  function deleteIngredient(ingredientIndex: number) {
    const newSection: Section = { ...section };
    newSection.used_ingredients.splice(ingredientIndex, 1);
    setSection(index, newSection);
  }

  return (
    <div className="section">
      <button
        type="button"
        onClick={() => {
          deleteSection(index);
        }}
      >
        Zmaž sekciu
      </button>
      <div>
        <label htmlFor={`section ${index}`}>názov sekcie: </label>
        <input
          id={`section ${index}`}
          type="text"
          defaultValue={section.name ?? ""}
          onChange={changeTitle}
        />

        {section.used_ingredients.map(
          (usedIngredient: UsedIngredient, index) => (
            <EditableIngredient
              key={section.id.toString() + "-" + usedIngredient.id.toString()}
              index={index}
              setAmount={setIngredientAmount}
              used_ingredient={usedIngredient}
              deleteIngredient={deleteIngredient}
            />
          )
        )}

        <Select
          className="select-thing"
          options={optionsList}
          onChange={selectChange}
          value={
            selectedOption
              ? {
                  value: selectedOption?.id ?? 0,
                  label: selectedOption?.name ?? "",
                }
              : null
          }
        />
      </div>
    </div>
  );
}