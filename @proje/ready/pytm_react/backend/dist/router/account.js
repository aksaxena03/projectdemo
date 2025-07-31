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
const SchemaDb_1 = require("../SchemaDb");
const middilware_1 = require("../middilware");
const mongoose_1 = __importDefault(require("mongoose"));
const router = (0, express_1.Router)();
router.get('/balance', middilware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userid = req.userid;
        if (!userid) {
            res.status(408).send('unable to fetch data from db');
            return;
        }
        const user = yield SchemaDb_1.User.findOne({ _id: userid });
        const account = yield SchemaDb_1.Account.findOne({ userid });
        if (!account) {
            res.status(404).json({ error: 'Account not found' });
            return;
        }
        console.log(account === null || account === void 0 ? void 0 : account.balance, user === null || user === void 0 ? void 0 : user.name);
        res.json({ "balance": account === null || account === void 0 ? void 0 : account.balance, "user": user === null || user === void 0 ? void 0 : user.name });
    }
    catch (e) {
        res.status(404).send(e);
    }
}));
router.post('/transfer', middilware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    session.startTransaction();
    try {
        const { amount, to } = req.body;
        if (to === req.userid) {
            yield session.abortTransaction();
            res.json({ message: "Cannot Transfer to yourself!" });
            return;
        }
        if (!to || amount <= 0) {
            res.status(400).json({ message: 'invalid input' });
            yield session.abortTransaction();
            return;
        }
        const sender = yield SchemaDb_1.Account.findOne({ userid: req.userid }).session(session);
        if (!sender || !sender.balance || sender.balance < amount) {
            yield session.abortTransaction();
            res.status(400).json({ message: "Insufficient balance or sender not found" });
            return;
        }
        const receiver = yield SchemaDb_1.Account.findOne({ userid: to }).session(session);
        if (!receiver) {
            yield session.abortTransaction();
            res.status(404).json({ message: "Receiver not found" });
            return;
        }
        yield SchemaDb_1.Account.updateOne({ userid: req.userid }, { $inc: { balance: -amount } }).session(session);
        ;
        yield SchemaDb_1.Account.updateOne({ userid: to }, { $inc: { balance: amount } }).session(session);
        ;
        yield session.commitTransaction();
        const senderCHange = yield SchemaDb_1.Account.findOne({ userid: req.userid });
        res.json({ message: "Transfer successful. your bal is " + (senderCHange === null || senderCHange === void 0 ? void 0 : senderCHange.balance) });
    }
    catch (e) {
        res.send(e);
    }
}));
exports.default = router;
