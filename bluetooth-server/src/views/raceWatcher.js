import { xf } from '../functions.js';
import { doc, onSnapshot } from 'firebase/firestore';
import { db, newRace, resetRace } from '../../Fire.js';

class RaceWatcher extends HTMLElement {
    constructor() {
        super();
        this.firebaseWatch();
    }

    firebaseWatch() {
        onSnapshot(doc(db, "race", "Vdj9u6L1WiOPA8nwLmxW"), (doc) => {
            const rec = doc.data();
        });
    }
    connectedCallback() {
        this.dom = {
            raceForm: document.querySelector('#race-form'),
            race: document.querySelector('#start-race'),
            clean: document.querySelector('#clean-race'),
        };

        // this.dom.raceForm.addEventListener('valueChange', this.raceStart);
        this.dom.race.addEventListener('pointerup', this.raceStart);
        this.dom.clean.addEventListener('pointerup', this.raceClean);

        // xf.sub(`db:watchStatus`, this.onWatchStatus.bind(this));
        // xf.sub(`db:workoutStatus`, this.onWorkoutStatus.bind(this));

    }
    onStart(e) { xf.dispatch('race:start'); }
    onStop(e) { xf.dispatch('race:stop'); }
    raceStart(e) {
        // e.preventDefault()
        const pName1 = document.getElementById('pName1').value;
        const pName2 = document.getElementById('pName2').value;
        newRace(pName1, pName2)
    }
    raceClean(e) {
        // e.preventDefault()
        resetRace();
    }
}

customElements.define('race-watcher', RaceWatcher);

export { RaceWatcher };
