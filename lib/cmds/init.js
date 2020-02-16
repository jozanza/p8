"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var readline_1 = __importDefault(require("readline"));
var common_1 = require("../common");
exports.command = 'init';
exports.describe = 'initialize the project';
function handler() {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var defaults, _b, ask, name, version, author, description, main, values, output, yepnope;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, common_1.getProjectConfig()];
                case 1:
                    defaults = _c.sent();
                    if (!defaults.name) {
                        defaults.name = common_1.getProjectDirname();
                    }
                    if (!defaults.version) {
                        defaults.version = '1.0.0';
                    }
                    if (!!defaults.author) return [3 /*break*/, 3];
                    _b = defaults;
                    return [4 /*yield*/, common_1.whoami()];
                case 2:
                    _b.author = (_a = (_c.sent()), (_a !== null && _a !== void 0 ? _a : ''));
                    _c.label = 3;
                case 3:
                    if (!defaults.main) {
                        defaults.main = 'main.lua';
                    }
                    ask = createCLI();
                    return [4 /*yield*/, ask("project name:", defaults.name)];
                case 4:
                    name = _c.sent();
                    return [4 /*yield*/, ask("version:", defaults.version)];
                case 5:
                    version = _c.sent();
                    return [4 /*yield*/, ask("author:", defaults.author)];
                case 6:
                    author = _c.sent();
                    return [4 /*yield*/, ask("description:", defaults.description)];
                case 7:
                    description = _c.sent();
                    return [4 /*yield*/, ask("entry point:", defaults.main)];
                case 8:
                    main = _c.sent();
                    values = __assign(__assign({}, defaults), { name: name, version: version, author: author, description: description, main: main });
                    output = JSON.stringify(values, null, 2);
                    console.log("About to write to " + common_1.CONFIG_PATH + ":\n");
                    console.log(output + "\n");
                    return [4 /*yield*/, ask('Is this OK?', 'yes')];
                case 9:
                    yepnope = _c.sent();
                    switch (yepnope) {
                        default:
                            console.log('Canceled');
                            break;
                        case 'y':
                        case 'Y':
                        case 'yes':
                            // TODO: write file
                            console.log('Saved! 🎉');
                            break;
                    }
                    process.exit(0);
                    return [2 /*return*/];
            }
        });
    });
}
exports.handler = handler;
var DISCLAIMER = "\nThis utility will help you quickly create a p8.json file.\nThis file will keep track of basic info and the dependencies of your project.\n\nUse `p8 add <filepath or url>` afterwards to save dependencies in p8.json.\n\nPress ^C at any time to quit.\n";
function createCLI() {
    console.log(DISCLAIMER);
    var rl = readline_1["default"].createInterface({
        input: process.stdin,
        output: process.stdout
    });
    return function ask(prompt, defaultValue) {
        return new Promise(function (resolve) {
            var _defaultValue = defaultValue ? "(" + defaultValue + ") " : '';
            rl.question(prompt + " " + _defaultValue, function (answer) {
                return resolve(answer || defaultValue || '');
            });
        });
    };
}
//# sourceMappingURL=init.js.map