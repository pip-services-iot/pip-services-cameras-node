"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CamerasGrpcServiceV1 = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_grpc_nodex_1 = require("pip-services3-grpc-nodex");
class CamerasGrpcServiceV1 extends pip_services3_grpc_nodex_1.CommandableGrpcService {
    constructor() {
        super('v1.cameras');
        this._dependencyResolver.put('controller', new pip_services3_commons_nodex_1.Descriptor('pip-services-cameras', 'controller', 'default', '*', '1.0'));
    }
}
exports.CamerasGrpcServiceV1 = CamerasGrpcServiceV1;
//# sourceMappingURL=CamerasGrpcServiceV1.js.map