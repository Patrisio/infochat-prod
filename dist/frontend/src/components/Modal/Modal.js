"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const modal_module_scss_1 = require("./modal.module.scss");
const react_fontawesome_1 = require("@fortawesome/react-fontawesome");
const free_solid_svg_icons_1 = require("@fortawesome/free-solid-svg-icons");
function Modal({ show, onClose, title, body, footer, width, height, position = 'center' }) {
    const closeModal = () => {
        onClose();
    };
    return (show ?
        <div>
      <div className={modal_module_scss_1.default.overlay}>
        <div className={`
            ${modal_module_scss_1.default.modalContent}
            ${position === 'center' ? modal_module_scss_1.default.center : modal_module_scss_1.default.top}
          `} style={{ width, height }}>
          <div className={modal_module_scss_1.default.header}>
            <h3 className={modal_module_scss_1.default.title}>{title}</h3>
            <div className={modal_module_scss_1.default.closeIcon} onClick={closeModal}>
              <react_fontawesome_1.FontAwesomeIcon icon={free_solid_svg_icons_1.faTimes} color='#ccc'/>
            </div>
          </div>

          <div className={modal_module_scss_1.default.modalBody}>
            {body}
          </div>

          {footer &&
                <div>
              {footer}
            </div>}
        </div>
      </div>
    </div> :
        null);
}
exports.default = Modal;
//# sourceMappingURL=Modal.js.map