"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./App.css");
const Button_1 = require("./componet/Button");
const Icons_1 = require("./componet/Icons");
function App() {
    return (<>
      <Button_1.Button startIcon={<Icons_1.Icon size="lg"/>} size={'lg'} title={'Share'} endIcon={<Icons_1.EndIcon size="lg"/>} variant={'primary'}/>
      <Button_1.Button startIcon={<Icons_1.Icon size="md"/>} size={'md'} title={'add'} endIcon={<Icons_1.EndIcon size="md"/>} variant={'secondry'}/>
    </>);
}
exports.default = App;
