"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const react_router_1 = require("react-router");
const react_redux_1 = require("react-redux");
const Table_1 = require("../../components/Table/Table");
const Button_1 = require("../../components/Button/Button");
const Modal_1 = require("../../components/Modal/Modal");
const Title_1 = require("../../components/Title/Title");
const Switcher_1 = require("../../components/Switcher/Switcher");
const Accordion2_1 = require("../../components/Accordion2/Accordion2");
const InstallBlock_1 = require("./components/InstallBlock/InstallBlock");
const GeneralSettingsBlock_1 = require("./components/GeneralSettingsBlock/GeneralSettingsBlock");
const OperatorsBlock_1 = require("./components/OperatorsBlock/OperatorsBlock");
const ClockBlock_1 = require("./components/ClockBlock/ClockBlock");
const AutomationBlock_1 = require("./components/AutomationBlock/AutomationBlock");
const ChatPreview_1 = require("./components/ChatPreview/ChatPreview");
const channels_module_scss_1 = require("./channels.module.scss");
const cloneDeep_1 = require("lodash/cloneDeep");
const actions_1 = require("../../actions");
const chat_svg_1 = require("../../assets/chat.svg");
const chat_channels_svg_1 = require("../../assets/chat-channels.svg");
const invite_svg_1 = require("../../assets/invite.svg");
const clock_svg_1 = require("../../assets/clock.svg");
const install_svg_1 = require("../../assets/install.svg");
const operators_svg_1 = require("../../assets/operators.svg");
const style_svg_1 = require("../../assets/style.svg");
function Channels() {
    const [isModalAddChannelShow, setStateModal] = react_1.useState(false);
    const [currentModal, setModalProps] = react_1.useState({
        show: false,
        title: '',
        body: null,
        footer: null,
        onClose: () => setModalProps(Object.assign(currentModal, { show: false })),
        width: '',
        height: '',
    });
    const connectedChannels = react_redux_1.useSelector((state) => state.channels.channels);
    let dispatch = react_redux_1.useDispatch();
    let { projectId } = react_router_1.useParams();
    const getChannelPreview = (data) => {
        switch (data) {
            case 'chat':
                return chat_channels_svg_1.default;
        }
    };
    const getChannelName = (name) => {
        switch (name) {
            case 'chat':
                return 'Чат на сайте';
        }
    };
    const getChannelStatus = (status) => {
        switch (status) {
            case 'pending':
                return 'Ожидание';
            case 'disabled':
                return 'Выключено';
        }
    };
    const StatusSwitcher = (data) => {
        const [statuses, setStatus] = react_1.useState([data.status, 'disabled']);
        const [prevStatus, setNewStatus] = react_1.useState(data.status);
        return (<div className={channels_module_scss_1.default.switcher}>
        <span className={`
          ${channels_module_scss_1.default.switcherLabel}
          ${data.status === 'pending' ? channels_module_scss_1.default.pending :
                data.status === 'disabled' ? channels_module_scss_1.default.disabled : ''}
        `}>
          {getChannelStatus(data.status)}
        </span>
        <Switcher_1.default onChange={(value) => {
                const channel = connectedChannels.find((channel) => channel.name === data.name);
                if (channel) {
                    if (prevStatus === 'disabled') {
                        channel.status = data.status;
                    }
                    channel.status = statuses.find(((statusItem) => statusItem !== channel.status));
                    setNewStatus(channel.status);
                }
            }} value={true}/>
      </div>);
    };
    const panels = [
        {
            imageSrc: install_svg_1.default,
            label: 'Установите чат на сайт',
            content: <InstallBlock_1.default />,
        },
        {
            imageSrc: style_svg_1.default,
            label: 'Основные настройки',
            content: <GeneralSettingsBlock_1.default />,
        },
        {
            imageSrc: operators_svg_1.default,
            label: 'Операторы',
            content: <OperatorsBlock_1.default />,
        },
        {
            imageSrc: clock_svg_1.default,
            label: 'Часы работы',
            content: <ClockBlock_1.default />,
        },
        {
            imageSrc: invite_svg_1.default,
            label: 'Автоматические действия',
            content: <AutomationBlock_1.default />
        },
    ];
    const columns = [
        {
            key: 'avatar',
            visible: true,
            headerComponent: (data) => (<Button_1.default type='button' background='transparent' stylesList={{
                    fontSize: '14px',
                    fontWeight: 500,
                    color: '#0a86f9',
                    padding: '0',
                }} onClick={() => {
                    setModalProps({
                        show: true,
                        title: 'Добавить новый канал',
                        body: <ModalBody />,
                        footer: null,
                        onClose: () => setModalProps(prev => cloneDeep_1.default(Object.assign(prev, { show: false }))),
                        width: '520px',
                    });
                }}>
          Добавить новый канал
        </Button_1.default>),
            cellComponent: (data) => (<div className={channels_module_scss_1.default.channelNameContainer}>
          <img src={getChannelPreview(data.name)}/>
          <span className={channels_module_scss_1.default.channelName}>{getChannelName(data.name)}</span>
        </div>),
        },
        {
            key: 'name',
            visible: false,
            cellComponent: (data) => (<span className={channels_module_scss_1.default.channel}>{getChannelName(data.name)}</span>),
        },
        {
            key: 'status',
            visible: false,
            cellComponent: StatusSwitcher,
        },
        {
            key: 'action',
            visible: true,
            headerComponent: (data) => (<Button_1.default type='button' background='edit' stylesList={{
                    background: '#fff',
                    color: '#0a86f9',
                    fontWeight: 400,
                    padding: '10px',
                    fontSize: '13px',
                }} onClick={() => {
                    setModalProps({
                        show: true,
                        title: 'Добавить новый канал',
                        body: <ModalBody />,
                        footer: null,
                        onClose: () => setModalProps(prev => cloneDeep_1.default(Object.assign(prev, { show: false }))),
                        width: '520px',
                    });
                }}>
          + Добавить
        </Button_1.default>),
            cellComponent: (data) => (<Button_1.default type='button' background='edit' stylesList={{
                    fontWeight: 500,
                    fontSize: '13px',
                    padding: '10px 14px',
                }} onClick={() => setModalProps({
                    show: true,
                    title: 'Редактировать чат на сайте',
                    body: (<div className={channels_module_scss_1.default.modalBody}>
                <div className={channels_module_scss_1.default.chatSettingsContainer}>
                  <Accordion2_1.default panels={panels}/>
                </div>

                <ChatPreview_1.default />
              </div>),
                    footer: null,
                    onClose: () => setModalProps(prev => cloneDeep_1.default(Object.assign(prev, { show: false }))),
                    width: '900px',
                    height: '90%',
                })}>
          Изменить
        </Button_1.default>),
        },
    ];
    const channels = [
        {
            imageSrc: chat_svg_1.default,
            alt: 'chat',
            backgroundColor: '#0084ff',
            title: 'Чат на сайте',
            id: 'chat',
        },
        {
            imageSrc: chat_svg_1.default,
            alt: 'chat',
            backgroundColor: '#0084ff',
            title: 'Чат на сайте',
            id: 'chat',
        },
        {
            imageSrc: chat_svg_1.default,
            alt: 'chat',
            backgroundColor: '#0084ff',
            title: 'Чат на сайте',
            id: 'chat',
        },
        {
            imageSrc: chat_svg_1.default,
            alt: 'chat',
            backgroundColor: '#0084ff',
            title: 'Чат на сайте',
            id: 'chat',
        },
        {
            imageSrc: chat_svg_1.default,
            alt: 'chat',
            backgroundColor: '#0084ff',
            title: 'Чат на сайте',
            id: 'chat',
        },
        {
            imageSrc: chat_svg_1.default,
            alt: 'chat',
            backgroundColor: '#0084ff',
            title: 'Чат на сайте',
            id: 'chat',
        },
    ];
    react_1.useEffect(() => {
        getChannels();
    }, []);
    const getChannels = () => {
        dispatch(actions_1.fetchChannels({ projectId }));
    };
    const addChannel = (id) => {
        dispatch(actions_1.addChannel({ projectId, name: id }));
    };
    const ModalBody = () => {
        return (<div className={channels_module_scss_1.default.modalBody}>
        {channels.map(({ imageSrc, alt, backgroundColor, title, id }, idx) => {
                const isAlreadyConnectedChannel = connectedChannels.find((channel) => channel.name === id);
                return (<div key={idx} className={`
                  ${channels_module_scss_1.default.channelCard}
                  ${isAlreadyConnectedChannel && channels_module_scss_1.default.disabledChannel}
                `} onClick={() => {
                        if (isAlreadyConnectedChannel)
                            return;
                        addChannel(id);
                        setModalProps(Object.assign(currentModal, { show: false }));
                    }}>
                <div className={channels_module_scss_1.default.imageContainer} style={{ backgroundColor }}>
                  <img src={imageSrc} alt={alt}/>
                </div>
                <p className={channels_module_scss_1.default.title}>{title}</p>
              </div>);
            })}
      </div>);
    };
    return (<div className={channels_module_scss_1.default.channelsContainer}>
      <Title_1.default text='Каналы'/>

      <Table_1.default columns={columns} data={connectedChannels}/>

      <Modal_1.default {...currentModal}/>
    </div>);
}
exports.default = Channels;
//# sourceMappingURL=Channels.js.map