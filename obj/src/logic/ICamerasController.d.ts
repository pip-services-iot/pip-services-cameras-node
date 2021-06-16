import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';
import { CameraV1 } from '../data/version1/CameraV1';
export interface ICamerasController {
    getCameras(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<CameraV1>>;
    getCameraById(correlationId: string, id: string): Promise<CameraV1>;
    getCameraByAddress(correlationId: string, address: string): Promise<CameraV1>;
    findViewCameras(correlationId: string, orgId: string, position: any): Promise<CameraV1[]>;
    createCamera(correlationId: string, item: CameraV1): Promise<CameraV1>;
    updateCamera(correlationId: string, item: CameraV1): Promise<CameraV1>;
    deleteCameraById(correlationId: string, id: string): Promise<CameraV1>;
}
