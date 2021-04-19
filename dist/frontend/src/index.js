"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const react_dom_1 = require("react-dom");
const App_1 = require("./App");
const react_router_dom_1 = require("react-router-dom");
react_dom_1.default.render(<react_1.default.StrictMode>
    <react_router_dom_1.BrowserRouter>
      <App_1.default />
    </react_router_dom_1.BrowserRouter>
  </react_1.default.StrictMode>, document.getElementById('root'));
//# sourceMappingURL=index.js.map