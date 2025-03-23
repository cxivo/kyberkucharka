export default function EditableIngredient({used_ingredient}: any) {
    return <div className="ingredient">
        <p>
        {used_ingredient.ingredient.name}: {used_ingredient.amount}{" "}
        {used_ingredient.ingredient.primary_unit}
        </p>
    </div>
}