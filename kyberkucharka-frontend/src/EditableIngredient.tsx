import { UsedIngredient } from "../../common-interfaces/interfaces";

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
        defaultValue={used_ingredient.amount}
        onInput={(x) => {
          setAmount(index, +x.currentTarget.value);
        }}
        onBlur={(e) => {
          e.currentTarget.value = e.currentTarget.value || "0";
        }}
      />
      {used_ingredient.ingredient.primary_unit} -
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
