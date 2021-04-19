"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.channelsReducer = void 0;
const channels_1 = require("../constants/channels");
const cloneDeep_1 = require("lodash/cloneDeep");
const initialState = {
    channels: [],
    settings: {
        chatName: 'Чат на сайте',
        greeting: '',
        backgroundImage: 1,
        buttonLocation: 'right',
        buttonScale: '1',
        buttonText: '',
        infochatLinkEnabled: 1,
        customCss: '',
    },
    fetching: false,
};
const channelsReducer = (state = initialState, action) => {
    switch (action.type) {
        case channels_1.CHANNELS.ADD:
            return Object.assign(Object.assign({}, state), { channels: action.channels });
        case channels_1.CHANNEL.ADD:
            return Object.assign(Object.assign({}, state), { channels: [...state.channels, { name: action.payload.name, status: 'pending' }] });
        case channels_1.CHANNELS.TOGGLE_FETCHING:
            return Object.assign(Object.assign({}, state), { fetching: !state.fetching });
        case channels_1.CHANNELS.UPDATE_SETTINGS:
            const updatedSettings = {
                settings: Object.assign(state.settings, action.payload),
            };
            return cloneDeep_1.default(Object.assign(state, updatedSettings));
        default:
            return state;
    }
};
exports.channelsReducer = channelsReducer;
//# sourceMappingURL=channels.js.map