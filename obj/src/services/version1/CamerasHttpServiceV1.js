"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CamerasHttpServiceV1 = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_rpc_nodex_1 = require("pip-services3-rpc-nodex");
class CamerasHttpServiceV1 extends pip_services3_rpc_nodex_1.CommandableHttpService {
    constructor() {
        super('v1/cameras');
        this._dependencyResolver.put('controller', new pip_services3_commons_nodex_1.Descriptor('pip-services-cameras', 'controller', 'default', '*', '1.0'));
    }
}
exports.CamerasHttpServiceV1 = CamerasHttpServiceV1;
//# sourceMappingURL=CamerasHttpServiceV1.js.map