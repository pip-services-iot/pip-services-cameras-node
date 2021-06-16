"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CamerasProcess = void 0;
const pip_services3_container_nodex_1 = require("pip-services3-container-nodex");
const pip_services3_rpc_nodex_1 = require("pip-services3-rpc-nodex");
const pip_services3_swagger_nodex_1 = require("pip-services3-swagger-nodex");
const pip_services3_grpc_nodex_1 = require("pip-services3-grpc-nodex");
const CamerasServiceFactory_1 = require("../build/CamerasServiceFactory");
class CamerasProcess extends pip_services3_container_nodex_1.ProcessContainer {
    constructor() {
        super('cameras', 'Cameras positioning microservice');
        this._factories.add(new CamerasServiceFactory_1.CamerasServiceFactory());
        this._factories.add(new pip_services3_rpc_nodex_1.DefaultRpcFactory);
        this._factories.add(new pip_services3_swagger_nodex_1.DefaultSwaggerFactory);
        this._factories.add(new pip_services3_grpc_nodex_1.DefaultGrpcFactory);
    }
}
exports.CamerasProcess = CamerasProcess;
//# sourceMappingURL=CamerasProcess.js.map