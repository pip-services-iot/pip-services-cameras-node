import { ConfigParams } from 'pip-services3-commons-nodex';
import { JsonFilePersister } from 'pip-services3-data-nodex';
import { CameraV1 } from '../data/version1/CameraV1';
import { CamerasMemoryPersistence } from './CamerasMemoryPersistence';
export declare class CamerasFilePersistence extends CamerasMemoryPersistence {
    protected _persister: JsonFilePersister<CameraV1>;
    constructor(path?: string);
    configure(config: ConfigParams): void;
}
