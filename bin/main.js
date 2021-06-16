let CamerasProcess = require('../obj/src/container/CamerasProcess').CamerasProcess;

try {
    new CamerasProcess().run(process.argv);
} catch (ex) {
    console.error(ex);
}