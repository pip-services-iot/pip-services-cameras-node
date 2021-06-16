import { CommandSet } from 'pip-services3-commons-nodex';
import { ICamerasController } from './ICamerasController';
export declare class CamerasCommandSet extends CommandSet {
    private _controller;
    constructor(controller: ICamerasController);
    private makeGetCamerasCommand;
    private makeGetCameraByIdCommand;
    private makeGetCameraByAddressCommand;
    private makeCalculatePositionCommand;
    private makeCreateCameraCommand;
    private makeUpdateCameraCommand;
    private makeDeleteCameraByIdCommand;
}
