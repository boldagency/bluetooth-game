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

const GameState = {
    Start: 0,
    Waiting: 1,
    Warmup: 1,
    Race: 2,
    Finish: 3
}

const delta = 5;

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
                p2: 0,
                rpm1: 0,
                rpm2: 0,
                state: GameState.Start
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
            p2: 0,
            rpm1: 0,
            rpm2: 0,
            winner: 0,
            state: GameState.Start
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
        const currRace = (await race.get()).docs[0]
        const oldval = currRace.data();
        let currState = oldval.state;
        let p1 = oldval.p1;
        let p2 = oldval.p2;
        let rpm1 = oldval.rpm1;
        let rpm2 = oldval.rpm2;
        console.log('rec',data)

        if (data.rpm1) {
            console.log('update rpm1')
            await (await race.get()).docs[0].ref.update('rpm1', data.rpm1);
        }

        if (data.rpm2) {
            await (await race.get()).docs[0].ref.update('rpm2', data.rpm2);
        }

        if (currState === GameState.Start && (rpm1 === 0 || rpm2 === 0)) {
            await currRace.ref.update('state', GameState.Waiting);
        } else if (currState === GameState.Waiting && rpm1 > 0 && rpm2 > 0) {
            await currRace.ref.update('state', GameState.Warmup);
        } else if (currState === GameState.Race) {
            if (data.rpm1 && p1 < 100) {
                await currRace.ref.update('p1', p1 + delta);
            }
            if (data.rpm2 && p2 < 100) {
                await currRace.ref.update('p2', p2 + delta);
            }
        }
        const updated = currRace.data();
        if (updated.state === GameState.Race &&
            (updated.p1 >= 100 || updated.p2 >= 100)) {
            await currRace.ref.update('state', GameState.Finish);
            if (updated.p1 >= 100) {
                await currRace.ref.update('winner', 1);
            } else {
                await currRace.ref.update('winner', 2);
            }

        }

        return res.status(200).send("player updated");



    }
    catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
});

app.post("/start-race", async (req, res) => {
    res.set("Access-Control-Allow-Origin", "*");
    try {
        const currRace = (await race.get()).docs[0]
        await currRace.ref.update('state', GameState.Race);
    }
    catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
});

app.post("/time-up", async (req, res) => {
    res.set("Access-Control-Allow-Origin", "*");
    try {
        const currRace = (await race.get()).docs[0]
        const data = currRace.data()
        if (data.state === GameState.Race) {
            await currRace.ref.update('state', GameState.Finish);
            if (data.p1 > data.p2) {
                await currRace.ref.update('winner', 1);
            } else {
                await currRace.ref.update('winner', 2);
            }

        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
});
exports.app = functions.https.onRequest(app);

