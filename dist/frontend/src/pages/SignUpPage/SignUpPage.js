"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const react_redux_1 = require("react-redux");
const react_router_dom_1 = require("react-router-dom");
const actions_1 = require("../../actions");
const Input_1 = require("../../components/Input/Input");
const Button_1 = require("../../components/Button/Button");
const SignUpPage_module_scss_1 = require("./SignUpPage.module.scss");
const Context_1 = require("../../context/Context");
function SignUpPage() {
    const { currentUser } = react_1.useContext(Context_1.Context);
    const dispatch = react_redux_1.useDispatch();
    currentUser.email = 'hellO@mail.ru';
    const signUpUser = async (e) => {
        e.preventDefault();
        const target = e.target;
        const username = target.username.value;
        const email = target.email.value;
        const phone = target.phone.value;
        const password = target.password.value;
        const successCallback = (data) => {
            if (localStorage.getItem('token')) {
                localStorage.removeItem('token');
            }
            localStorage.setItem('token', data.accessToken);
            window.location.href = `/project/${data.projectId}/inbox/opened`;
        };
        dispatch(actions_1.authSignUp({
            username,
            email,
            phone,
            password,
            role: 'owner',
            status: 'active',
            successCallback,
        }));
    };
    return (<div className={SignUpPage_module_scss_1.default.formWrapper}>
      <form method='POST' onSubmit={signUpUser} className={SignUpPage_module_scss_1.default.form}>
        <h1 className={SignUpPage_module_scss_1.default.h1}>Регистрация в InfoChat</h1>
        <Input_1.default placeholder='Имя' type='text' name='username' fluid/>
        <Input_1.default placeholder='Телефон' type='phone' name='phone' fluid/>
        <Input_1.default placeholder='E-mail' type='email' name='email' fluid/>
        <Input_1.default placeholder='Пароль' type='password' name='password' fluid/>
        <Button_1.default type='submit' fluid>
          Зарегистрироваться
        </Button_1.default>
        <p className={SignUpPage_module_scss_1.default.formFooter}>
          Уже есть аккаунт?
          <react_router_dom_1.Link to='/signin' className={SignUpPage_module_scss_1.default.link}>
            Войти
          </react_router_dom_1.Link>
        </p>
      </form>
    </div>);
}
exports.default = SignUpPage;
//# sourceMappingURL=SignUpPage.js.map