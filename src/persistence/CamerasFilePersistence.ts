import { ConfigParams } from 'pip-services3-commons-nodex';
import { JsonFilePersister } from 'pip-services3-data-nodex';

import { CameraV1 } from '../data/version1/CameraV1';
import { CamerasMemoryPersistence } from './CamerasMemoryPersistence';

export class CamerasFilePersistence extends CamerasMemoryPersistence {
    protected _persister: JsonFilePersister<CameraV1>;

    constructor(path?: string) {
        super();

        this._persister = new JsonFilePersister<CameraV1>(path);
        this._loader = this._persister;
        this._saver = this._persister;
    }

    public configure(config: ConfigParams): void {
        super.configure(config);
        this._persister.configure(config);
    }

}