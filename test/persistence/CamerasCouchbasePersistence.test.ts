const process = require('process');

import { ConfigParams } from 'pip-services3-commons-nodex';

import { CamerasCouchbasePersistence } from '../../src/persistence/CamerasCouchbasePersistence';
import { CamerasPersistenceFixture } from './CamerasPersistenceFixture';

suite('CamerasCouchbasePersistence', () => {
    let persistence: CamerasCouchbasePersistence;
    let fixture: CamerasPersistenceFixture;

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

    setup(async () => {
        let dbConfig = ConfigParams.fromTuples(
            'options.auto_create', true,
            'options.auto_index', true,
            "collection", COUCHBASE_COLLECTION,
            "bucket", COUCHBASE_BUCKET,
            "connection.host", COUCHBASE_SERVICE_HOST,
            "connection.port", COUCHBASE_SERVICE_PORT,
            "connection.uri", COUCHBASE_SERVICE_URI,
            'connection.operation_timeout', 2,
            'connection.detailed_errcodes', 1,
            'credential.username', COUCHBASE_USER,
            'credential.password', COUCHBASE_PASS
        );

        persistence = new CamerasCouchbasePersistence();
        persistence.configure(dbConfig);

        fixture = new CamerasPersistenceFixture(persistence);

        try {
            await persistence.open(null);
            await persistence.clear(null);
        } catch (ex) {
            console.log(ex);
            throw ex;
        }
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