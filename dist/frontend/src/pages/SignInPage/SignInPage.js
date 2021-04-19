"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const react_redux_1 = require("react-redux");
const react_router_dom_1 = require("react-router-dom");
const actions_1 = require("../../actions");
const Input_1 = require("../../components/Input/Input");
const Button_1 = require("../../components/Button/Button");
const SignInPage_module_scss_1 = require("./SignInPage.module.scss");
function SignUpPage() {
    const dispatch = react_redux_1.useDispatch();
    const signInUser = (e) => {
        e.preventDefault();
        const target = e.target;
        const email = target.email.value;
        const password = target.password.value;
        const successCallback = (data) => {
            if (localStorage.getItem('token')) {
                localStorage.removeItem('token');
            }
            localStorage.setItem('token', data.accessToken);
            window.location.href = `/project/${data.projectId}/inbox/opened`;
        };
        dispatch(actions_1.authSignIn({
            email,
            password,
            successCallback,
        }));
    };
    return (<div className={SignInPage_module_scss_1.default.formWrapper}>
      <form className={SignInPage_module_scss_1.default.form} method='POST' onSubmit={signInUser}>
        <h1 className={SignInPage_module_scss_1.default.h1}>Войдите в свой аккаунт</h1>
        <Input_1.default placeholder='E-mail' type='email' name='email' fluid/>
        <Input_1.default placeholder='Пароль' type='password' name='password' fluid/>
        <Button_1.default type='submit' fluid>
          Войти
        </Button_1.default>
        <p className={SignInPage_module_scss_1.default.formFooter}>
          Еще нет аккаунта? 
          <react_router_dom_1.Link to='/signup' className={SignInPage_module_scss_1.default.link}>
            Зарегистрируйтесь
          </react_router_dom_1.Link>
          , это бесплатно!
        </p>
      </form>
    </div>);
}
exports.default = SignUpPage;
//# sourceMappingURL=SignInPage.js.map