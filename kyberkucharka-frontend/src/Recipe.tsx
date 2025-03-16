export default function Recipe() {
  return (
    <div className="recipe">
      <h2>Názov receptu</h2>
      <img src="https://i.imgur.com/MK3eW3Am.jpg" alt="Katherine Johnson" />
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
    </div>
  );
}
