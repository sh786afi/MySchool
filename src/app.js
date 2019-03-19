import express from "express";
import createRouter from "./router";

var app=express();
app.use(express.json());
app.use(createRouter());

module.exports = {app};