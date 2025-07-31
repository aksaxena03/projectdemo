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
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = require("./db");
const middilware_1 = require("./middilware");
const config_1 = require("./config");
// import { SupervisedUserCircleOutlined } from '@mui/icons-material'
const utils_1 = require("./utils");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.post("/api/v1/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.username;
    const password = req.body.password;
    try {
        yield db_1.UserModel.create({ username: username, password: password });
        res.json({ message: 'User created successfully' });
    }
    catch (e) {
        res.status(404).json({ message: "user exists" });
    }
}));
app.post("/api/v1/signin", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        const existing = yield db_1.UserModel.findOne({ username, password });
        //  if (username!==verfying.username && password!=verfying.password)
        //     {
        //         res.send{"Invalid username and password"}
        //     }
        if (existing) {
            // console.log(existing.id,jwt_password)
            const token = jsonwebtoken_1.default.sign({ id: existing._id }, config_1.jwt_password);
            // console.log(token)
            res.json({ token });
            next();
        }
        else {
            res.json({ message: "Invalid username and password or credentials" });
        }
    }
    catch (e) {
        res.status(404).json({ message: 'user not found' });
    }
}));
app.post('/api/v1/content', middilware_1.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const link = req.body.link;
    const title = req.body.title;
    const Type = req.body.Type;
    yield db_1.ContentModel.create({
        link,
        title,
        Type,
        tags: [],
        //@ts-ignore
        userId: req.userId
    });
    res.json({ message: 'content added' });
}));
app.get('/api/v1/content', middilware_1.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //@ts-ignore
    const userId = (req.userId);
    const content = yield db_1.ContentModel.find({ userId }).populate("userId", "username");
    // console.log(content)
    res.json({ content });
}));
//Delete content
app.delete('/api/v1/content', middilware_1.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { contentId } = req.body;
        const _id = contentId.toString();
        //@ts-ignore
        const userId = req.userId; // Remove @ts-ignore by properly typing req
        // console.log(`Deleting content: ${contentId} for user: ${userId}`);
        const result = yield db_1.ContentModel.deleteOne({
            _id,
            userId
        });
        if (result.deletedCount === 0) {
            res.status(404).json({
                message: 'Content not found or unauthorized'
            });
            return;
        }
        res.json({ message: 'Content deleted successfully' });
        return;
    }
    catch (error) {
        console.error('Delete error:', error);
        res.status(500).json({
            message: 'Failed to delete content'
        });
        return;
    }
}));
app.post('/api/v1/content/share', middilware_1.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(req.body+"......"+req.body.share)
    let share = req.body.share;
    //@ts-ignore
    const userId = req.userId;
    console.log(userId);
    if (share === "true" || share) {
        const existinglink = yield db_1.LinkModel.findOne({ userId });
        if (existinglink) {
            console.log(existinglink);
            res.json({
                hash: `/api/v1/content/${existinglink.hash}`
            });
            return;
        }
        const hash = (0, utils_1.random)(10);
        console.log(`( ${hash} )`);
        yield db_1.LinkModel.create({
            userId,
            hash: hash
        });
        res.json({ hash: `/api/v1/content/${hash}` });
    }
    else {
        yield db_1.LinkModel.deleteOne({
            userId
        });
        res.json({ message: "share link removed" });
    }
}));
app.get('/api/v1/content/:sharelink', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const hash = req.params.sharelink;
    console.log(hash);
    const link = yield db_1.LinkModel.findOne({ hash });
    console.log(link);
    if (!link) {
        res.status(141).json({ message: "link is broken" });
        return;
    }
    //userid se content fetch
    const content = yield db_1.ContentModel.find({ userId: link.userId });
    console.log(content);
    const user = yield db_1.UserModel.findOne({ _id: link.userId });
    console.log(user);
    if (!user) {
        res.json({ message: "user not found or maybe users link is not found" });
        return;
    }
    res.json({
        content: content
    });
}));
app.listen(3000);
