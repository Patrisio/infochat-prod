"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getClientName = void 0;
const constants_1 = require("./constants");
const getClientName = (color, name) => {
    var _a, _b;
    const colorTranslate = (_a = constants_1.colors.find(animalColor => animalColor.color === color)) === null || _a === void 0 ? void 0 : _a.translate;
    const animalNameTranslate = (_b = constants_1.animals.find(animalName => animalName.animal === name)) === null || _b === void 0 ? void 0 : _b.translate;
    return `${colorTranslate} ${animalNameTranslate}`;
};
exports.getClientName = getClientName;
//# sourceMappingURL=clientData.js.map