"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const avatar_module_scss_1 = require("./avatar.module.scss");
function Avatar({ name, size = 'medium', stylesList }) {
    const getUserInitials = (username) => {
        const nameAndSurname = username.split(' ');
        let initials = '';
        for (let word of nameAndSurname) {
            initials = initials.concat(word.charAt(0).toUpperCase());
        }
        return initials;
    };
    return (<div className={`
        ${avatar_module_scss_1.default.defaultAvatar}
        ${size === 'small' ? avatar_module_scss_1.default.small :
            size === 'large' ? avatar_module_scss_1.default.large : avatar_module_scss_1.default.medium} 
      `} style={stylesList}>
      {getUserInitials(name)}
    </div>);
}
exports.default = Avatar;
//# sourceMappingURL=Avatar.js.map