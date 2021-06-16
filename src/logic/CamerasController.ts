import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';

import { ConfigParams } from 'pip-services3-commons-nodex';
import { IConfigurable } from 'pip-services3-commons-nodex';
import { IReferences } from 'pip-services3-commons-nodex';
import { StringConverter } from 'pip-services3-commons-nodex';
import { IReferenceable } from 'pip-services3-commons-nodex';
import { DependencyResolver } from 'pip-services3-commons-nodex';
import { IdGenerator } from 'pip-services3-commons-nodex';
import { CommandSet } from 'pip-services3-commons-nodex';
import { ICommandable } from 'pip-services3-commons-nodex';

import { CameraV1 } from '../data/version1/CameraV1';
import { CameraProtocolV1 } from '../data/version1/CameraProtocolV1';
import { ICamerasController } from './ICamerasController';
import { ICamerasPersistence } from '../persistence/ICamerasPersistence';
import { CamerasCommandSet } from './CamerasCommandSet';

export class CamerasController
    implements ICamerasController, IConfigurable, IReferenceable, ICommandable {
    
    private static _defaultConfig = ConfigParams.fromTuples(
        'dependencies.persistence', 'pip-services-cameras:persistence:*:*:1.0'
    );

    private _persistence: ICamerasPersistence;
    private _dependencyResolver: DependencyResolver = new DependencyResolver(CamerasController._defaultConfig);
    private _commandSet: CamerasCommandSet;

    public configure(config: ConfigParams): void {
        this._dependencyResolver.configure(config);
    }

    public setReferences(references: IReferences): void {
        this._dependencyResolver.setReferences(references);
        this._persistence = this._dependencyResolver.getOneRequired<ICamerasPersistence>('persistence');
    }

    public getCommandSet(): CommandSet {
        if (this._commandSet == null) {
            this._commandSet = new CamerasCommandSet(this);
        }
        return this._commandSet;
    }

    public getCameras(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<CameraV1>> {
        return this._persistence.getPageByFilter(correlationId, filter, paging);
    }

    public getCameraById(correlationId: string, id: string): Promise<CameraV1> {
        return this._persistence.getOneById(correlationId, id);
    }

    public getCameraByAddress(correlationId: string, address: string): Promise<CameraV1> {
        return this._persistence.getOneByAddress(correlationId, address);
    }
    
    public async findViewCameras(correlationId: string, orgId: string, position: any): Promise<CameraV1[]> {
        if (position == null || position.type != "Point"
            || position.coordinates == null || position.coordinates.length != 2) {
            return null;
        }

        let view = StringConverter.toString(position.coordinates[0])
            + ":" + StringConverter.toString(position.coordinates[0]);

        // Retrieve cameras
        let page = await this._persistence.getPageByFilter(
            correlationId,
            FilterParams.fromTuples(
                'org_id', orgId,
                'view', view
            ),
            null
        );

        let cameras = page ? page.data : [];
        return cameras;
    }

    private fixCamera(item: CameraV1) {
        if (item == null) return;

        item.protocol = item.protocol || CameraProtocolV1.Unknown;
    }

    public createCamera(correlationId: string, item: CameraV1): Promise<CameraV1> {
        item.id = item.id || IdGenerator.nextLong();
        this.fixCamera(item);

        return this._persistence.create(correlationId, item);
    }

    public updateCamera(correlationId: string, item: CameraV1): Promise<CameraV1> {
        this.fixCamera(item);
        return this._persistence.update(correlationId, item);
    }

    public deleteCameraById(correlationId: string, id: string): Promise<CameraV1> {
        return this._persistence.deleteById(correlationId, id);
    }
}