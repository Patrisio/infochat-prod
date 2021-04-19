"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const react_redux_1 = require("react-redux");
const appealsContainerMessages_module_scss_1 = require("./appealsContainerMessages.module.scss");
const MessageInputContainer_1 = require("../MessageInputContainer/MessageInputContainer");
const Button_1 = require("../../../../components/Button/Button");
const MessageInner_1 = require("../MessageInner/MessageInner");
const Modal_1 = require("../../../../components/Modal/Modal");
const Context_1 = require("../../../../context/Context");
const socket_1 = require("../../../../socket");
const react_router_1 = require("react-router");
const actions_1 = require("../../../../actions");
const clientData_1 = require("../../../../utils/clientData");
const react_fontawesome_1 = require("@fortawesome/react-fontawesome");
const free_solid_svg_icons_1 = require("@fortawesome/free-solid-svg-icons");
function AppealsContainerMessages({ clientIds }) {
    const [isDeleteAppealModalVisible, setModalState] = react_1.useState(false);
    const selectedClient = react_redux_1.useSelector((state) => state.inbox.selectedClient);
    const dispatch = react_redux_1.useDispatch();
    const { currentUser, setCurrentUser } = react_1.useContext(Context_1.Context);
    let { projectId } = react_router_1.useParams();
    const isDisabled = () => !!currentUser.closedClientIds.find((client) => client.clientId === selectedClient.clientId);
    const closeDialog = () => {
        setCurrentUser((prev) => {
            console.log(4);
            const client = {
                clientId: selectedClient.clientId,
                projectId: selectedClient.projectId,
                messagesHistory: selectedClient.messagesHistory,
                avatarName: selectedClient.avatarName,
                avatarColor: selectedClient.avatarColor,
            };
            const successCallback = () => {
                dispatch(actions_1.assignTeammate({
                    username: currentUser.username,
                    clientId: selectedClient.clientId
                }));
                socket_1.default.emit('updateAssignedToAnybody', {
                    username: currentUser.username,
                    clientId: selectedClient.clientId
                });
                socket_1.default.emit('reduceOpenedToAnybody', {
                    openedClientIds: currentUser.openedClientIds.filter((client) => client.clientId !== selectedClient.clientId),
                    openedCount: currentUser.openedCount,
                });
            };
            dispatch(actions_1.updateAssignedUser({
                clientId: selectedClient.clientId,
                username: currentUser.username,
                email: currentUser.email,
                projectId,
                assignedClientIds: currentUser.assignedClientIds.filter((client) => client.clientId !== selectedClient.clientId),
                assignedCount: prev.assignedCount - 1,
                unreadClientIds: currentUser.unreadClientIds,
                unreadCount: currentUser.unreadCount,
                openedClientIds: currentUser.openedClientIds.filter((client) => client.clientId !== selectedClient.clientId),
                openedCount: currentUser.openedCount - 1,
                closedClientIds: currentUser.closedClientIds.concat(client),
                closedCount: currentUser.closedCount + 1,
                successCallback,
            }));
            return Object.assign(prev, {
                assignedClientIds: currentUser.assignedClientIds.filter((client) => client.clientId !== selectedClient.clientId),
                assignedCount: prev.assignedCount - 1,
                unreadClientIds: currentUser.unreadClientIds,
                unreadCount: currentUser.unreadCount,
                openedClientIds: currentUser.openedClientIds.filter((client) => client.clientId !== selectedClient.clientId),
                openedCount: currentUser.openedCount - 1,
                closedClientIds: currentUser.closedClientIds.concat(client),
                closedCount: currentUser.closedCount + 1,
            });
        });
    };
    const buttonStyles = {
        padding: '9px 30px 10px',
        fontSize: '13px',
        fontWeight: 400,
    };
    const archiveDialog = () => {
        console.log('ARCHIVE DIALOG');
        setModalState(true);
    };
    const closeModal = () => {
        setModalState(false);
    };
    const ModalBody = () => <p className={appealsContainerMessages_module_scss_1.default.modalBody}>Вы действительно хотите удалить обращение?</p>;
    const ModalFooter = () => {
        return (<div className={appealsContainerMessages_module_scss_1.default.modalFooter}>
        <Button_1.default type='button' stylesList={Object.assign({ marginRight: '10px' }, buttonStyles)} background='edit' onClick={closeModal}>
          Отмена
        </Button_1.default>

        <Button_1.default type='button' stylesList={Object.assign({}, buttonStyles)} onClick={closeModal}>
          Удалить
        </Button_1.default>
      </div>);
    };
    const ModalTrigger = () => (<div onClick={archiveDialog}>
      <react_fontawesome_1.FontAwesomeIcon icon={free_solid_svg_icons_1.faArchive} className={appealsContainerMessages_module_scss_1.default.iconArchive}/>
    </div>);
    return (<>
      <div className={appealsContainerMessages_module_scss_1.default.converasationChatContainer}>
        <div className={appealsContainerMessages_module_scss_1.default.dialogHeader}>
          <div>
            <p className={appealsContainerMessages_module_scss_1.default.clientName}>{clientData_1.getClientName(selectedClient.avatarColor, selectedClient.avatarName)}</p>
          </div>

          <div onClick={archiveDialog} className={appealsContainerMessages_module_scss_1.default.archiveIconContainer}>
            <react_fontawesome_1.FontAwesomeIcon icon={free_solid_svg_icons_1.faArchive} className={appealsContainerMessages_module_scss_1.default.iconArchive}/>
          </div>

          <div className={appealsContainerMessages_module_scss_1.default.buttonContainer}>
            <Button_1.default type='button' fluid background='edit' stylesList={{
            color: '#0a86f9',
            fontSize: '13px',
            padding: '6px 0'
        }} onClick={closeDialog} disabled={isDisabled()}>
              Закрыть диалог
            </Button_1.default>
          </div>
        </div>

        <div className={appealsContainerMessages_module_scss_1.default.messagesHistoryContainer}>
          {selectedClient.messagesHistory.map((message, idx) => {
            return (<MessageInner_1.default key={idx} message={message}/>);
        })}
        </div>
        <MessageInputContainer_1.default />
      </div>

      <Modal_1.default show={isDeleteAppealModalVisible} onClose={() => setModalState(false)} title='Удалить обращение?' body={<ModalBody />} footer={<ModalFooter />} width='500px' position='top'/>
    </>);
}
exports.default = AppealsContainerMessages;
//# sourceMappingURL=AppealsContainerMessages.js.map