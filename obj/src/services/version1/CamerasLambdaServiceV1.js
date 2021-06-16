"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CamerasLambdaServiceV1 = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_aws_nodex_1 = require("pip-services3-aws-nodex");
class CamerasLambdaServiceV1 extends pip_services3_aws_nodex_1.CommandableLambdaService {
    constructor() {
        super('v1.cameras');
        this._dependencyResolver.put('controller', new pip_services3_commons_nodex_1.Descriptor('pip-services-cameras', 'controller', 'default', '*', '1.0'));
    }
}
exports.CamerasLambdaServiceV1 = CamerasLambdaServiceV1;
//# sourceMappingURL=CamerasLambdaServiceV1.js.map