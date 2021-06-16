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
exports.CamerasPersistenceFixture = void 0;
const assert = require('chai').assert;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_2 = require("pip-services3-commons-nodex");
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
let CAMERA3 = {
    id: '3',
    address: '000003',
    org_id: '2',
    label: 'TestCamera3',
    position: { type: 'Point', coordinates: [10, 10] },
    heading: 50,
    from_view: { type: 'Point', coordinates: [10, 10] },
    to_view: { type: 'Point', coordinates: [20, 20] }
};
class CamerasPersistenceFixture {
    constructor(persistence) {
        assert.isNotNull(persistence);
        this._persistence = persistence;
    }
    testCreateCameras() {
        return __awaiter(this, void 0, void 0, function* () {
            // Create first camera
            let camera = yield this._persistence.create(null, CAMERA1);
            assert.isObject(camera);
            assert.equal(camera.address, CAMERA1.address);
            assert.equal(camera.org_id, CAMERA1.org_id);
            assert.equal(camera.label, CAMERA1.label);
            assert.isNotNull(camera.position);
            // Create second camera
            camera = yield this._persistence.create(null, CAMERA2);
            assert.isObject(camera);
            assert.equal(camera.address, CAMERA2.address);
            assert.equal(camera.org_id, CAMERA2.org_id);
            assert.equal(camera.label, CAMERA2.label);
            assert.isNotNull(camera.position);
            // Create first camera
            camera = yield this._persistence.create(null, CAMERA3);
            assert.isObject(camera);
            assert.equal(camera.address, CAMERA3.address);
            assert.equal(camera.org_id, CAMERA3.org_id);
            assert.equal(camera.label, CAMERA3.label);
            assert.isNotNull(camera.position);
        });
    }
    testCrudOperations() {
        return __awaiter(this, void 0, void 0, function* () {
            // Create items
            yield this.testCreateCameras();
            // Get all cameras
            let page = yield this._persistence.getPageByFilter(null, new pip_services3_commons_nodex_1.FilterParams(), new pip_services3_commons_nodex_2.PagingParams());
            assert.isObject(page);
            assert.lengthOf(page.data, 3);
            let camera1 = page.data[0];
            // Update the camera
            camera1.label = 'ABC';
            let camera = yield this._persistence.update(null, camera1);
            assert.isObject(camera);
            assert.equal(camera.id, camera1.id);
            assert.equal(camera.label, 'ABC');
            // Get camera by address
            camera = yield this._persistence.getOneByAddress(null, camera1.address);
            assert.isObject(camera);
            assert.equal(camera.id, camera1.id);
            // Delete camera
            camera = yield this._persistence.deleteById(null, camera1.id);
            assert.isObject(camera);
            assert.equal(camera.id, camera1.id);
            // Try to get deleted camera
            camera = yield this._persistence.getOneById(null, camera1.id);
            assert.isNull(camera || null);
        });
    }
    testGetWithFilters() {
        return __awaiter(this, void 0, void 0, function* () {
            // Create items
            yield this.testCreateCameras();
            // Filter by org_id
            let page = yield this._persistence.getPageByFilter(null, pip_services3_commons_nodex_1.FilterParams.fromTuples('org_id', '1'), new pip_services3_commons_nodex_2.PagingParams());
            assert.isObject(page);
            assert.lengthOf(page.data, 2);
            // Filter by address
            page = yield this._persistence.getPageByFilter(null, pip_services3_commons_nodex_1.FilterParams.fromTuples('address', '000002'), new pip_services3_commons_nodex_2.PagingParams());
            assert.isObject(page);
            assert.lengthOf(page.data, 1);
            // Filter by addresses
            page = yield this._persistence.getPageByFilter(null, pip_services3_commons_nodex_1.FilterParams.fromTuples('addresses', '000001,000002,000004'), new pip_services3_commons_nodex_2.PagingParams());
            assert.isObject(page);
            assert.lengthOf(page.data, 2);
            // Filter by search
            page = yield this._persistence.getPageByFilter(null, pip_services3_commons_nodex_1.FilterParams.fromTuples('search', 'camera2'), new pip_services3_commons_nodex_2.PagingParams());
            assert.isObject(page);
            assert.lengthOf(page.data, 1);
            // Filter by view
            page = yield this._persistence.getPageByFilter(null, pip_services3_commons_nodex_1.FilterParams.fromTuples('view', '5:5'), new pip_services3_commons_nodex_2.PagingParams());
            assert.isObject(page);
            assert.lengthOf(page.data, 2);
        });
    }
}
exports.CamerasPersistenceFixture = CamerasPersistenceFixture;
//# sourceMappingURL=CamerasPersistenceFixture.js.map