import { UsedIngredient } from "../../../common-interfaces/interfaces";
import {
  amountToGrams,
  formatAmount,
  gramsToAmountUsed,
} from "../functions/UnitHelper";

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
    <li>
      <span>
        <input
          className="p-like"
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
        {formatAmount(used_ingredient)}
        {" - "}
        {used_ingredient.ingredient.name}
      </span>
      <img
        src="/x.png"
        alt="Zmazať ingredienciu"
        tabIndex={0}
        className="cancel-x delete-ingredient"
        onClick={() => {
          deleteIngredient(index);
        }}
      />
    </li>
  );
}
