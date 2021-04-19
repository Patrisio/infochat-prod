"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const react_router_1 = require("react-router");
const Accordion_1 = require("../../../../components/Accordion/Accordion");
const Animal_1 = require("../../../../components/Animal/Animal");
const Input_1 = require("../../../../components/Input/Input");
const personInfo_module_scss_1 = require("./personInfo.module.scss");
const clientData_1 = require("../../../../utils/clientData");
const react_redux_1 = require("react-redux");
const react_fontawesome_1 = require("@fortawesome/react-fontawesome");
const free_solid_svg_icons_1 = require("@fortawesome/free-solid-svg-icons");
const actions_1 = require("../../../../actions");
const Context_1 = require("../../../../context/Context");
const cloneDeep_1 = require("lodash/cloneDeep");
function PersonInfo({ selectedClient }) {
    const defaultGeneralInfo = [
        {
            name: 'Телефон',
            field: 'phone',
            value: 'Добавить',
            isEditable: true,
        },
        {
            name: 'E-mail',
            field: 'email',
            value: 'Добавить',
            isEditable: true,
        },
    ];
    let fieldInitialValue = '';
    const [assignedTeammates, setAssignedTeammate] = react_1.useState([]);
    const [generalInfo, setGeneralInfo] = react_1.useState(defaultGeneralInfo);
    const teammates = react_redux_1.useSelector((state) => state.teammates.teammates);
    const dispatch = react_redux_1.useDispatch();
    let { projectId } = react_router_1.useParams();
    const { currentUser, setCurrentUser } = react_1.useContext(Context_1.Context);
    const clientData = {
        avatarName: selectedClient.avatarName,
        email: selectedClient.email,
        phone: selectedClient.phone,
        assigned_to: selectedClient.assigned_to,
        clientId: selectedClient.clientId,
        projectId,
    };
    react_1.useEffect(() => {
        const assignedTeammate = {
            value: selectedClient.assigned_to,
        };
        const generalClientData = generalInfo.reduce((acc, field) => {
            if (field.field === 'phone') {
                field.value = selectedClient.phone;
            }
            if (field.field === 'email') {
                field.value = selectedClient.email;
            }
            return acc.concat(field);
        }, []);
        setAssignedTeammate([assignedTeammate].filter(item => item.value !== '' && item.value !== null));
        setGeneralInfo(generalClientData);
    }, [selectedClient]);
    const assignTeammate = (teammate) => {
        if (!assignedTeammates.find((item) => item.value === teammate.value)) {
            var myHeaders = new Headers();
            myHeaders.append('Content-Type', 'application/json');
            setCurrentUser((prev) => {
                const client = {
                    clientId: selectedClient.clientId,
                    projectId,
                    avatarName: selectedClient.avatarName,
                    avatarColor: selectedClient.avatarColor,
                    messagesHistory: selectedClient.messagesHistory
                };
                const assignedClientIds = prev.assignedClientIds.concat(client);
                const assignedCount = prev.assignedCount + 1;
                const getUnreadClientIds = (unreadClientIds) => {
                    if (unreadClientIds.find((client) => client.clientId === selectedClient.clientId)) {
                        return {
                            unreadClientIds: unreadClientIds.filter((client) => client.clientId !== selectedClient.clientId),
                            unreadCount: prev.unreadCount - 1,
                        };
                    }
                    return {
                        unreadClientIds: prev.unreadClientIds,
                        unreadCount: prev.unreadCount,
                    };
                };
                const getOpenedClientIds = (openedClientIds) => {
                    if (openedClientIds.find((client) => client.clientId === selectedClient.clientId)) {
                        return {
                            openedClientIds,
                            openedCount: prev.openedCount,
                        };
                    }
                    return {
                        openedClientIds: openedClientIds.concat(client),
                        openedCount: prev.openedCount + 1,
                    };
                };
                dispatch(actions_1.updateAssignedUser(Object.assign(Object.assign(Object.assign({ clientId: selectedClient.clientId, username: prev.username, email: prev.email, projectId,
                    assignedClientIds,
                    assignedCount }, getUnreadClientIds(prev.unreadClientIds)), getOpenedClientIds(prev.openedClientIds)), { closedClientIds: prev.closedClientIds, closedCount: prev.closedCount })));
                const successCallback = () => {
                    setAssignedTeammate([{ value: teammate.value }]);
                    dispatch(actions_1.updateIncomingMessage({
                        clientId: selectedClient === null || selectedClient === void 0 ? void 0 : selectedClient.clientId,
                        assigned_to: teammate.value
                    }));
                    dispatch(actions_1.updateSelectedClient({
                        assigned_to: teammate.value
                    }));
                };
                dispatch(actions_1.updateClientData(Object.assign(clientData, {
                    assigned_to: teammate.value,
                    successCallback,
                })));
                return cloneDeep_1.default(Object.assign(prev, Object.assign(Object.assign(Object.assign({}, getUnreadClientIds(prev.unreadClientIds)), getOpenedClientIds(prev.openedClientIds)), { assignedClientIds,
                    assignedCount })));
            });
        }
    };
    const removeAssignedTeammate = (teammate) => {
        var myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        setCurrentUser((prev) => {
            const assignedClientIds = prev.assignedClientIds.filter((client) => client.clientId !== selectedClient.clientId);
            const assignedCount = prev.assignedCount - 1;
            const successCallback = () => {
                setAssignedTeammate(prev => prev.filter(assignedTeammate => assignedTeammate.value !== teammate.value));
                dispatch(actions_1.updateIncomingMessage({
                    clientId: selectedClient === null || selectedClient === void 0 ? void 0 : selectedClient.clientId,
                    assigned_to: ''
                }));
                dispatch(actions_1.updateSelectedClient({
                    assigned_to: ''
                }));
            };
            dispatch(actions_1.updateAssignedUser({
                clientId: selectedClient.clientId,
                username: prev.username,
                email: prev.email,
                projectId,
                assignedClientIds,
                assignedCount,
                unreadClientIds: prev.unreadClientIds,
                unreadCount: prev.unreadCount,
                openedClientIds: prev.openedClientIds,
                openedCount: prev.openedCount,
                closedClientIds: prev.closedClientIds,
                closedCount: prev.closedCount,
                successCallback,
            }));
            dispatch(actions_1.updateClientData(Object.assign(clientData, { assigned_to: '', })));
            return cloneDeep_1.default(Object.assign(prev, {
                assignedClientIds,
                assignedCount,
            }));
        });
    };
    const getTeammates = () => {
        return teammates.map((teammate) => ({ value: teammate.username }));
    };
    const updateClientData = (e) => {
        var _a;
        const target = e.currentTarget;
        const fieldValue = target.textContent;
        const fieldName = (_a = target.parentElement) === null || _a === void 0 ? void 0 : _a.getAttribute('data-field');
        const isDifferentFieldValues = fieldInitialValue !== fieldValue;
        if (fieldName && isDifferentFieldValues) {
            const successCallback = () => {
                dispatch(actions_1.updateIncomingMessage({
                    clientId: selectedClient === null || selectedClient === void 0 ? void 0 : selectedClient.clientId,
                    [fieldName]: fieldValue
                }));
            };
            dispatch(actions_1.updateClientData(Object.assign(clientData, {
                [fieldName]: fieldValue,
                successCallback,
            })));
        }
    };
    const saveInitialFieldValue = (e) => {
        const target = e.currentTarget;
        fieldInitialValue = target.textContent;
    };
    console.log(generalInfo);
    return (<div className={personInfo_module_scss_1.default.personInfoContainer}>
      <div className={personInfo_module_scss_1.default.personGeneralInfo}>
        <Animal_1.default name={selectedClient.avatarName} color={selectedClient.avatarColor} size='60px'/>

        <div className={personInfo_module_scss_1.default.clientName}>
          {clientData_1.getClientName(selectedClient.avatarColor, selectedClient.avatarName)}
        </div>

        <div className={personInfo_module_scss_1.default.blackListIcon}>
          <react_fontawesome_1.FontAwesomeIcon icon={free_solid_svg_icons_1.faEllipsisV} color='#444'/>
        </div>
      </div>

      <Accordion_1.default title='Основное'>
        <ul className={personInfo_module_scss_1.default.generalList}>
          {generalInfo.map((field, idx) => {
            return (<li key={idx} className={personInfo_module_scss_1.default.generalListItem} data-field={field.field}>
                  <span className={personInfo_module_scss_1.default.nameField}>{field.name}:</span>
                  <span className={personInfo_module_scss_1.default.valueField} contentEditable={field.isEditable} suppressContentEditableWarning={true} onBlur={updateClientData} onFocus={saveInitialFieldValue}>
                    {field.value}
                  </span>
                </li>);
        })}
        </ul>
      </Accordion_1.default>

      <Accordion_1.default title='Назначить на'>
        <div>
          <Input_1.default type='text' placeholder='+ Выбрать сотрудника' classNames={personInfo_module_scss_1.default.checkTeammateInput} fluid onClick={assignTeammate} data={getTeammates()}/>

          <div className={personInfo_module_scss_1.default.assignedTeammatesList}>
            {assignedTeammates.map((teammate, idx) => {
            return (<div key={idx} className={personInfo_module_scss_1.default.assignedTeammate}>
                    <p className={personInfo_module_scss_1.default.teammateName}>{teammate.value}</p>
                    <div onClick={() => removeAssignedTeammate(teammate)} className={personInfo_module_scss_1.default.removeIcon}>
                      <react_fontawesome_1.FontAwesomeIcon icon={free_solid_svg_icons_1.faTimes} color='#cac9c9'/>
                    </div>
                  </div>);
        })}
          </div>
        </div>
      </Accordion_1.default>

      <Accordion_1.default title='История изменений'>

      </Accordion_1.default>
    </div>);
}
exports.default = PersonInfo;
//# sourceMappingURL=PersonInfo.js.map