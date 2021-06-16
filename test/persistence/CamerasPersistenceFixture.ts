const assert = require('chai').assert;

import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';

import { CameraV1 } from '../../src/data/version1/CameraV1';
import { ICamerasPersistence } from '../../src/persistence/ICamerasPersistence';

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
let CAMERA3: CameraV1 = {
    id: '3',
    address: '000003',
    org_id: '2',
    label: 'TestCamera3',
    position: { type: 'Point', coordinates: [10, 10] },
    heading: 50,
    from_view: { type: 'Point', coordinates: [10, 10] },
    to_view: { type: 'Point', coordinates: [20, 20] }
};

export class CamerasPersistenceFixture {
    private _persistence: ICamerasPersistence;

    public constructor(persistence: ICamerasPersistence) {
        assert.isNotNull(persistence);
        this._persistence = persistence;
    }

    private async testCreateCameras() {
        // Create first camera
        let camera = await this._persistence.create(null, CAMERA1);
        assert.isObject(camera);
        assert.equal(camera.address, CAMERA1.address);
        assert.equal(camera.org_id, CAMERA1.org_id);
        assert.equal(camera.label, CAMERA1.label);
        assert.isNotNull(camera.position);

        // Create second camera
        camera = await this._persistence.create(null, CAMERA2);
        assert.isObject(camera);
        assert.equal(camera.address, CAMERA2.address);
        assert.equal(camera.org_id, CAMERA2.org_id);
        assert.equal(camera.label, CAMERA2.label);
        assert.isNotNull(camera.position);

        // Create first camera
        camera = await this._persistence.create(null, CAMERA3);
        assert.isObject(camera);
        assert.equal(camera.address, CAMERA3.address);
        assert.equal(camera.org_id, CAMERA3.org_id);
        assert.equal(camera.label, CAMERA3.label);
        assert.isNotNull(camera.position);
    }

    public async testCrudOperations() {
        // Create items
        await this.testCreateCameras();

        // Get all cameras
        let page = await this._persistence.getPageByFilter(
            null, 
            new FilterParams(),
            new PagingParams()
        );
        assert.isObject(page);
        assert.lengthOf(page.data, 3);

        let camera1 = page.data[0];

        // Update the camera
        camera1.label = 'ABC';

        let camera = await this._persistence.update(null, camera1);
        assert.isObject(camera);
        assert.equal(camera.id, camera1.id);
        assert.equal(camera.label, 'ABC');

        // Get camera by address
        camera = await this._persistence.getOneByAddress(null, camera1.address);
        assert.isObject(camera);
        assert.equal(camera.id, camera1.id);

        // Delete camera
        camera = await this._persistence.deleteById(null, camera1.id);
        assert.isObject(camera);
        assert.equal(camera.id, camera1.id);

        // Try to get deleted camera
        camera = await this._persistence.getOneById(null, camera1.id);
        assert.isNull(camera || null);
    }

    public async testGetWithFilters() {
        // Create items
        await this.testCreateCameras();

        // Filter by org_id
        let page = await this._persistence.getPageByFilter(
            null,
            FilterParams.fromTuples(
                'org_id', '1'
            ),
            new PagingParams()
        );
        assert.isObject(page);
        assert.lengthOf(page.data, 2);

        // Filter by address
        page = await this._persistence.getPageByFilter(
            null,
            FilterParams.fromTuples(
                'address', '000002'
            ),
            new PagingParams()
        );
        assert.isObject(page);
        assert.lengthOf(page.data, 1);

        // Filter by addresses
        page = await this._persistence.getPageByFilter(
            null,
            FilterParams.fromTuples(
                'addresses', '000001,000002,000004'
            ),
            new PagingParams()
        );
        assert.isObject(page);
        assert.lengthOf(page.data, 2);

        // Filter by search
        page = await this._persistence.getPageByFilter(
            null,
            FilterParams.fromTuples(
                'search', 'camera2'
            ),
            new PagingParams()
        );
        assert.isObject(page);
        assert.lengthOf(page.data, 1);

        // Filter by view
        page = await this._persistence.getPageByFilter(
            null,
            FilterParams.fromTuples(
                'view', '5:5'
            ),
            new PagingParams()
        );
        assert.isObject(page);
        assert.lengthOf(page.data, 2);
    }
}