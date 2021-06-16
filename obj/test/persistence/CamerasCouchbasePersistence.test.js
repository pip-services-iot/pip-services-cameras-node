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
const CamerasCouchbasePersistence_1 = require("../../src/persistence/CamerasCouchbasePersistence");
const CamerasPersistenceFixture_1 = require("./CamerasPersistenceFixture");
suite('CamerasCouchbasePersistence', () => {
    let persistence;
    let fixture;
    let COUCHBASE_BUCKET = process.env["COUCHBASE_BUCKET"] || "test";
    let COUCHBASE_COLLECTION = process.env["COUCHBASE_COLLECTION"] || "cameras";
    let COUCHBASE_SERVICE_HOST = process.env["COUCHBASE_SERVICE_HOST"] || "localhost";
    let COUCHBASE_SERVICE_PORT = process.env["COUCHBASE_SERVICE_PORT"] || 8091;
    let COUCHBASE_SERVICE_URI = process.env["COUCHBASE_SERVICE_URI"];
    let COUCHBASE_USER = process.env['COUCHBASE_USER'] || 'Administrator';
    let COUCHBASE_PASS = process.env['COUCHBASE_PASS'] || 'password';
    if (COUCHBASE_SERVICE_URI == "" && COUCHBASE_SERVICE_HOST == "") {
        return;
    }
    setup(() => __awaiter(void 0, void 0, void 0, function* () {
        let dbConfig = pip_services3_commons_nodex_1.ConfigParams.fromTuples('options.auto_create', true, 'options.auto_index', true, "collection", COUCHBASE_COLLECTION, "bucket", COUCHBASE_BUCKET, "connection.host", COUCHBASE_SERVICE_HOST, "connection.port", COUCHBASE_SERVICE_PORT, "connection.uri", COUCHBASE_SERVICE_URI, 'connection.operation_timeout', 2, 'connection.detailed_errcodes', 1, 'credential.username', COUCHBASE_USER, 'credential.password', COUCHBASE_PASS);
        persistence = new CamerasCouchbasePersistence_1.CamerasCouchbasePersistence();
        persistence.configure(dbConfig);
        fixture = new CamerasPersistenceFixture_1.CamerasPersistenceFixture(persistence);
        try {
            yield persistence.open(null);
            yield persistence.clear(null);
        }
        catch (ex) {
            console.log(ex);
            throw ex;
        }
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
//# sourceMappingURL=CamerasCouchbasePersistence.test.js.map