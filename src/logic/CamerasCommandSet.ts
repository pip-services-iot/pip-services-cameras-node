import { CommandSet } from 'pip-services3-commons-nodex';
import { ICommand } from 'pip-services3-commons-nodex';
import { Command } from 'pip-services3-commons-nodex';
import { Parameters } from 'pip-services3-commons-nodex';
import { ObjectSchema } from 'pip-services3-commons-nodex';
import { ArraySchema } from 'pip-services3-commons-nodex';
import { TypeCode } from 'pip-services3-commons-nodex';
import { FilterParamsSchema } from 'pip-services3-commons-nodex';
import { PagingParamsSchema } from 'pip-services3-commons-nodex';
import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';

import { CameraV1Schema } from '../data/version1/CameraV1Schema';
import { ICamerasController } from './ICamerasController';

export class CamerasCommandSet extends CommandSet {
    private _controller: ICamerasController;

    constructor(controller: ICamerasController) {
        super();

        this._controller = controller;

        this.addCommand(this.makeGetCamerasCommand());
        this.addCommand(this.makeGetCameraByIdCommand());
        this.addCommand(this.makeGetCameraByAddressCommand());
        this.addCommand(this.makeCalculatePositionCommand());
        this.addCommand(this.makeCreateCameraCommand());
        this.addCommand(this.makeUpdateCameraCommand());
        this.addCommand(this.makeDeleteCameraByIdCommand());
    }

    private makeGetCamerasCommand(): ICommand {
        return new Command(
            'get_cameras',
            new ObjectSchema(true)
                .withOptionalProperty('filter', new FilterParamsSchema())
                .withOptionalProperty('paging', new PagingParamsSchema()),
            async (correlationId: string, args: Parameters) => {
                let filter = FilterParams.fromValue(args.get('filter'));
                let paging = PagingParams.fromValue(args.get('paging'));
                return await this._controller.getCameras(correlationId, filter, paging);
            }
        );
    }

    private makeGetCameraByIdCommand(): ICommand {
        return new Command(
            'get_camera_by_id',
            new ObjectSchema(true)
                .withRequiredProperty('camera_id', TypeCode.String),
            async (correlationId: string, args: Parameters) => {
                let cameraId = args.getAsString('camera_id');
                return await this._controller.getCameraById(correlationId, cameraId);
            }
        );
    }

    private makeGetCameraByAddressCommand(): ICommand {
        return new Command(
            'get_camera_by_address',
            new ObjectSchema(true)
                .withRequiredProperty('address', TypeCode.String),
            async (correlationId: string, args: Parameters) => {
                let address = args.getAsString('address');
                return await this._controller.getCameraByAddress(correlationId, address);
            }
        );
    }
    
    private makeCalculatePositionCommand(): ICommand {
        return new Command(
            'find_view_cameras',
            new ObjectSchema(true)
                .withRequiredProperty('org_id', TypeCode.String)
                .withRequiredProperty('position', null),
            async (correlationId: string, args: Parameters) => {
                let orgId = args.getAsString('org_id');
                let position = args.getAsObject('position');
                return await this._controller.findViewCameras(correlationId, orgId, position);
            }
        );
    }

    private makeCreateCameraCommand(): ICommand {
        return new Command(
            'create_camera',
            new ObjectSchema(true)
                .withRequiredProperty('camera', new CameraV1Schema()),
            async (correlationId: string, args: Parameters) => {
                let camera = args.getAsObject('camera');
                return await this._controller.createCamera(correlationId, camera);
            }
        );
    }

    private makeUpdateCameraCommand(): ICommand {
        return new Command(
            'update_camera',
            new ObjectSchema(true)
                .withRequiredProperty('camera', new CameraV1Schema()),
            async (correlationId: string, args: Parameters) => {
                let camera = args.getAsObject('camera');
                return await this._controller.updateCamera(correlationId, camera);
            }
        );
    }

    private makeDeleteCameraByIdCommand(): ICommand {
        return new Command(
            'delete_camera_by_id',
            new ObjectSchema(true)
                .withRequiredProperty('camera_id', TypeCode.String),
            async (correlationId: string, args: Parameters) => {
                let cameraId = args.getAsString('camera_id');
                return await this._controller.deleteCameraById(correlationId, cameraId);
            }
        );
    }
    
}