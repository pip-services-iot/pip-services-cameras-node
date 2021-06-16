const assert = require('chai').assert;

import { ConfigParams } from 'pip-services3-commons-nodex';
import { References } from 'pip-services3-commons-nodex';
import { Descriptor } from 'pip-services3-commons-nodex';
import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';

import { CameraV1 } from '../../src/data/version1/CameraV1';
import { CamerasMemoryPersistence } from '../../src/persistence/CamerasMemoryPersistence';
import { CamerasController } from '../../src/logic/CamerasController';

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

suite('CamerasController', () => {
    let persistence: CamerasMemoryPersistence;
    let controller: CamerasController;

    setup(async () => {
        persistence = new CamerasMemoryPersistence();
        persistence.configure(new ConfigParams());

        controller = new CamerasController();

        let references = References.fromTuples(
            new Descriptor('pip-services-cameras', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('pip-services-cameras', 'controller', 'default', 'default', '1.0'), controller
        );

        controller.setReferences(references);

        await persistence.open(null);
    });

    teardown(async () => {
        await persistence.close(null);
    });

    test('CRUD Operations', async () => {
        // Create first camera
        let camera = await controller.createCamera(null, CAMERA1);
        assert.isObject(camera);
        assert.equal(camera.address, CAMERA1.address);
        assert.equal(camera.org_id, CAMERA1.org_id);
        assert.equal(camera.label, CAMERA1.label);
        assert.isNotNull(camera.position);

        // Create second camera
        camera = await controller.createCamera(null, CAMERA2);
        assert.isObject(camera);
        assert.equal(camera.address, CAMERA2.address);
        assert.equal(camera.org_id, CAMERA2.org_id);
        assert.equal(camera.label, CAMERA2.label);
        assert.isNotNull(camera.position);

        // Get all cameras
        let page = await controller.getCameras(
            null, 
            new FilterParams(),
            new PagingParams()
        );
        assert.isObject(page);
        assert.lengthOf(page.data, 2);

        let camera1 = page.data[0];

        // Update the camera
        camera1.label = 'ABC';

        camera = await controller.updateCamera(null, camera1);
        assert.isObject(camera);
        assert.equal(camera.id, camera1.id);
        assert.equal(camera.label, 'ABC');

        // Get camera by address
        camera = await controller.getCameraByAddress(null, camera1.address);
        assert.isObject(camera);
        assert.equal(camera.id, camera1.id);

        // Delete camera
        camera = await controller.deleteCameraById(null, camera1.id);
        assert.isObject(camera);
        assert.equal(camera.id, camera1.id);

        // Try to get deleted camera
        camera = await controller.getCameraById(null, camera1.id);
        assert.isNull(camera || null);
    });

    test('Find View Cameras', async () => {
        // Create first camera
        let camera = await controller.createCamera(null, CAMERA1);
        assert.isObject(camera);

        // Create second camera
        camera = await controller.createCamera(null, CAMERA2);
        assert.isObject(camera);

        // Find cameras
        let cameras = await controller.findViewCameras(
            null, 
            '1',
            { type: "Point", coordinates: [1,1] }
        );
        assert.lengthOf(cameras, 1);
    });
    
});