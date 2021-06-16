import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';
import { IdentifiableMemoryPersistence } from 'pip-services3-data-nodex';
import { CameraV1 } from '../data/version1/CameraV1';
import { ICamerasPersistence } from './ICamerasPersistence';
export declare class CamerasMemoryPersistence extends IdentifiableMemoryPersistence<CameraV1, string> implements ICamerasPersistence {
    constructor();
    private matchString;
    private matchSearch;
    private composeFilter;
    getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<CameraV1>>;
    getOneByAddress(correlationId: string, address: string): Promise<CameraV1>;
}
