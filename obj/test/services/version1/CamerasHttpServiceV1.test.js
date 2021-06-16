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
const pip_services3_rpc_nodex_1 = require("pip-services3-rpc-nodex");
const CamerasMemoryPersistence_1 = require("../../../src/persistence/CamerasMemoryPersistence");
const CamerasController_1 = require("../../../src/logic/CamerasController");
const CamerasHttpServiceV1_1 = require("../../../src/services/version1/CamerasHttpServiceV1");
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
suite('CamerasHttpServiceV1', () => {
    let persistence;
    let controller;
    let service;
    let client;
    suiteSetup(() => __awaiter(void 0, void 0, void 0, function* () {
        let httpConfig = pip_services3_commons_nodex_1.ConfigParams.fromTuples('connection.protocol', 'http', 'connection.host', 'localhost', 'connection.port', 3000);
        persistence = new CamerasMemoryPersistence_1.CamerasMemoryPersistence();
        persistence.configure(new pip_services3_commons_nodex_1.ConfigParams());
        controller = new CamerasController_1.CamerasController();
        service = new CamerasHttpServiceV1_1.CamerasHttpServiceV1();
        service.configure(httpConfig);
        client = new pip_services3_rpc_nodex_1.TestCommandableHttpClient("v1/cameras");
        client.configure(httpConfig);
        let references = pip_services3_commons_nodex_2.References.fromTuples(new pip_services3_commons_nodex_3.Descriptor('pip-services-cameras', 'persistence', 'memory', 'default', '1.0'), persistence, new pip_services3_commons_nodex_3.Descriptor('pip-services-cameras', 'controller', 'default', 'default', '1.0'), controller, new pip_services3_commons_nodex_3.Descriptor('pip-services-cameras', 'service', 'http', 'default', '1.0'), service);
        controller.setReferences(references);
        service.setReferences(references);
        yield service.open(null);
        yield client.open(null);
    }));
    suiteTeardown(() => __awaiter(void 0, void 0, void 0, function* () {
        yield client.close(null);
        yield service.close(null);
    }));
    setup(() => __awaiter(void 0, void 0, void 0, function* () {
        yield persistence.clear(null);
    }));
    test('CRUD Operations', () => __awaiter(void 0, void 0, void 0, function* () {
        // Create first camera
        let camera = yield client.callCommand('create_camera', null, {
            camera: CAMERA1
        });
        assert.isObject(camera);
        assert.equal(camera.address, CAMERA1.address);
        assert.equal(camera.org_id, CAMERA1.org_id);
        assert.equal(camera.label, CAMERA1.label);
        assert.isNotNull(camera.position);
        // Create second camera
        camera = yield client.callCommand('create_camera', null, {
            camera: CAMERA2
        });
        assert.isObject(camera);
        assert.equal(camera.address, CAMERA2.address);
        assert.equal(camera.org_id, CAMERA2.org_id);
        assert.equal(camera.label, CAMERA2.label);
        assert.isNotNull(camera.position);
        // Get all cameras
        let page = yield client.callCommand('get_cameras', null, {});
        assert.isObject(page);
        assert.lengthOf(page.data, 2);
        let camera1 = page.data[0];
        // Update the camera
        camera1.label = 'ABC';
        camera = yield client.callCommand('update_camera', null, {
            camera: camera1
        });
        assert.isObject(camera);
        assert.equal(camera.id, camera1.id);
        assert.equal(camera.label, 'ABC');
        // Get camera by address
        camera = yield client.callCommand('get_camera_by_address', null, {
            address: camera1.address
        });
        assert.isObject(camera);
        assert.equal(camera.id, camera1.id);
        // Delete camera
        camera = yield client.callCommand('delete_camera_by_id', null, {
            camera_id: camera1.id
        });
        assert.isObject(camera);
        assert.equal(camera.id, camera1.id);
        // Try to get deleted camera
        camera = yield client.callCommand('get_camera_by_id', null, {
            camera_id: camera1.id
        });
        //assert.isNull(camera || null);
    }));
    test('Find View Cameras', () => __awaiter(void 0, void 0, void 0, function* () {
        // Create first camera
        let camera = yield client.callCommand('create_camera', null, {
            camera: CAMERA1
        });
        assert.isObject(camera);
        assert.equal(camera.address, CAMERA1.address);
        assert.equal(camera.org_id, CAMERA1.org_id);
        assert.equal(camera.label, CAMERA1.label);
        assert.isNotNull(camera.position);
        // Create second camera
        camera = yield client.callCommand('create_camera', null, {
            camera: CAMERA2
        });
        assert.isObject(camera);
        assert.equal(camera.address, CAMERA2.address);
        assert.equal(camera.org_id, CAMERA2.org_id);
        assert.equal(camera.label, CAMERA2.label);
        assert.isNotNull(camera.position);
        // Find cameras
        let cameras = yield client.callCommand('find_view_cameras', null, {
            org_id: '1',
            position: { type: "Point", coordinates: [1, 1] }
        });
        assert.lengthOf(cameras, 1);
    }));
});
//# sourceMappingURL=CamerasHttpServiceV1.test.js.map