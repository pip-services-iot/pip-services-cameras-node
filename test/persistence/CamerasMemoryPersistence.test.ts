import { ConfigParams } from 'pip-services3-commons-nodex';

import { CamerasMemoryPersistence } from '../../src/persistence/CamerasMemoryPersistence';
import { CamerasPersistenceFixture } from './CamerasPersistenceFixture';

suite('CamerasMemoryPersistence', () => {
    let persistence: CamerasMemoryPersistence;
    let fixture: CamerasPersistenceFixture;

    setup(async () => {
        persistence = new CamerasMemoryPersistence();
        persistence.configure(new ConfigParams());

        fixture = new CamerasPersistenceFixture(persistence);

        await persistence.open(null);
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