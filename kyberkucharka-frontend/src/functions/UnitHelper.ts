import { measurement_unit } from "../../../common-interfaces/interfaces";

export function getUnitName(unit: measurement_unit) {
    switch (unit) {
        case "g":
            return "gramy";
        case "ml":
            return "mililitre";
        case "pack":
            return "balenia";
        case "tsp":
            return "lyžičky";
        case "pc":
            return "kusy";
        default:
            return "<neznáme>";
    }
}