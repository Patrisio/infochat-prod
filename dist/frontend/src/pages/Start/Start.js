"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
const Title_1 = require("../../components/Title/Title");
const start_module_scss_1 = require("./start.module.scss");
const channels_svg_1 = require("../../assets/channels.svg");
const teammates_svg_1 = require("../../assets/teammates.svg");
const template_svg_1 = require("../../assets/template.svg");
const stats_svg_1 = require("../../assets/stats.svg");
function Start() {
    let { projectId } = react_router_dom_1.useParams();
    const settings = [
        {
            imageSrc: channels_svg_1.default,
            alt: 'channels',
            backgroundColor: '#f5fff5',
            title: 'Каналы',
            description: 'Добавьте каналы связи для вашего проекта или настройте чат для сайта.',
            linkText: 'Добавить и настроить каналы ›',
            linkHref: `/project/${projectId}/settings/channels`,
        },
        {
            imageSrc: teammates_svg_1.default,
            alt: 'teammates',
            backgroundColor: 'snow',
            title: 'Сотрудники',
            description: 'Пригласите в ваш проект операторов для ответов на входящие сообщения и поддержки клиентов.',
            linkText: 'Добавить и управлять сотрудниками ›',
            linkHref: `/project/${projectId}/settings/teammates`,
        },
        {
            imageSrc: template_svg_1.default,
            alt: 'template',
            backgroundColor: '#faffec',
            title: 'Шаблоны ответов',
            description: 'Настройте шаблоны ответов для операторов, чтобы реагировать на сообщения клиентов быстрее.',
            linkText: 'Настроить шаблоны ответов ›',
            linkHref: ``,
        },
        {
            imageSrc: stats_svg_1.default,
            alt: 'stats',
            backgroundColor: '#f4fffd',
            title: 'Статистика',
            description: 'Подключите статистику и определяйте популярные каналы, часы пиковой нагрузки и лучших операторов.',
            linkText: 'Перейти к статистике ›',
            linkHref: ``,
        },
    ];
    return (<div className={start_module_scss_1.default.startContainer}>
      <Title_1.default text='Настройки'/>

      <div className={start_module_scss_1.default.startContent}>
        {settings.map(({ imageSrc, alt, backgroundColor, title, description, linkText, linkHref }, idx) => {
            return (<react_router_dom_1.Link key={idx} to={linkHref} className={start_module_scss_1.default.feature}>
                <div className={start_module_scss_1.default.imageContainer} style={{ background: backgroundColor }}>
                  <img src={imageSrc} alt={alt}/>
                </div>
                <div className={start_module_scss_1.default.content}>
                  <h3 className={start_module_scss_1.default.title}>{title}</h3>
                  <p className={start_module_scss_1.default.description}>{description}</p>
                  <react_router_dom_1.Link className={start_module_scss_1.default.link} to={linkHref}>
                    {linkText}
                  </react_router_dom_1.Link>
                </div>
              </react_router_dom_1.Link>);
        })}
      </div>
    </div>);
}
exports.default = Start;
//# sourceMappingURL=Start.js.map