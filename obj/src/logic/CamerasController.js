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
exports.CamerasController = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_2 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_3 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_4 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_5 = require("pip-services3-commons-nodex");
const CameraProtocolV1_1 = require("../data/version1/CameraProtocolV1");
const CamerasCommandSet_1 = require("./CamerasCommandSet");
class CamerasController {
    constructor() {
        this._dependencyResolver = new pip_services3_commons_nodex_4.DependencyResolver(CamerasController._defaultConfig);
    }
    configure(config) {
        this._dependencyResolver.configure(config);
    }
    setReferences(references) {
        this._dependencyResolver.setReferences(references);
        this._persistence = this._dependencyResolver.getOneRequired('persistence');
    }
    getCommandSet() {
        if (this._commandSet == null) {
            this._commandSet = new CamerasCommandSet_1.CamerasCommandSet(this);
        }
        return this._commandSet;
    }
    getCameras(correlationId, filter, paging) {
        return this._persistence.getPageByFilter(correlationId, filter, paging);
    }
    getCameraById(correlationId, id) {
        return this._persistence.getOneById(correlationId, id);
    }
    getCameraByAddress(correlationId, address) {
        return this._persistence.getOneByAddress(correlationId, address);
    }
    findViewCameras(correlationId, orgId, position) {
        return __awaiter(this, void 0, void 0, function* () {
            if (position == null || position.type != "Point"
                || position.coordinates == null || position.coordinates.length != 2) {
                return null;
            }
            let view = pip_services3_commons_nodex_3.StringConverter.toString(position.coordinates[0])
                + ":" + pip_services3_commons_nodex_3.StringConverter.toString(position.coordinates[0]);
            // Retrieve cameras
            let page = yield this._persistence.getPageByFilter(correlationId, pip_services3_commons_nodex_1.FilterParams.fromTuples('org_id', orgId, 'view', view), null);
            let cameras = page ? page.data : [];
            return cameras;
        });
    }
    fixCamera(item) {
        if (item == null)
            return;
        item.protocol = item.protocol || CameraProtocolV1_1.CameraProtocolV1.Unknown;
    }
    createCamera(correlationId, item) {
        item.id = item.id || pip_services3_commons_nodex_5.IdGenerator.nextLong();
        this.fixCamera(item);
        return this._persistence.create(correlationId, item);
    }
    updateCamera(correlationId, item) {
        this.fixCamera(item);
        return this._persistence.update(correlationId, item);
    }
    deleteCameraById(correlationId, id) {
        return this._persistence.deleteById(correlationId, id);
    }
}
exports.CamerasController = CamerasController;
CamerasController._defaultConfig = pip_services3_commons_nodex_2.ConfigParams.fromTuples('dependencies.persistence', 'pip-services-cameras:persistence:*:*:1.0');
//# sourceMappingURL=CamerasController.js.map