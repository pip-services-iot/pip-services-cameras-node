const process = require('process');

import { ConfigParams } from 'pip-services3-commons-nodex';

import { CamerasMongoDbPersistence } from '../../src/persistence/CamerasMongoDbPersistence';
import { CamerasPersistenceFixture } from './CamerasPersistenceFixture';

suite('CamerasMongoDbPersistence', () => {
    let persistence: CamerasMongoDbPersistence;
    let fixture: CamerasPersistenceFixture;

    let MONGO_DB = process.env["MONGO_DB"] || "test";
    let MONGO_COLLECTION = process.env["MONGO_COLLECTION"] || "cameras";
    let MONGO_SERVICE_HOST = process.env["MONGO_SERVICE_HOST"] || "localhost";
    let MONGO_SERVICE_PORT = process.env["MONGO_SERVICE_PORT"] || "27017";
    let MONGO_SERVICE_URI = process.env["MONGO_SERVICE_URI"];

    if (MONGO_SERVICE_URI == "" && MONGO_SERVICE_HOST == "") {
        return;
    }

    setup(async () => {
        let dbConfig = ConfigParams.fromTuples(
            "collection", MONGO_COLLECTION,
            "connection.database", MONGO_DB,
            "connection.host", MONGO_SERVICE_HOST,
            "connection.port", MONGO_SERVICE_PORT,
            "connection.uri", MONGO_SERVICE_URI
        );

        persistence = new CamerasMongoDbPersistence();
        persistence.configure(dbConfig);

        fixture = new CamerasPersistenceFixture(persistence);

        await persistence.open(null);
        await persistence.clear(null);
    });

    teardown(async () => {
        await persistence.close(null);
    });

    test('CRUD Operations', async () => {
        await fixture.testCrudOperations();
    });

    test('Get with Filters', async () => {
        await fixture.testGetWithFilters();
    });

});