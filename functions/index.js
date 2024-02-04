"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");
// import { generateUsername } from "unique-username-generator";
const serviceAccount = require("./serviceAccount/serviceAccountKey.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});
const db = admin.firestore();
const app = express();
app.use(cors({ origin: true }));

let race = db.collection('race');

app.post("/race-init", async (req, res) => {
    res.set("Access-Control-Allow-Origin", "*");
    try {
        await race.get().then(p => {
            p.forEach(p => p.ref.delete());
        });
        await race
            .doc()
            .create({
                p1: 0,
                p2: 0
            });
        return res.status(200).send("Game init success");
    }
    catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
});

app.post("/race-clean", async (req, res) => {
    res.set("Access-Control-Allow-Origin", "*");
    try {
        await (await race.get()).docs[0].ref.update({
            p1: 0,
            p2: 0
        });
        return res.status(200).send("Game clean success");
    }
    catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
});

app.post("/set-players", async (req, res) => {
    res.set("Access-Control-Allow-Origin", "*");
    try {
        let data = req.body;
        const oldval = (await (await race.get()).docs[0].ref.get()).data();
        if (data.p1 && oldval.p1<100) {
            await (await race.get()).docs[0].ref.update('p1', oldval.p1+ 0.5);
            return res.status(200).send("p1 updated");
        }
        if (data.p2 && oldval.p2<100) {
            await (await race.get()).docs[0].ref.update('p2', oldval.p2+ 0.5);
            return res.status(200).send("p2 updated");
        }

    }
    catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
});
exports.app = functions.https.onRequest(app);

