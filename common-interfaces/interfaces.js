"use strict";
exports.__esModule = true;
exports.CUP_ML = exports.TABLESPOON_ML = exports.TEASPOON_ML = exports.DEFAULT_USER = exports.DEFAULT_INGREDIENT = exports.DEFAULT_RECIPE = exports.NONEXISTENT = exports.measurement_unit_list = void 0;
exports.measurement_unit_list = [
    "g",
    "ml",
    "tsp",
    "pc",
    "pack",
];
////////////////////////////////////////////
exports.NONEXISTENT = -1;
exports.DEFAULT_RECIPE = {
    id: exports.NONEXISTENT,
    author: {
        username: "",
        display_name: "",
        registered_on: new Date(),
        is_admin: false
    },
    title: "",
    preparation_time: 0,
    description: "",
    instructions: "",
    tags: [],
    sections: []
};
exports.DEFAULT_INGREDIENT = {
    id: exports.NONEXISTENT,
    name: "",
    primary_unit: "g",
    alt_names: "",
    verified: false,
    created_on: new Date()
};
exports.DEFAULT_USER = {
    username: "",
    display_name: "",
    is_admin: false
};
exports.TEASPOON_ML = 5;
exports.TABLESPOON_ML = 15;
exports.CUP_ML = 250;
