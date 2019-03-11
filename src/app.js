import express from "express";
import {morgan} from "morgan";
import createRouter from "./router";

var app=express();
app.use(express.json());
app.use(createRouter());

module.exports = {app};