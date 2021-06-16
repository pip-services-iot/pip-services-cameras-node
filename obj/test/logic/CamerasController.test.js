"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require('chai').assert;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_2 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_3 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_4 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_5 = require("pip-services3-commons-nodex");
const CamerasMemoryPersistence_1 = require("../../src/persistence/CamerasMemoryPersistence");
const CamerasController_1 = require("../../src/logic/CamerasController");
let CAMERA1 = {
    id: '1',
    address: '000001',
    org_id: '1',
    label: 'TestCamera1',
    position: { type: 'Point', coordinates: [0, 0] },
    heading: 50,
    from_view: { type: 'Point', coordinates: [0, 0] },
    to_view: { type: 'Point', coordinates: [10, 10] }
};
let CAMERA2 = {
    id: '2',
    address: '000002',
    org_id: '1',
    label: 'TestCamera2',
    position: { type: 'Point', coordinates: [2, 2] },
    heading: 70,
    from_view: { type: 'Point', coordinates: [2, 2] },
    to_view: { type: 'Point', coordinates: [12, 12] }
};
suite('CamerasController', () => {
    let persistence;
    let controller;
    setup(() => __awaiter(void 0, void 0, void 0, function* () {
        persistence = new CamerasMemoryPersistence_1.CamerasMemoryPersistence();
        persistence.configure(new pip_services3_commons_nodex_1.ConfigParams());
        controller = new CamerasController_1.CamerasController();
        let references = pip_services3_commons_nodex_2.References.fromTuples(new pip_services3_commons_nodex_3.Descriptor('pip-services-cameras', 'persistence', 'memory', 'default', '1.0'), persistence, new pip_services3_commons_nodex_3.Descriptor('pip-services-cameras', 'controller', 'default', 'default', '1.0'), controller);
        controller.setReferences(references);
        yield persistence.open(null);
    }));
    teardown(() => __awaiter(void 0, void 0, void 0, function* () {
        yield persistence.close(null);
    }));
    test('CRUD Operations', () => __awaiter(void 0, void 0, void 0, function* () {
        // Create first camera
        let camera = yield controller.createCamera(null, CAMERA1);
        assert.isObject(camera);
        assert.equal(camera.address, CAMERA1.address);
        assert.equal(camera.org_id, CAMERA1.org_id);
        assert.equal(camera.label, CAMERA1.label);
        assert.isNotNull(camera.position);
        // Create second camera
        camera = yield controller.createCamera(null, CAMERA2);
        assert.isObject(camera);
        assert.equal(camera.address, CAMERA2.address);
        assert.equal(camera.org_id, CAMERA2.org_id);
        assert.equal(camera.label, CAMERA2.label);
        assert.isNotNull(camera.position);
        // Get all cameras
        let page = yield controller.getCameras(null, new pip_services3_commons_nodex_4.FilterParams(), new pip_services3_commons_nodex_5.PagingParams());
        assert.isObject(page);
        assert.lengthOf(page.data, 2);
        let camera1 = page.data[0];
        // Update the camera
        camera1.label = 'ABC';
        camera = yield controller.updateCamera(null, camera1);
        assert.isObject(camera);
        assert.equal(camera.id, camera1.id);
        assert.equal(camera.label, 'ABC');
        // Get camera by address
        camera = yield controller.getCameraByAddress(null, camera1.address);
        assert.isObject(camera);
        assert.equal(camera.id, camera1.id);
        // Delete camera
        camera = yield controller.deleteCameraById(null, camera1.id);
        assert.isObject(camera);
        assert.equal(camera.id, camera1.id);
        // Try to get deleted camera
        camera = yield controller.getCameraById(null, camera1.id);
        assert.isNull(camera || null);
    }));
    test('Find View Cameras', () => __awaiter(void 0, void 0, void 0, function* () {
        // Create first camera
        let camera = yield controller.createCamera(null, CAMERA1);
        assert.isObject(camera);
        // Create second camera
        camera = yield controller.createCamera(null, CAMERA2);
        assert.isObject(camera);
        // Find cameras
        let cameras = yield controller.findViewCameras(null, '1', { type: "Point", coordinates: [1, 1] });
        assert.lengthOf(cameras, 1);
    }));
});
//# sourceMappingURL=CamerasController.test.js.map