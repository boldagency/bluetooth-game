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
let escapeRoom = db.collection('escape-room-scores');

function isNull(x) {
    return Object.is(x, null);
}

function isUndefined(x) {
    return Object.is(x, undefined);
}

function exists(x) {
    if (isNull(x) || isUndefined(x)) { return false; }
    return true;
}

const GameState = {
    Start: 0,
    Waiting: 1,
    Warmup: 1,
    Race: 2,
    Finish: 3
}

const delta = 5;


/* ----- WE WILL NOT USE IT -----------*/
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
                pName1: "",
                pName2: "",
                state: GameState.Start
            });
        return res.status(200).send("Game init success");
    }
    catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
});
/* ----- END WE WILL NOT USE IT -----------*/


/* -----  WE WILL RUN IT EVRY TIME WE NEED TO START A NEW GAME -----------*/
app.post("/race-clean", async (req, res) => {
    res.set("Access-Control-Allow-Origin", "*");
    try {
        await (await race.get()).docs[0].ref.update({
            p1: 0,
            p2: 0,
            rpm1: 0,
            rpm2: 0,
            winner: 0,
            pName1: "",
            pName2: "",
            timer: 10,
            state: 0
        });
        return res.status(200).send("Game clean success");
    }
    catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
});
/* -----  END WE WILL RUN IT EVRY TIME WE NEED TO START A NEW GAME -----------*/



/* -----  WE WILL RUN IT WHEN WE NEED TO SET PLAYERS NAME -----------*/
app.post("/race-new", async (req, res) => {
    res.set("Access-Control-Allow-Origin", "*");
    try {
        let data = req.body;
        if (data.pName1 && data.pName2) {
            await (await race.get()).docs[0].ref.update({
                pName1: data.pName1,
                pName2: data.pName2,
                p1: 0,
                p2: 0,
                rpm1: 0,
                rpm2: 0
            });
            return res.status(200).send("players name updated");
        } else {
            return res.status(500).send('PLAYER NAME required');
        }

    }
    catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
});
/* -----  END WE WILL RUN IT WHEN WE NEED TO SET PLAYERS NAME -----------*/

app.post("/startTimer", async (req, res) => {
    res.set("Access-Control-Allow-Origin", "*");
    try {
        let data = req.body.timer;
        //  if (exists(data)) {
        await (await race.get()).docs[0].ref.update('timer', data);


        //  }

        return res.status(200).send("player updated");
    }
    catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
})

/* -----  WE WILL CALL IT TO UPDATE RPMS -----------*/
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
        console.log('rec', data)

        let isReadyPlayer1 = false;
        let isReadyPlayer2 = false;


        if (exists(data.rpm1)) {
            console.log('update rpm1')
            await (await race.get()).docs[0].ref.update('rpm1', data.rpm1);
        }

        if (exists(data.rpm2)) {
            await (await race.get()).docs[0].ref.update('rpm2', data.rpm2);
        }

        if (rpm2 != 0 && currRace.data().state == 0) {
            isReadyPlayer1 = true;
        }
        if (rpm1 != 0 && currRace.data().state == 0) {
            isReadyPlayer2 = true;
        }
        if (isReadyPlayer1 && isReadyPlayer2 && currRace.data().state == 0 && currRace.data().pName1 != '' && currRace.data().pName2 != '') {
            await currRace.ref.update('state', 1);
        }

        // if (currState === GameState.Start && (rpm1 === 0 || rpm2 === 0)) {
        //     await currRace.ref.update('state', GameState.Waiting);
        // } else if (currState === GameState.Waiting && rpm1 > 0 && rpm2 > 0) {
        //     await currRace.ref.update('state', GameState.Warmup);
        // } else 


        const updated = currRace.data();
        if (currState === 1) {
            let progress1 = updated.p1 + updated.rpm1;
            await currRace.ref.update('p1', updated.p1 + updated.rpm1); //p1 is progress
            await currRace.ref.update('p2', updated.p2 + updated.rpm2); //p2 is progress

        }

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
/* -----  END WE WILL CALL IT TO UPDATE RPMS -----------*/


/* -----  TO BE CALLED FROM FRONTEND WHEN BOTH ARE PEDDLING AND THE WAITING TIMERS ENDS  -----------*/
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
/* -----  END TO BE CALLED FROM FRONTEND WHEN BOTH ARE PEDDLING AND THE WAITING TIMERS ENDS  -----------*/

/* -----  TO BE CALLED TO GET WINNER WHEN TIMER ENDS -----------*/
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
/* -----  END TO BE CALLED TO GET WINNER  -----------*/



// API TO REGISTER ESCAPE ROOM SCORE
app.post("/register-scores-classroom", async (req, res) => {
    res.set("Access-Control-Allow-Origin", "*");
    try {
        const body = req.body;
        const writeResult = await escapeRoom.add({
            name: body["name"],
            id: body["id"],
            mobile: body["mobile"],
            scoreClassroom: 0,
            scoreKorean: 0
        });

        const snapshot = (await writeResult.get()).data();
        res.json({
            success: true,
            data: snapshot
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
});

app.post("/update-scores-classroom", async (req, res) => {
    res.set("Access-Control-Allow-Origin", "*");
    try {
        const body = req.body;
        const writeResult = await escapeRoom.where('id','==',body["id"]).get().ref.update({
            scoreClassroom: body["score"]
        });

        const leaders  = escapeRoom.where('scoreClassroom', '>',0).orderBy('scoreClassroom','asc').select('name','scoreClassroom').limit(20).get()

        res.json({
            success: true,
            leaderboard: leaders
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
});

app.post("/update-scores-korean", async (req, res) => {
    res.set("Access-Control-Allow-Origin", "*");
    try {
        const body = req.body;
        const writeResult = await escapeRoom.where('id','==',body["id"]).get().ref.update({
            scoreKorean: body["score"]
        });

        const leaders  = escapeRoom.where('scoreKorean', '>',0).orderBy('scoreKorean','asc').select('name','scoreKorean').limit(20).get()

        res.json({
            success: true,
            leaderboard: leaders
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
});

exports.app = functions.https.onRequest(app);

