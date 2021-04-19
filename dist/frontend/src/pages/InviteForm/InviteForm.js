"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const react_router_1 = require("react-router");
const react_redux_1 = require("react-redux");
const Input_1 = require("../../components/Input/Input");
const Button_1 = require("../../components/Button/Button");
const inviteForm_module_scss_1 = require("./inviteForm.module.scss");
const actions_1 = require("../../actions");
function InviteForm() {
    let { inviteId, projectId } = react_router_1.useParams();
    const dispatch = react_redux_1.useDispatch();
    react_1.useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            localStorage.removeItem('token');
        }
        localStorage.setItem('token', inviteId);
    }, []);
    const joinToProject = async (e) => {
        e.preventDefault();
        const target = e.target;
        const name = target.name.value;
        const surname = target.surname.value;
        const password = target.password.value;
        const confirmPassword = target.confirmPassword.value;
        if (password === confirmPassword) {
            const successCallback = (data) => {
                if (data.code === 200) {
                    window.location.href = `/project/${projectId}/inbox/opened`;
                }
            };
            dispatch(actions_1.authInvite({
                username: `${name} ${surname}`,
                password,
                projectId,
                inviteId,
                successCallback,
            }));
        }
        else {
            alert('Пароли не совпадают');
        }
    };
    return (<div className={inviteForm_module_scss_1.default.formWrapper}>
      <form method='POST' onSubmit={joinToProject} className={inviteForm_module_scss_1.default.form}>
        <h1 className={inviteForm_module_scss_1.default.h1}>Добро пожаловать в InfoChat</h1>
        <Input_1.default placeholder='Имя' type='text' name='name' fluid/>
        <Input_1.default placeholder='Фамилия' type='text' name='surname' fluid/>
        <Input_1.default placeholder='Пароль' type='password' name='password' fluid/>
        <Input_1.default placeholder='Подтвердите пароль' type='password' name='confirmPassword' fluid/>
        <Button_1.default type='submit' fluid>
          Присоединиться к проекту
        </Button_1.default>
      </form>
    </div>);
}
exports.default = InviteForm;
//# sourceMappingURL=InviteForm.js.map