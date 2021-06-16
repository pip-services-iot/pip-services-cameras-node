"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CamerasServiceFactory = void 0;
const pip_services3_components_nodex_1 = require("pip-services3-components-nodex");
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const CamerasMemoryPersistence_1 = require("../persistence/CamerasMemoryPersistence");
const CamerasFilePersistence_1 = require("../persistence/CamerasFilePersistence");
const CamerasMongoDbPersistence_1 = require("../persistence/CamerasMongoDbPersistence");
const CamerasCouchbasePersistence_1 = require("../persistence/CamerasCouchbasePersistence");
const CamerasController_1 = require("../logic/CamerasController");
const CamerasHttpServiceV1_1 = require("../services/version1/CamerasHttpServiceV1");
const CamerasLambdaServiceV1_1 = require("../services/version1/CamerasLambdaServiceV1");
const CamerasGrpcServiceV1_1 = require("../services/version1/CamerasGrpcServiceV1");
class CamerasServiceFactory extends pip_services3_components_nodex_1.Factory {
    constructor() {
        super();
        this.registerAsType(CamerasServiceFactory.MemoryPersistenceDescriptor, CamerasMemoryPersistence_1.CamerasMemoryPersistence);
        this.registerAsType(CamerasServiceFactory.FilePersistenceDescriptor, CamerasFilePersistence_1.CamerasFilePersistence);
        this.registerAsType(CamerasServiceFactory.MongoDbPersistenceDescriptor, CamerasMongoDbPersistence_1.CamerasMongoDbPersistence);
        this.registerAsType(CamerasServiceFactory.CouchbasePersistenceDescriptor, CamerasCouchbasePersistence_1.CamerasCouchbasePersistence);
        this.registerAsType(CamerasServiceFactory.ControllerDescriptor, CamerasController_1.CamerasController);
        this.registerAsType(CamerasServiceFactory.HttpServiceDescriptor, CamerasHttpServiceV1_1.CamerasHttpServiceV1);
        this.registerAsType(CamerasServiceFactory.LambdaServiceDescriptor, CamerasLambdaServiceV1_1.CamerasLambdaServiceV1);
        this.registerAsType(CamerasServiceFactory.GrpcServiceDescriptor, CamerasGrpcServiceV1_1.CamerasGrpcServiceV1);
    }
}
exports.CamerasServiceFactory = CamerasServiceFactory;
CamerasServiceFactory.MemoryPersistenceDescriptor = new pip_services3_commons_nodex_1.Descriptor('pip-services-cameras', 'persistence', 'memory', '*', '1.0');
CamerasServiceFactory.FilePersistenceDescriptor = new pip_services3_commons_nodex_1.Descriptor('pip-services-cameras', 'persistence', 'file', '*', '1.0');
CamerasServiceFactory.MongoDbPersistenceDescriptor = new pip_services3_commons_nodex_1.Descriptor('pip-services-cameras', 'persistence', 'mongodb', '*', '1.0');
CamerasServiceFactory.CouchbasePersistenceDescriptor = new pip_services3_commons_nodex_1.Descriptor('pip-services-cameras', 'persistence', 'couchbase', '*', '1.0');
CamerasServiceFactory.ControllerDescriptor = new pip_services3_commons_nodex_1.Descriptor('pip-services-cameras', 'controller', 'default', '*', '1.0');
CamerasServiceFactory.HttpServiceDescriptor = new pip_services3_commons_nodex_1.Descriptor('pip-services-cameras', 'service', 'http', '*', '1.0');
CamerasServiceFactory.LambdaServiceDescriptor = new pip_services3_commons_nodex_1.Descriptor('pip-services-cameras', 'service', 'lambda', '*', '1.0');
CamerasServiceFactory.GrpcServiceDescriptor = new pip_services3_commons_nodex_1.Descriptor('pip-services-cameras', 'service', 'grpc', '*', '1.0');
//# sourceMappingURL=CamerasServiceFactory.js.map