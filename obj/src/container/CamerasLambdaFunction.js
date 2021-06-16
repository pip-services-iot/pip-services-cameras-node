"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = exports.CamerasLambdaFunction = void 0;
const pip_services3_aws_nodex_1 = require("pip-services3-aws-nodex");
const CamerasServiceFactory_1 = require("../build/CamerasServiceFactory");
class CamerasLambdaFunction extends pip_services3_aws_nodex_1.LambdaFunction {
    constructor() {
        super('cameras', 'Cameras positioning function');
        this._factories.add(new CamerasServiceFactory_1.CamerasServiceFactory());
    }
}
exports.CamerasLambdaFunction = CamerasLambdaFunction;
exports.handler = new CamerasLambdaFunction().getHandler();
//# sourceMappingURL=CamerasLambdaFunction.js.map