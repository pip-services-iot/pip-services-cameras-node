import { Descriptor } from 'pip-services3-commons-nodex';
import { CommandableLambdaService } from 'pip-services3-aws-nodex';

export class CamerasLambdaServiceV1 extends CommandableLambdaService {
    public constructor() {
        super('v1.cameras');
        this._dependencyResolver.put('controller', new Descriptor('pip-services-cameras', 'controller', 'default', '*', '1.0'));
    }
}