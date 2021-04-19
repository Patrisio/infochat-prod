"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const react_router_1 = require("react-router");
const Button_1 = require("../../../../components/Button/Button");
const installBlock_module_scss_1 = require("./installBlock.module.scss");
function InstallBlock() {
    const [buttonText, setButtonText] = react_1.useState('Скопировать код в буфер');
    let { projectId } = react_router_1.useParams();
    const codeRef = react_1.useRef(null);
    const displayCode = (projectId) => {
        if (process.env.NODE_ENV === 'production') {
            return (<>
          &lt;
            <span>script</span>
          &gt;
            var a = document.createElement("script"),
                h = "head";
            a.async = true;
            a.src = (document.location.protocol == "https:" ? "https://" : "http://") + `{document.location.host}` + `/inbox/api/{projectId}/widget`;
            document.getElementsByTagName(h)[0].appendChild(a);
          &lt;
            <span>/script</span>
          &gt;
        </>);
        }
        return (<>
        &lt;
          <span>script</span>
        &gt;
          var a = document.createElement("script"),
              h = "head";
          a.async = true;
          a.src = (document.location.protocol == "https:" ? "https://" : "http://") + "localhost:3001" + `/inbox/api/{projectId}/widget`;
          document.getElementsByTagName(h)[0].appendChild(a);
        &lt;
          <span>/script</span>
        &gt;
      </>);
    };
    const saveCodeToBuffer = () => {
        const codeElement = codeRef.current;
        if (codeElement) {
            const textForBuffer = codeElement.textContent;
            if (typeof textForBuffer === 'string') {
                const promise = navigator.clipboard.writeText(textForBuffer);
                promise
                    .then(() => {
                    setButtonText('Скопировано');
                })
                    .catch((err) => {
                    console.log(err);
                });
            }
        }
    };
    return (<div>
      <p>Вставьте этот код перед закрывающим тегом &lt;/body&gt; на каждой странице вашего сайта.</p>

      <div className={installBlock_module_scss_1.default.codeContainer} ref={codeRef}>
        {displayCode(projectId)}  
      </div>

      <Button_1.default type='button' fluid onClick={saveCodeToBuffer}>
        {buttonText}
      </Button_1.default>
    </div>);
}
exports.default = InstallBlock;
//# sourceMappingURL=InstallBlock.js.map