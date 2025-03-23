import { ReactNode, useEffect, useState } from "react";
import { Ingredient, Section, UsedIngredient } from "../../common-interfaces/interfaces";
import EditableIngredient from "./EditableIngredient";
import { useDebounce } from "use-debounce";
import { serverURL } from "./main";

interface EditableSectionProps {
    section: Section, 
    index: number, 
    deleteSection: (index: number) => void, 
    setSection: (index: number, section: Section) => void
}

export default function EditableSection({section, index, deleteSection, setSection}: EditableSectionProps): ReactNode {
    const [nextUsedIngredientID, setNextUsedIngredientID] = useState<number>(0);
    const [searchText, setSearchText] = useState<string>("");
    const [debouncedText] = useDebounce(searchText, 500);
    const [selectableIngredients, setSelectableIngredients] = useState<Ingredient[]>([]);

    useEffect(() => {
        setNextUsedIngredientID(section.used_ingredients.reduce((x, y) => x && x.id > y.id ? x : y, {id: 0}).id + 1);
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                `${serverURL}/api/ingredients/name/${debouncedText}`
                );
                const result = (await response.json()) as Ingredient[];
                
                setSelectableIngredients(result);
                console.log(result);
            } catch (error) {
            console.error("Error fetching data:", error);
            }
        };

        if (debouncedText !== "") {
            fetchData(); 
        }
    }, [debouncedText])

    function addIngredient(ingredient: Ingredient) {
        const newSection: Section = { ...section};
        newSection.used_ingredients.push({id: nextUsedIngredientID, ingredient, amount: 0});
        setNextUsedIngredientID(nextUsedIngredientID + 1);
        setSection(index, newSection);
    }

    function changeTitle(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const newSection: Section = { ...section, name: e.target.value};
        setSection(index, newSection);
    }

    return <div className="section">
        <button type="button" onClick={() => {deleteSection(index)}}>Zmaž sekciu</button>
        <div>
            <label htmlFor={`section ${index}`}>názov sekcie: </label>
            <input id={`section ${index}`} type="text" defaultValue={section.name ?? ""} onChange={changeTitle} />
            
            {
                section.used_ingredients.map(((usedIngredient: UsedIngredient) => 
                <EditableIngredient key={usedIngredient.id} used_ingredient={usedIngredient}/>))
            }

            <input
                list="selectable-ingredients"
                defaultValue={""}
                onChange={(e) => {
                    setSearchText(e.target.value);
                }}
            />
            <datalist id="selectable-ingredients">
                {selectableIngredients.length > 0 ? 
                    (selectableIngredients.map(ingredient => 
                        <option key={ingredient.id} value={ingredient.name}></option>
                    ))
                : 
                    <option value=""></option>
                }
            </datalist>
            <p>Actual value: {searchText}</p>
            <p>Debounced value: {debouncedText}</p>
        </div>
    </div>
}