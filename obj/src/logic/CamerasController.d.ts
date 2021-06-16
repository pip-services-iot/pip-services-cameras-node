import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';
import { ConfigParams } from 'pip-services3-commons-nodex';
import { IConfigurable } from 'pip-services3-commons-nodex';
import { IReferences } from 'pip-services3-commons-nodex';
import { IReferenceable } from 'pip-services3-commons-nodex';
import { CommandSet } from 'pip-services3-commons-nodex';
import { ICommandable } from 'pip-services3-commons-nodex';
import { CameraV1 } from '../data/version1/CameraV1';
import { ICamerasController } from './ICamerasController';
export declare class CamerasController implements ICamerasController, IConfigurable, IReferenceable, ICommandable {
    private static _defaultConfig;
    private _persistence;
    private _dependencyResolver;
    private _commandSet;
    configure(config: ConfigParams): void;
    setReferences(references: IReferences): void;
    getCommandSet(): CommandSet;
    getCameras(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<CameraV1>>;
    getCameraById(correlationId: string, id: string): Promise<CameraV1>;
    getCameraByAddress(correlationId: string, address: string): Promise<CameraV1>;
    findViewCameras(correlationId: string, orgId: string, position: any): Promise<CameraV1[]>;
    private fixCamera;
    createCamera(correlationId: string, item: CameraV1): Promise<CameraV1>;
    updateCamera(correlationId: string, item: CameraV1): Promise<CameraV1>;
    deleteCameraById(correlationId: string, id: string): Promise<CameraV1>;
}
