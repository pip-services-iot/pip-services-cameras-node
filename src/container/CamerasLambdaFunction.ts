import { LambdaFunction } from 'pip-services3-aws-nodex';

import { CamerasServiceFactory } from '../build/CamerasServiceFactory';

export class CamerasLambdaFunction extends LambdaFunction {
    public constructor() {
        super('cameras', 'Cameras function');
        this._factories.add(new CamerasServiceFactory());
    }
}

export const handler = new CamerasLambdaFunction().getHandler();