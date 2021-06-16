import { Descriptor } from 'pip-services3-commons-nodex';
import { CommandableGrpcService } from 'pip-services3-grpc-nodex';

export class CamerasGrpcServiceV1 extends CommandableGrpcService {
    public constructor() {
        super('v1.cameras');
        this._dependencyResolver.put('controller', new Descriptor('pip-services-cameras', 'controller', 'default', '*', '1.0'));
    }
}