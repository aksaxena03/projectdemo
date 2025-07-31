"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Button = Button;
const sizeStyle = {
    "lg": "px-8 py-4 text-xl  text-amber-100 bg-purple-400 rounded-full",
    "md": "px-4 py-2 text-md text-amber-50 bg-purple-500",
    "sm": "px-2 py-0 text-sm text-amber-50 bg-purple-600"
};
const variant = {
    "primary": "bg-purple-400",
    "secondry": "bg-purple-200"
};
function Button(props) {
    return (<button className={`${sizeStyle[props.size]} flex ${variant[props.variant]} items-center `}>
            {props.startIcon}
            <div className="px-2">
                {props.title}
            </div>
            {props.endIcon}
            
            
        </button>);
}
