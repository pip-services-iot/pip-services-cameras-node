import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';
import { IGetter } from 'pip-services3-data-nodex';
import { IWriter } from 'pip-services3-data-nodex';

import { CameraV1 } from '../data/version1/CameraV1';

export interface ICamerasPersistence extends IGetter<CameraV1, string>, IWriter<CameraV1, string> {
    getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<CameraV1>>;
    getOneById(correlationId: string, id: string): Promise<CameraV1>;
    getOneByAddress(correlationId: string, address: string): Promise<CameraV1>;            
    create(correlationId: string, item: CameraV1): Promise<CameraV1>;
    update(correlationId: string, item: CameraV1): Promise<CameraV1>;
    deleteById(correlationId: string, id: string): Promise<CameraV1>;
}