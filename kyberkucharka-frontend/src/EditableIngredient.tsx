import { UsedIngredient } from "../../common-interfaces/interfaces";
import {
  amountToGrams,
  getUnitName,
  gramsToAmountUsed,
} from "./functions/UnitHelper";

interface EditableIngredientProps {
  index: number;
  used_ingredient: UsedIngredient;
  setAmount: (index: number, amount: number) => void;
  deleteIngredient: (index: number) => void;
}

export default function EditableIngredient({
  index,
  used_ingredient,
  setAmount,
  deleteIngredient,
}: EditableIngredientProps) {
  return (
    <div className="ingredient">
      <input
        type="number"
        step={0.05}
        min={0}
        defaultValue={gramsToAmountUsed(used_ingredient)}
        onInput={(x) => {
          setAmount(
            index,
            amountToGrams(+x.currentTarget.value, used_ingredient.ingredient)
          );
        }}
        onBlur={(e) => {
          e.currentTarget.value = e.currentTarget.value || "0";
        }}
      />
      {getUnitName(used_ingredient.ingredient.primary_unit)}
      {" - "}
      {used_ingredient.ingredient.name}
      <button
        type="button"
        onClick={() => {
          deleteIngredient(index);
        }}
      >
        Zmaž
      </button>
    </div>
  );
}
