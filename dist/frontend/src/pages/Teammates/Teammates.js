"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const react_router_1 = require("react-router");
const react_redux_1 = require("react-redux");
const Title_1 = require("../../components/Title/Title");
const Input_1 = require("../../components/Input/Input");
const Button_1 = require("../../components/Button/Button");
const Avatar_1 = require("../../components/Avatar/Avatar");
const Modal_1 = require("../../components/Modal/Modal");
const Table_1 = require("../../components/Table/Table");
const teammates_module_scss_1 = require("./teammates.module.scss");
const string_1 = require("../../utils/string");
const actions_1 = require("../../actions");
function Teammates() {
    const [isModalEditTeammateShow, setStateModal] = react_1.useState(false);
    const [isEditableEmail, toggleEditableEmail] = react_1.useState(false);
    const [isEditablePassword, toggleEditablePassword] = react_1.useState(false);
    let { projectId } = react_router_1.useParams();
    const teammates = react_redux_1.useSelector((state) => state.teammates.teammates);
    const dispatch = react_redux_1.useDispatch();
    const inviteTeammate = (e) => {
        e.preventDefault();
        const target = e.target;
        const email = target.email.value;
        dispatch(actions_1.addTeammate({
            id: string_1.generateRandomHash(),
            email,
            projectId,
            role: 'operator',
            status: 'pending',
            username: email.charAt(0).toUpperCase()
        }));
    };
    const getRole = (role) => {
        return role === 'owner' ? 'Владелец' : 'Оператор';
    };
    const getStatus = (status) => {
        switch (status) {
            case 'active':
                return <p className={`${teammates_module_scss_1.default.operatorRole} ${teammates_module_scss_1.default.active}`}>Активен</p>;
            case 'pending':
                return <p className={`${teammates_module_scss_1.default.operatorRole} ${teammates_module_scss_1.default.pending}`}>Ожидание</p>;
            case 'notPaid':
                return <p className={`${teammates_module_scss_1.default.operatorRole} ${teammates_module_scss_1.default.notPaid}`}>Не оплачен</p>;
        }
    };
    const removeTeammate = (email) => {
        dispatch(actions_1.deleteTeammate({ email, projectId }));
    };
    const addonAfterStyle = {
        position: 'absolute',
        right: '10px',
        top: 0,
        color: '#0a86f9',
    };
    const editEmail = () => {
        toggleEditableEmail(true);
    };
    const editPassword = () => {
        toggleEditablePassword(true);
    };
    const ModalBody = () => {
        return (<div className={teammates_module_scss_1.default.modalBody}>
        <Input_1.default type='email' placeholder='Новый email' disabled={!isEditableEmail} fluid addonAfter={!isEditableEmail &&
                <Button_1.default type='button' background='transparent' stylesList={addonAfterStyle} onClick={editEmail}>
              Изменить email
            </Button_1.default>}/>
        {isEditableEmail &&
                <Input_1.default type='email' placeholder='Подтвердите email' fluid/>}
    
        <Input_1.default type='password' placeholder='Новый пароль' disabled={!isEditablePassword} fluid addonAfter={!isEditablePassword &&
                <Button_1.default type='button' background='transparent' stylesList={addonAfterStyle} onClick={editPassword}>
              Изменить пароль
            </Button_1.default>}/>
        {isEditablePassword &&
                <Input_1.default type='password' placeholder='Подтвердите пароль' fluid/>}

        <Input_1.default type='text' placeholder='Имя' fluid/>

        <Input_1.default type='text' placeholder='Фамилия' fluid/>
      </div>);
    };
    const save = () => {
        console.log('SAVE');
    };
    const ModalFooter = () => {
        return (<div className={teammates_module_scss_1.default.modalFooter}>
        <Button_1.default type='button' onClick={save} stylesList={{ marginBottom: '15px' }} fluid>
          Сохранить изменения
        </Button_1.default>

        <Button_1.default type='button' onClick={() => {
                console.log('DELETE');
            }} background='transparent' fluid>
          Удалить
        </Button_1.default>
      </div>);
    };
    const columns = [
        {
            avatar: 'avatar',
            key: 'avatar',
            visible: false,
            cellComponent: (data) => (data.avatar ?
                <img src={data.avatar} alt="avatar" className={teammates_module_scss_1.default.operatorAvatar}/> :
                <Avatar_1.default name={data.username} size='large'/>),
        },
        {
            name: 'name',
            key: 'name',
            visible: false,
            cellComponent: (data) => (<div className={teammates_module_scss_1.default.operatorNameEmail}>
          <p className={teammates_module_scss_1.default.operatorName}>{data.username}</p>
          <p className={teammates_module_scss_1.default.operatorEmail}>{data.email}</p>
        </div>),
        },
        {
            role: 'role',
            key: 'role',
            visible: false,
            cellComponent: (data) => (<div>
          <p className={teammates_module_scss_1.default.operatorRole}>{getRole(data.role)}</p>
        </div>),
        },
        {
            status: 'status',
            key: 'status',
            visible: false,
            cellComponent: (data) => (<div>
          {getStatus(data.status)}
        </div>),
        },
        {
            action: 'action',
            key: 'action',
            visible: false,
            cellComponent: (data) => (data.status === 'pending' ?
                <Button_1.default type='button' size='small' background='delete' onClick={() => removeTeammate(data.email)}>
          Удалить
        </Button_1.default>
                :
                    <Button_1.default type='button' size='small' background='edit' onClick={() => setStateModal(true)}>
          Изменить
        </Button_1.default>),
        },
    ];
    return (<div className={teammates_module_scss_1.default.teammateContainer}>
      <Title_1.default text='Сотрудники'/>

      <form method='POST' onSubmit={inviteTeammate} className={teammates_module_scss_1.default.inviteTeammateContainer}>
        <Input_1.default type='text' placeholder='Чтобы пригласить нового сотрудника, введите его email' width={'550px'} name='email'/>
        <Button_1.default type='submit' size='large'>
          Пригласить
        </Button_1.default>
      </form>

      <Table_1.default columns={columns} data={teammates}/>

      <Modal_1.default show={isModalEditTeammateShow} title='Настройка профиля' body={<ModalBody />} footer={<ModalFooter />} onClose={() => {
            setStateModal(false);
            toggleEditableEmail(false);
            toggleEditablePassword(false);
        }} width='498px'/>
    </div>);
}
exports.default = Teammates;
//# sourceMappingURL=Teammates.js.map