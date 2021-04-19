"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const constants_1 = require("../../utils/constants");
const animal_module_scss_1 = require("./animal.module.scss");
class Animal extends react_1.Component {
    validateName() {
        const { name } = this.props;
        if (name) {
            const lower = name.toLowerCase();
            const foundName = constants_1.animals.find(animal => animal.animal === lower);
            if (foundName) {
                return foundName;
            }
            return {
                animal: 'wolf',
                translate: 'Волк'
            };
        }
        return constants_1.animals[Math.random() * constants_1.animals.length << 0];
    }
    getAvatar(avatarName) {
        return require(`./animals/${avatarName}.png`).default;
    }
    validateColor() {
        const { color } = this.props;
        if (color) {
            const lower = color.toLowerCase();
            const foundColor = constants_1.colors.find(color => (color.color).toLowerCase() === lower);
            if (foundColor) {
                return foundColor;
            }
            else {
                return {
                    color: '#006CFE',
                    translate: 'Синий'
                };
            }
        }
        const keys = Object.keys(constants_1.colors);
        return constants_1.colors[(keys.length * Math.random()) << 0];
    }
    validateSize() {
        const { size } = this.props;
        if (size) {
            if (size.match(/(^\d*)(em|ex|%|px|cm|mm|in|pt|pc|ch|rem|vh|vw|vmin|vmax)/)) {
                return size;
            }
            else {
                console.error(`InvalidSize: '${size}' is not a valid CSS width property. Using '70px' instead.`);
            }
        }
        return "70px";
    }
    borderRadius() {
        const { rounded, square } = this.props;
        if (rounded) {
            return "10%";
        }
        else if (square) {
            return "0px";
        }
        return "50%";
    }
    render() {
        const { dance, classNames } = this.props;
        let avatarName = this.validateName();
        let avatarImage = this.getAvatar(avatarName.animal);
        let avatarColor = this.validateColor();
        let avatarSize = this.validateSize();
        let avatarStyle = {
            '--a-bg-color': avatarColor.color,
            '--a-size': avatarSize,
            '--a-border-radius': this.borderRadius()
        };
        let conditionalClass = dance ? `${animal_module_scss_1.default.animalImage} ${animal_module_scss_1.default.animalDance}` : animal_module_scss_1.default.animalImage;
        return (<div className={`${animal_module_scss_1.default.animalAvatar} ${classNames}`} style={avatarStyle}>
        <img src={avatarImage} alt={avatarName.animal} className={conditionalClass}/>
      </div>);
    }
}
exports.default = Animal;
//# sourceMappingURL=Animal.js.map