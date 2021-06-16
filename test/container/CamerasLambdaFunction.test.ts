const assert = require('chai').assert;

import { ConfigParams } from 'pip-services3-commons-nodex';
import { CameraV1 } from '../../src/data/version1/CameraV1';
import { CamerasLambdaFunction } from '../../src/container/CamerasLambdaFunction';

let CAMERA1: CameraV1 = {
    id: '1',
    address: '000001',
    org_id: '1',
    label: 'TestCamera1',
    position: { type: 'Point', coordinates: [0, 0] },
    heading: 50,
    from_view: { type: 'Point', coordinates: [0, 0] },
    to_view: { type: 'Point', coordinates: [10, 10] }
};
let CAMERA2: CameraV1 = {
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
    let lambda: CamerasLambdaFunction;

    setup(async () => {
        lambda = new CamerasLambdaFunction();
        lambda.configure(ConfigParams.fromTuples(
            'logger.descriptor', 'pip-services:logger:console:default:1.0',
            'persistence.descriptor', 'pip-services-cameras:persistence:memory:default:1.0',
            'controller.descriptor', 'pip-services-cameras:controller:default:default:1.0',
            'service.descriptor', 'pip-services-cameras:service:lambda:default:1.0'
        ));

        await lambda.open(null);
    });

    teardown(async () => {
        await lambda.close(null);
    });

    test('Find View Cameras', async () => {
        // Create first camera
        let camera = await lambda.act({
            cmd: 'v1.cameras.create_camera',
            camera: CAMERA1
        });
        assert.isObject(camera);
        assert.equal(camera.address, CAMERA1.address);
        assert.equal(camera.org_id, CAMERA1.org_id);
        assert.equal(camera.label, CAMERA1.label);
        assert.isNotNull(camera.position);

        // Create second camera
        camera = await lambda.act({
            cmd: 'v1.cameras.create_camera',
            camera: CAMERA2
        });
        assert.isObject(camera);
        assert.equal(camera.address, CAMERA2.address);
        assert.equal(camera.org_id, CAMERA2.org_id);
        assert.equal(camera.label, CAMERA2.label);
        assert.isNotNull(camera.position);

        // Find cameras
        let cameras = await lambda.act({
            cmd: 'v1.cameras.find_view_cameras',
            org_id: '1',
            position: { type: "Point", coordinates: [1,1] }
        });
        assert.lengthOf(cameras, 1);
    });
    
});