const assert = require('chai').assert;

import { ConfigParams } from 'pip-services3-commons-nodex';
import { References } from 'pip-services3-commons-nodex';
import { Descriptor } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';
import { TestCommandableHttpClient } from 'pip-services3-rpc-nodex';

import { CameraV1 } from '../../../src/data/version1/CameraV1';
import { CamerasMemoryPersistence } from '../../../src/persistence/CamerasMemoryPersistence';
import { CamerasController } from '../../../src/logic/CamerasController';
import { CamerasHttpServiceV1 } from '../../../src/services/version1/CamerasHttpServiceV1';

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

suite('CamerasHttpServiceV1', () => {
    let persistence: CamerasMemoryPersistence;
    let controller: CamerasController;
    let service: CamerasHttpServiceV1;
    let client: TestCommandableHttpClient;

    suiteSetup(async () => {
        let httpConfig = ConfigParams.fromTuples(
            'connection.protocol', 'http',
            'connection.host', 'localhost',
            'connection.port', 3000
        );

        persistence = new CamerasMemoryPersistence();
        persistence.configure(new ConfigParams());

        controller = new CamerasController();

        service = new CamerasHttpServiceV1();
        service.configure(httpConfig);

        client = new TestCommandableHttpClient("v1/cameras");
        client.configure(httpConfig);

        let references = References.fromTuples(
            new Descriptor('pip-services-cameras', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('pip-services-cameras', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('pip-services-cameras', 'service', 'http', 'default', '1.0'), service
        );

        controller.setReferences(references);
        service.setReferences(references);

        await service.open(null);
        await client.open(null);
    });

    suiteTeardown(async () => {
        await client.close(null);
        await service.close(null);
    });

    setup(async () => {
        await persistence.clear(null);
    });

    test('CRUD Operations', async () => {
        // Create first camera
        let camera = await client.callCommand<CameraV1>(
            'create_camera',
            null,
            {
                camera: CAMERA1
            }
        );
        assert.isObject(camera);
        assert.equal(camera.address, CAMERA1.address);
        assert.equal(camera.org_id, CAMERA1.org_id);
        assert.equal(camera.label, CAMERA1.label);
        assert.isNotNull(camera.position);

        // Create second camera
        camera = await client.callCommand<CameraV1>(
            'create_camera',
            null,
            {
                camera: CAMERA2
            }
        );
        assert.isObject(camera);
        assert.equal(camera.address, CAMERA2.address);
        assert.equal(camera.org_id, CAMERA2.org_id);
        assert.equal(camera.label, CAMERA2.label);
        assert.isNotNull(camera.position);

        // Get all cameras
        let page = await client.callCommand<DataPage<CameraV1>>(
            'get_cameras',
            null,
            {}
        );
        assert.isObject(page);
        assert.lengthOf(page.data, 2);

        let camera1 = page.data[0];

        // Update the camera
        camera1.label = 'ABC';

        camera = await client.callCommand<CameraV1>(
            'update_camera',
            null,
            {
                camera: camera1
            }
        );
        assert.isObject(camera);
        assert.equal(camera.id, camera1.id);
        assert.equal(camera.label, 'ABC');

        // Get camera by address
        camera = await client.callCommand<CameraV1>(
            'get_camera_by_address',
            null,
            {
                address: camera1.address
            }
        );
        assert.isObject(camera);
        assert.equal(camera.id, camera1.id);

        // Delete camera
        camera = await client.callCommand<CameraV1>(
            'delete_camera_by_id',
            null,
            {
                camera_id: camera1.id
            }
        );
        assert.isObject(camera);
        assert.equal(camera.id, camera1.id);

        // Try to get deleted camera
        camera = await client.callCommand<CameraV1>(
            'get_camera_by_id',
            null,
            {
                camera_id: camera1.id
            }
        );
        //assert.isNull(camera || null);
    });

    test('Find View Cameras', async () => {
        // Create first camera
        let camera = await client.callCommand<CameraV1>(
            'create_camera',
            null,
            {
                camera: CAMERA1
            }
        );
        assert.isObject(camera);
        assert.equal(camera.address, CAMERA1.address);
        assert.equal(camera.org_id, CAMERA1.org_id);
        assert.equal(camera.label, CAMERA1.label);
        assert.isNotNull(camera.position);

        // Create second camera
        camera = await client.callCommand<CameraV1>(
            'create_camera',
            null,
            {
                camera: CAMERA2
            }
        );
        assert.isObject(camera);
        assert.equal(camera.address, CAMERA2.address);
        assert.equal(camera.org_id, CAMERA2.org_id);
        assert.equal(camera.label, CAMERA2.label);
        assert.isNotNull(camera.position);

        // Find cameras
        let cameras = await client.callCommand<any>(
            'find_view_cameras',
            null,
            {
                org_id: '1',
                position: { type: "Point", coordinates: [1,1] }
            }
        );
        assert.lengthOf(cameras, 1);
    });
    
});