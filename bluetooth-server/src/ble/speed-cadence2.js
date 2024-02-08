import { xf, equals, exists } from '../functions.js';
import { ble } from './web-ble.js';
import { uuids } from './uuids.js';
import { Device } from './device.js';
import { SpeedCadenceService } from './cscs/cscs.js';
import { models } from '../models/models.js';

class SpeedCadence2 extends Device {
    defaultId() {
        return `ble:speed-and-cadence2`;
    }
    defaultFilter() {
        return ble.requestFilters.speedCadence2;
    }
    async start() {
        const self = this;

        const service = await self.getService(uuids.speedCadence);

        const maxRateCount = (/magene|gemini/.test(self.name.toLowerCase())) ? 10 : 3;

        self.speedCadence = new SpeedCadenceService({
            onData: onData.bind(self),
            options: { maxRateCount },
            service,
            ble,
        });

        await self.speedCadence.start();
    }
}

function onData(data) {
    const self = this;
    console.log("received 222", data)

    if (exists(data.cadence)) {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify({ rpm2: data.cadence }),
            redirect: 'follow'
        };
        fetch("https://us-central1-bluetooth-race.cloudfunctions.net/app/set-players", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
        console.log("Sending data to the client");
        if (models.sources.isSource('cadence', self.id)) {
            xf.dispatch('cadence', data.cadence);
        }
        if (models.sources.isSource('cadence2', self.id)) {
            xf.dispatch('cadence', data.cadence);
        }
    };
    if (exists(data.speed) && models.sources.isSource('speed', self.id)) {
        xf.dispatch(`speed2`, models.speed.kmhToMps(data.speed));
    };
}

export { SpeedCadence2 };

