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
const CamerasLambdaFunction_1 = require("../../src/container/CamerasLambdaFunction");
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
suite('CamerasLambdaFunction', () => {
    let lambda;
    setup(() => __awaiter(void 0, void 0, void 0, function* () {
        lambda = new CamerasLambdaFunction_1.CamerasLambdaFunction();
        lambda.configure(pip_services3_commons_nodex_1.ConfigParams.fromTuples('logger.descriptor', 'pip-services:logger:console:default:1.0', 'persistence.descriptor', 'pip-services-cameras:persistence:memory:default:1.0', 'controller.descriptor', 'pip-services-cameras:controller:default:default:1.0', 'service.descriptor', 'pip-services-cameras:service:lambda:default:1.0'));
        yield lambda.open(null);
    }));
    teardown(() => __awaiter(void 0, void 0, void 0, function* () {
        yield lambda.close(null);
    }));
    test('Find View Cameras', () => __awaiter(void 0, void 0, void 0, function* () {
        // Create first camera
        let camera = yield lambda.act({
            cmd: 'v1.cameras.create_camera',
            camera: CAMERA1
        });
        assert.isObject(camera);
        assert.equal(camera.address, CAMERA1.address);
        assert.equal(camera.org_id, CAMERA1.org_id);
        assert.equal(camera.label, CAMERA1.label);
        assert.isNotNull(camera.position);
        // Create second camera
        camera = yield lambda.act({
            cmd: 'v1.cameras.create_camera',
            camera: CAMERA2
        });
        assert.isObject(camera);
        assert.equal(camera.address, CAMERA2.address);
        assert.equal(camera.org_id, CAMERA2.org_id);
        assert.equal(camera.label, CAMERA2.label);
        assert.isNotNull(camera.position);
        // Find cameras
        let cameras = yield lambda.act({
            cmd: 'v1.cameras.find_view_cameras',
            org_id: '1',
            position: { type: "Point", coordinates: [1, 1] }
        });
        assert.lengthOf(cameras, 1);
    }));
});
//# sourceMappingURL=CamerasLambdaFunction.test.js.map