"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const process = require('process');
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const CamerasMongoDbPersistence_1 = require("../../src/persistence/CamerasMongoDbPersistence");
const CamerasPersistenceFixture_1 = require("./CamerasPersistenceFixture");
suite('CamerasMongoDbPersistence', () => {
    let persistence;
    let fixture;
    let MONGO_DB = process.env["MONGO_DB"] || "test";
    let MONGO_COLLECTION = process.env["MONGO_COLLECTION"] || "cameras";
    let MONGO_SERVICE_HOST = process.env["MONGO_SERVICE_HOST"] || "localhost";
    let MONGO_SERVICE_PORT = process.env["MONGO_SERVICE_PORT"] || "27017";
    let MONGO_SERVICE_URI = process.env["MONGO_SERVICE_URI"];
    if (MONGO_SERVICE_URI == "" && MONGO_SERVICE_HOST == "") {
        return;
    }
    setup(() => __awaiter(void 0, void 0, void 0, function* () {
        let dbConfig = pip_services3_commons_nodex_1.ConfigParams.fromTuples("collection", MONGO_COLLECTION, "connection.database", MONGO_DB, "connection.host", MONGO_SERVICE_HOST, "connection.port", MONGO_SERVICE_PORT, "connection.uri", MONGO_SERVICE_URI);
        persistence = new CamerasMongoDbPersistence_1.CamerasMongoDbPersistence();
        persistence.configure(dbConfig);
        fixture = new CamerasPersistenceFixture_1.CamerasPersistenceFixture(persistence);
        yield persistence.open(null);
        yield persistence.clear(null);
    }));
    teardown(() => __awaiter(void 0, void 0, void 0, function* () {
        yield persistence.close(null);
    }));
    test('CRUD Operations', () => __awaiter(void 0, void 0, void 0, function* () {
        yield fixture.testCrudOperations();
    }));
    test('Get with Filters', () => __awaiter(void 0, void 0, void 0, function* () {
        yield fixture.testGetWithFilters();
    }));
});
//# sourceMappingURL=CamerasMongoDbPersistence.test.js.map