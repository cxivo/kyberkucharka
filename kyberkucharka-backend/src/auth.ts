import { User } from "../../common-interfaces/interfaces";
import { usernameExists } from "./databaseFunctions";

type ValidationResult = undefined | {
    message: string;
    status: number;
};

export async function validateUser(user: User): Promise<ValidationResult> {
    // username
    if (!user.username.match(/[a-zA-Z0-9\-_]{3,}/)) {
        return { message: "Prihlasovacie meno musí mať aspoň 3 znaky, ktoré sú písmená bez diakritiky, číslice, pomlčka alebo podčiarkovník.", status: 400 };
    }

    if (await usernameExists(user.username)) {
        return { message: "Užívateľ s týmto menom už existuje.", status: 409 };
    }

    // display name
    if (!user.display_name.match(/.+/)) {
        return { message: "Meno musí obsahovať aspoň 1 znak.", status: 400 };
    }

    // password
    if (user.password == null || !user.password.match(/.+/)) {
        return { message: "Heslo musí mať aspoň 8 znakov.", status: 400 };
    }

    // everything looks good
    return undefined;
}
