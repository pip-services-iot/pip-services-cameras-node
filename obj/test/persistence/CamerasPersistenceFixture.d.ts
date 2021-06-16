import { ICamerasPersistence } from '../../src/persistence/ICamerasPersistence';
export declare class CamerasPersistenceFixture {
    private _persistence;
    constructor(persistence: ICamerasPersistence);
    private testCreateCameras;
    testCrudOperations(): Promise<void>;
    testGetWithFilters(): Promise<void>;
}
