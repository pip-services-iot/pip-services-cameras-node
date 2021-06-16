import { Descriptor } from 'pip-services3-commons-nodex';
import { CommandableHttpService } from 'pip-services3-rpc-nodex';

export class CamerasHttpServiceV1 extends CommandableHttpService {
    public constructor() {
        super('v1/cameras');
        this._dependencyResolver.put('controller', new Descriptor('pip-services-cameras', 'controller', 'default', '*', '1.0'));
    }
}