import { ReactNode, useEffect, useState } from "react";
import { Ingredient, Section, UsedIngredient } from "../../common-interfaces/interfaces";
import EditableIngredient from "./EditableIngredient";
import CreatableSelect from "react-select/creatable";

interface EditableSectionProps {
  section: Section;
  index: number;
  deleteSection: (index: number) => void;
  setSection: (index: number, section: Section) => void;
  selectableIngredients: Ingredient[];
  createNewIngredient: (
    possibleName: string,
    thenCall: (i: Ingredient) => void
  ) => void;
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
  selectableIngredients,
  createNewIngredient,
}: EditableSectionProps): ReactNode {
  const [nextUsedIngredientID, setNextUsedIngredientID] = useState<number>(0);
  //const [debouncedText] = useDebounce(searchText, 500);

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
      section?.used_ingredients?.reduce((x, y) => (x && x.id > y.id ? x : y), {
        id: 0,
      }).id + 1
    );
  }, []);

  function addIngredient(ingredient: Ingredient) {
    console.log(ingredient);
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
  function changeTitle(title: string) {
    const newSection: Section = { ...section, name: title };
    setSection(index, newSection);
  }

  // when user selects an igredient, add it
  function selectChange(newValue: OptionsList | null) {
    console.log(newValue);
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
    newSection.used_ingredients ??= [];
    setSection(index, newSection);
  }

  return (
    <div className="section">
      <div className="section-name">
        <h3
          id={`section ${index}`}
          contentEditable="plaintext-only"
          suppressContentEditableWarning={true}
          onBlur={(e) => changeTitle(e.target.innerText.trim())}
        >
          {section.name || "<Sem môžete vložiť názov sekcie>"}
        </h3>
        <img
          src="/src/assets/x.png"
          alt="Zmazať sekciu"
          tabIndex={0}
          className="cancel-x delete-section"
          onClick={() => {
            deleteSection(index);
          }}
        />
      </div>

      <ul className="ingredients-list editable-ingredients-list nothing-doer">
        {section?.used_ingredients?.map(
          (usedIngredient: UsedIngredient, index) => (
            <EditableIngredient
              key={
                section?.id?.toString() + "-" + usedIngredient?.id?.toString()
              }
              index={index}
              setAmount={setIngredientAmount}
              used_ingredient={usedIngredient}
              deleteIngredient={deleteIngredient}
            />
          )
        )}
      </ul>

      <CreatableSelect
        className="select-thing"
        isLoading={optionsList.length === 0}
        options={optionsList}
        onChange={selectChange}
        loadingMessage={() => `Načítavam...`}
        noOptionsMessage={() => "...nič? divné"}
        formatCreateLabel={(text: string) =>
          `Vytvor novú ingredienciu: ${text}`
        }
        onCreateOption={(name: string) => {
          createNewIngredient(name, addIngredient);
        }}
        placeholder="Vyber ingredienciu..."
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
  );
}