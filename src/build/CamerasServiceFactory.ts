import { Factory } from 'pip-services3-components-nodex';
import { Descriptor } from 'pip-services3-commons-nodex';

import { CamerasMemoryPersistence } from '../persistence/CamerasMemoryPersistence';
import { CamerasFilePersistence } from '../persistence/CamerasFilePersistence';
import { CamerasMongoDbPersistence } from '../persistence/CamerasMongoDbPersistence';
import { CamerasCouchbasePersistence } from '../persistence/CamerasCouchbasePersistence';
import { CamerasController } from '../logic/CamerasController';
import { CamerasHttpServiceV1 } from '../services/version1/CamerasHttpServiceV1';
import { CamerasLambdaServiceV1 } from '../services/version1/CamerasLambdaServiceV1';
import { CamerasGrpcServiceV1 } from '../services/version1/CamerasGrpcServiceV1';

export class CamerasServiceFactory extends Factory {
    public static MemoryPersistenceDescriptor = new Descriptor('pip-services-cameras', 'persistence', 'memory', '*', '1.0');
    public static FilePersistenceDescriptor = new Descriptor('pip-services-cameras', 'persistence', 'file', '*', '1.0');
    public static MongoDbPersistenceDescriptor = new Descriptor('pip-services-cameras', 'persistence', 'mongodb', '*', '1.0');
    public static CouchbasePersistenceDescriptor = new Descriptor('pip-services-cameras', 'persistence', 'couchbase', '*', '1.0');
    public static ControllerDescriptor = new Descriptor('pip-services-cameras', 'controller', 'default', '*', '1.0');
    public static HttpServiceDescriptor = new Descriptor('pip-services-cameras', 'service', 'http', '*', '1.0');
    public static LambdaServiceDescriptor = new Descriptor('pip-services-cameras', 'service', 'lambda', '*', '1.0');
    public static GrpcServiceDescriptor = new Descriptor('pip-services-cameras', 'service', 'grpc', '*', '1.0');

    constructor() {
        super();
        this.registerAsType(CamerasServiceFactory.MemoryPersistenceDescriptor, CamerasMemoryPersistence);
        this.registerAsType(CamerasServiceFactory.FilePersistenceDescriptor, CamerasFilePersistence);
        this.registerAsType(CamerasServiceFactory.MongoDbPersistenceDescriptor, CamerasMongoDbPersistence);
        this.registerAsType(CamerasServiceFactory.CouchbasePersistenceDescriptor, CamerasCouchbasePersistence);
        this.registerAsType(CamerasServiceFactory.ControllerDescriptor, CamerasController);
        this.registerAsType(CamerasServiceFactory.HttpServiceDescriptor, CamerasHttpServiceV1);
        this.registerAsType(CamerasServiceFactory.LambdaServiceDescriptor, CamerasLambdaServiceV1);
        this.registerAsType(CamerasServiceFactory.GrpcServiceDescriptor, CamerasGrpcServiceV1);
    }
}