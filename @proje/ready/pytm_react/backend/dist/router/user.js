"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SchemaDb_1 = require("./../SchemaDb");
const zod_1 = __importDefault(require("zod"));
const middilware_1 = require("./../middilware");
const router = (0, express_1.Router)();
const signuping = zod_1.default.object({
    name: zod_1.default.string(),
    password: zod_1.default.string(),
    email: zod_1.default.string().email(),
    phone_number: zod_1.default.string()
});
router.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    try {
        const validation = signuping.safeParse(req.body);
        if (!validation.success) {
            res.status(408).send('invalid signup credentiol ');
            return;
        }
        const { name, password, email, phone_number } = req.body;
        const data = { name, password, email, phone_number };
        const findUser = yield SchemaDb_1.User.findOne({ email: data.email });
        if (findUser) {
            res.send("user is existed");
            return;
        }
        const user = yield SchemaDb_1.User.create({ name, password, email, phone_number });
        console.log(user);
        if (user) {
            const userid = user._id;
            yield SchemaDb_1.Account.create({
                userid: userid,
                balance: 1 + Math.random() * 10000
            });
            const token = jsonwebtoken_1.default.sign({ userid }, process.env.JWT_SECRET || 'fallback-secret-key');
            // console.log(token)
            res.json({ message: 'User added successfully', token });
            return;
        }
        res.send('invalid detail');
    }
    catch (error) {
        console.log(`error: ${error}`);
        // console.error()
        res.send(error);
    }
}));
const signining = zod_1.default.object({
    password: zod_1.default.string(),
    email: zod_1.default.string().email(),
});
//@ts-ignore
router.post('/signin', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validation = signining.safeParse(req.body);
        if (!validation.success) {
            res.status(400).json({
                error: 'Invalid credentials format'
            });
        }
        const { password, email } = req.body;
        const user = yield SchemaDb_1.User.findOne({ email: email, password: password });
        console.log(user);
        if (!user) {
            res.status(401).json({
                error: 'Invalid email or password'
            });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ userid: user === null || user === void 0 ? void 0 : user._id }, process.env.JWT_SECRET || 'fallback-secret-key');
        res.json({
            message: 'Signin successful',
            token
        });
    }
    catch (e) {
        console.log(e);
        return res.status(400).json({ error: 'Invalid credentials' });
    }
}));
const updating = zod_1.default.object({
    email: zod_1.default.string(),
    name: zod_1.default.string(),
    password: zod_1.default.string()
});
router.put('/update', middilware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(updating.safeParse(req.body)).success) {
        res.status(403).send('invalid data');
    }
    const { email, name, password } = req.body;
    // Assuming authMiddleware sets req.userid
    const data = yield SchemaDb_1.User.updateOne({ _id: req.userid }, // filter by authenticated user's id
    { $set: { email, name, password } });
    res.send('update successful');
}));
router.get("/bulk", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filter = req.query.filter || "";
    try {
        const users = yield SchemaDb_1.User.find({
            $or: [
                { email: { $regex: filter } }
            ]
        });
        res.json({
            users: users.map((user) => ({
                name: user.name,
                email: user.email,
                phone_number: user.phone_number,
                _id: user._id
            }))
        });
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
}));
router.post('/logout', (req, res) => {
    // On the backend, you can't access localStorage.
    // To "logout", instruct the client to remove the token.
    res.send('logout successfully');
});
exports.default = router;
