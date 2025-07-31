"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const config_db_1 = __importDefault(require("./config.db"));
const index_1 = __importDefault(require("./router/index")); //router.index
const app = (0, express_1.default)();
const PORT = 3001;
(0, config_db_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/api/v1', index_1.default);
app.post('/', (_req, res) => {
    console.log("at root");
    res.json({ hi: 'root in endpoint' });
});
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
