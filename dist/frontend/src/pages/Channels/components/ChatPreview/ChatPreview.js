"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const react_redux_1 = require("react-redux");
const chatPreview_module_scss_1 = require("./chatPreview.module.scss");
const fake_avatar_jpg_1 = require("../../../../assets/fake-avatar.jpg");
const chat_trigger_icon_svg_1 = require("../../../../assets/chat-trigger-icon.svg");
const theme1_big_png_1 = require("../../../../assets/theme1-big.png");
const theme2_big_png_1 = require("../../../../assets/theme2-big.png");
const theme3_big_png_1 = require("../../../../assets/theme3-big.png");
const react_fontawesome_1 = require("@fortawesome/react-fontawesome");
const free_solid_svg_icons_1 = require("@fortawesome/free-solid-svg-icons");
function ChatPreview() {
    const settings = react_redux_1.useSelector((state) => state.channels.settings);
    let dispatch = react_redux_1.useDispatch();
    const backgrounds = [
        {
            id: 1,
            path: theme1_big_png_1.default,
        },
        {
            id: 2,
            path: theme2_big_png_1.default,
        },
        {
            id: 3,
            path: theme3_big_png_1.default,
        },
        {
            id: 4,
            path: '',
        },
    ];
    const getBackgroundImageSettings = () => {
        var _a;
        const imagePath = (_a = backgrounds.find((bg) => bg.id === settings.backgroundImage)) === null || _a === void 0 ? void 0 : _a.path;
        if (imagePath)
            return {
                backgroundImage: `url(${imagePath})`,
                backgroundSize: 'cover',
            };
        return {};
    };
    return (<div className={chatPreview_module_scss_1.default.chatPreviewContainer}>
      <div className={chatPreview_module_scss_1.default.chatPreview}>
        <div className={chatPreview_module_scss_1.default.chatPreviewHeader}>
          <p>{settings.chatName}</p>
          <p>Обычно отвечают в течение дня</p>
          {settings.greeting &&
            <p>{settings.greeting}</p>}
        </div>

        <div className={chatPreview_module_scss_1.default.chatPreviewBody} style={getBackgroundImageSettings()}>
          <div className={chatPreview_module_scss_1.default.fakeMessageContainer}>
            <div className={chatPreview_module_scss_1.default.fakeAvatar}>
              <img className={chatPreview_module_scss_1.default.image} src={fake_avatar_jpg_1.default} alt='fake-teammate-avatar'/>
            </div>
            <div className={chatPreview_module_scss_1.default.fakeMessage}>
              Привет.<br />Могу я вам помочь.
            </div>
          </div>

          {Boolean(settings.infochatLinkEnabled) &&
            <p className={chatPreview_module_scss_1.default.infochatLink}>Работает на технологии <span className={chatPreview_module_scss_1.default.link}>InfoChat</span></p>}
        </div>

        <div className={chatPreview_module_scss_1.default.chatPreviewInputArea}>
          <span>Напишите нам…</span>
          <div>
            <react_fontawesome_1.FontAwesomeIcon icon={free_solid_svg_icons_1.faSmileBeam} className={chatPreview_module_scss_1.default.emojiIcon}/>
            <react_fontawesome_1.FontAwesomeIcon icon={free_solid_svg_icons_1.faPaperclip}/>
          </div>
        </div>
      </div>

      <div className={`
          ${chatPreview_module_scss_1.default.chatPreviewTrigger}
          ${settings.buttonText ? chatPreview_module_scss_1.default.buttonTextExistStyles : chatPreview_module_scss_1.default.buttonTextNotExistStyles}
          ${settings.buttonLocation === 'left' ? chatPreview_module_scss_1.default.leftPosition : chatPreview_module_scss_1.default.rightPosition}
        `} style={{
            transform: `scale(${settings.buttonScale})`,
        }}>
        <div>
          {settings.buttonText ?
            <div className={chatPreview_module_scss_1.default.triggerContent}>
              <span className={chatPreview_module_scss_1.default.triggerText}>{settings.buttonText}</span>
              <img src={chat_trigger_icon_svg_1.default} alt='chat-trigger-icon'/>
            </div> :
            <react_fontawesome_1.FontAwesomeIcon icon={free_solid_svg_icons_1.faTimes} color='#fff' size='lg'/>}
        </div>
      </div>
    </div>);
}
exports.default = ChatPreview;
//# sourceMappingURL=ChatPreview.js.map