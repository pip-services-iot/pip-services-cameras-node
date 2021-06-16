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
exports.CamerasCommandSet = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_2 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_3 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_4 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_5 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_6 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_7 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_8 = require("pip-services3-commons-nodex");
const CameraV1Schema_1 = require("../data/version1/CameraV1Schema");
class CamerasCommandSet extends pip_services3_commons_nodex_1.CommandSet {
    constructor(controller) {
        super();
        this._controller = controller;
        this.addCommand(this.makeGetCamerasCommand());
        this.addCommand(this.makeGetCameraByIdCommand());
        this.addCommand(this.makeGetCameraByAddressCommand());
        this.addCommand(this.makeCalculatePositionCommand());
        this.addCommand(this.makeCreateCameraCommand());
        this.addCommand(this.makeUpdateCameraCommand());
        this.addCommand(this.makeDeleteCameraByIdCommand());
    }
    makeGetCamerasCommand() {
        return new pip_services3_commons_nodex_2.Command('get_cameras', new pip_services3_commons_nodex_3.ObjectSchema(true)
            .withOptionalProperty('filter', new pip_services3_commons_nodex_5.FilterParamsSchema())
            .withOptionalProperty('paging', new pip_services3_commons_nodex_6.PagingParamsSchema()), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            let filter = pip_services3_commons_nodex_7.FilterParams.fromValue(args.get('filter'));
            let paging = pip_services3_commons_nodex_8.PagingParams.fromValue(args.get('paging'));
            return yield this._controller.getCameras(correlationId, filter, paging);
        }));
    }
    makeGetCameraByIdCommand() {
        return new pip_services3_commons_nodex_2.Command('get_camera_by_id', new pip_services3_commons_nodex_3.ObjectSchema(true)
            .withRequiredProperty('camera_id', pip_services3_commons_nodex_4.TypeCode.String), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            let cameraId = args.getAsString('camera_id');
            return yield this._controller.getCameraById(correlationId, cameraId);
        }));
    }
    makeGetCameraByAddressCommand() {
        return new pip_services3_commons_nodex_2.Command('get_camera_by_address', new pip_services3_commons_nodex_3.ObjectSchema(true)
            .withRequiredProperty('address', pip_services3_commons_nodex_4.TypeCode.String), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            let address = args.getAsString('address');
            return yield this._controller.getCameraByAddress(correlationId, address);
        }));
    }
    makeCalculatePositionCommand() {
        return new pip_services3_commons_nodex_2.Command('find_view_cameras', new pip_services3_commons_nodex_3.ObjectSchema(true)
            .withRequiredProperty('org_id', pip_services3_commons_nodex_4.TypeCode.String)
            .withRequiredProperty('position', null), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            let orgId = args.getAsString('org_id');
            let position = args.getAsObject('position');
            return yield this._controller.findViewCameras(correlationId, orgId, position);
        }));
    }
    makeCreateCameraCommand() {
        return new pip_services3_commons_nodex_2.Command('create_camera', new pip_services3_commons_nodex_3.ObjectSchema(true)
            .withRequiredProperty('camera', new CameraV1Schema_1.CameraV1Schema()), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            let camera = args.getAsObject('camera');
            return yield this._controller.createCamera(correlationId, camera);
        }));
    }
    makeUpdateCameraCommand() {
        return new pip_services3_commons_nodex_2.Command('update_camera', new pip_services3_commons_nodex_3.ObjectSchema(true)
            .withRequiredProperty('camera', new CameraV1Schema_1.CameraV1Schema()), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            let camera = args.getAsObject('camera');
            return yield this._controller.updateCamera(correlationId, camera);
        }));
    }
    makeDeleteCameraByIdCommand() {
        return new pip_services3_commons_nodex_2.Command('delete_camera_by_id', new pip_services3_commons_nodex_3.ObjectSchema(true)
            .withRequiredProperty('camera_id', pip_services3_commons_nodex_4.TypeCode.String), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            let cameraId = args.getAsString('camera_id');
            return yield this._controller.deleteCameraById(correlationId, cameraId);
        }));
    }
}
exports.CamerasCommandSet = CamerasCommandSet;
//# sourceMappingURL=CamerasCommandSet.js.map