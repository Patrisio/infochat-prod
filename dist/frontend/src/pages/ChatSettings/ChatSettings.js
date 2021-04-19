"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const react_router_1 = require("react-router");
function ChatSettings() {
    let { projectId } = react_router_1.useParams();
    const displayCode = (projectId) => {
        return (<pre>
        &lt;
          <span>script</span>
        &gt;
        <br />
          var a = document.createElement("script"),<br />
              h = "head";<br />
          a.async = true;<br />
          a.src = (document.location.protocol == "https:" ? "https:" : "http:") + "//localhost:3000" + `/inbox/api/{projectId}/widget`<br />
          document.getElementsByTagName(h)[0].appendChild(a)<br />
        &lt;
          <span>/script</span>
        &gt;
      </pre>);
    };
    return (<>
    hello man
    {displayCode(projectId)}  
    </>);
}
exports.default = ChatSettings;
//# sourceMappingURL=ChatSettings.js.map