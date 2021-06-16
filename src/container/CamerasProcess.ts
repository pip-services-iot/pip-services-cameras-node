import { ProcessContainer } from 'pip-services3-container-nodex';
import { DefaultRpcFactory } from 'pip-services3-rpc-nodex';
import { DefaultSwaggerFactory } from 'pip-services3-swagger-nodex';
import { DefaultGrpcFactory } from 'pip-services3-grpc-nodex';

import { CamerasServiceFactory } from '../build/CamerasServiceFactory';

export class CamerasProcess extends ProcessContainer {
    public constructor() {
        super('cameras', 'Cameras microservice');
        this._factories.add(new CamerasServiceFactory());
        this._factories.add(new DefaultRpcFactory);
        this._factories.add(new DefaultSwaggerFactory);
        this._factories.add(new DefaultGrpcFactory);
    }
}