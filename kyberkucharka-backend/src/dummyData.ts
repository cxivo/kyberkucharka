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
    id: 1,
    name: "mak",
    alt_names: "",
    primary_unit: "g",
    density: 1,
    mass_per_piece: 0.0001,
    verified: true,
  },
  {
    id: 2,
    name: "rožok",
    alt_names: "rohlík",
    primary_unit: "pc",
    mass_per_piece: 50,
    verified: true,
  },
  {
    id: 3,
    name: "mlieko",
    alt_names: "",
    primary_unit: "ml",
    density: 1,
    verified: true,
  },
  {
    id: 4,
    name: "krajec chleba",
    alt_names: "chlebík",
    primary_unit: "pc",
    mass_per_piece: 50,
    verified: false,
  },
  {
    id: 5,
    name: "maslo",
    alt_names: "",
    primary_unit: "g",
    density: 1,
    verified: false,
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
  {
    id: 2,
    title: "Lacné raňajky",
    author: users[0],
    created_on: new Date(Date.UTC(2020, 1, 2, 19, 8, 20)),
    forked_from: undefined,
    description: "Tradičné raňajky podľa tradičného receptu",
    image_link:
      "https://upload.wikimedia.org/wikipedia/commons/a/a5/Glass_of_Milk_%2833657535532%29.jpg",
    instructions:
      "Do pohára nalej mlieko a natrhaj doňho rožok. Medzitým si vedľa natri krajec chleba maslom. Podávame pri ľubovoľnej teplote.",
    preparation_time: 4,
    tags: [],
    sections: [
      {
        id: 0,
        name: "Mlieko s rožkom",
        used_ingredients: [
          {
            id: 0,
            amount: 1,
            ingredient: ingredients[1],
          },
          {
            id: 1,
            amount: 0.2,
            ingredient: ingredients[2],
          },
        ],
      },
      {
        id: 1,
        name: "Chleba s maslom",
        used_ingredients: [
          {
            id: 0,
            amount: 2,
            ingredient: ingredients[3],
          },
          {
            id: 1,
            amount: 15,
            ingredient: ingredients[4],
          },
        ],
      },
    ],
  },
];
  