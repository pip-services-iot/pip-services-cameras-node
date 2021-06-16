import { ConfigParams } from 'pip-services3-commons-nodex';

import { CamerasFilePersistence } from '../../src/persistence/CamerasFilePersistence';
import { CamerasPersistenceFixture } from './CamerasPersistenceFixture';

suite('CamerasFilePersistence', () => {
    let persistence: CamerasFilePersistence;
    let fixture: CamerasPersistenceFixture;

    setup(async () => {
        persistence = new CamerasFilePersistence();
        persistence.configure(ConfigParams.fromTuples(
            "path", "./data/cameras.test.json"
        ));

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