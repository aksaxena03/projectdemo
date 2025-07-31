"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Account = exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        min: 10,
        max: 25
    },
    phone_number: {
        type: Number,
        required: true,
        validate: {
            validator: function (v) {
                return /^\d{10}$/.test(v);
            },
            message: 'Phone number must be exactly 10 digits'
        }
    },
    password: {
        type: String,
        required: true
    }
});
const User = mongoose_1.default.model('User', userSchema);
exports.User = User;
const accountSchema = new mongoose_1.default.Schema({
    balance: Number,
    userid: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User", required: true
    }
});
const Account = mongoose_1.default.model('Account', accountSchema);
exports.Account = Account;
