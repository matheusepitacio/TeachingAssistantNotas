"use strict";
exports.__esModule = true;
var express_1 = require("express");
var routes = require('./routes');
var app = express_1["default"]();
app.use(express_1["default"].json());
app.use(routes);
app.post('register-aluno', function (req, res) {
    res.send("Sim, pode");
});
app.listen(3000, function () {
    console.log('listening on port 3000');
});
