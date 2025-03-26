import { Ingredient, Recipe, User } from "../../common-interfaces/interfaces";

export const users: User[] = [
    {
      username: "cxivo",
      display_name: "ĉivo",
      registered_on: new Date(Date.UTC(2025, 3, 20, 19, 8, 20)),
      is_admin: true,
    },
    {
      username: "cimrman",
      display_name: "Jára Cimrman",
      registered_on: new Date(Date.UTC(1970, 1, 1, 0, 0, 0)),
      is_admin: false,
    },
];

export const ingredients: Ingredient[] = [
{
    id: 0,
    name: "mak",
    alt_names: "",
    primary_unit: "gram",
    density: 1,
    mass_per_piece: 0.0001,
    verified: true,
},
{
    id: 1,
    name: "rožok",
    alt_names: "rohlík",
    primary_unit: "piece",
    mass_per_piece: 50,
    verified: true,
},
{
    id: 2,
    name: "mlieko",
    alt_names: "",
    primary_unit: "liter",
    density: 1,
    verified: true,
},
];

export const recipes: Recipe[] = [
{
    id: 0,
    title: "Nulový koláč",
    author: users[1],
    created_on: new Date(Date.UTC(2025, 3, 20, 19, 8, 20)),
    forked_from: undefined,
    description: "nič. vôbec nič.",
    image_link: undefined,
    instructions: "nerob nič.",
    preparation_time: 0,
    tags: [],
    sections: [],
},
{
    id: 1,
    title: "Obzerance s makom",
    author: users[0],
    created_on: new Date(Date.UTC(2025, 1, 20, 19, 8, 20)),
    forked_from: undefined,
    description: "Ideálne pre najedených ľudí",
    image_link:
    "https://paleodobroty.wordpress.com/wp-content/uploads/2015/04/img_8669.jpg",
    instructions: "pozeraj sa do taniera. Pridaj mak.",
    preparation_time: 1,
    tags: [],
    sections: [
    {
        id: 0,
        name: "maková sekcia",
        used_ingredients: [
        {
            id: 0,
            amount: 5,
            ingredient: ingredients[0],
        },
        ],
    },
    ],
},
];
  