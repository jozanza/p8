"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var yargs_1 = __importDefault(require("yargs"));
var Command;
(function (Command) {
    Command["add"] = "add";
    Command["build"] = "build";
    Command["init"] = "init";
    Command["install"] = "install";
    Command["start"] = "start";
})(Command || (Command = {}));
function main() {
    // prettier-ignore
    var _a = __read(yargs_1["default"]
        .scriptName('p8')
        .version(require('../package').version)
        .usage('Usage: p8 <command> [options]')
        .commandDir('cmds')
        .help()
        .argv._, 1), command = _a[0];
    // prettier-ignore
    switch (command) {
        default:
            if (command) {
                console.log("p8: '" + command + "' is not a p8 command. See 'p8 --help'.\n");
            }
            else {
                yargs_1["default"].showHelp();
            }
        case Command.add:
        case Command.build:
        case Command.init:
        case Command.install:
        case Command.start: break;
    }
}
exports["default"] = main;
//# sourceMappingURL=index.js.map