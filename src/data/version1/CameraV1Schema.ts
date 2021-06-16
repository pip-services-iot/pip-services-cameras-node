import { ObjectSchema } from 'pip-services3-commons-nodex';
import { TypeCode } from 'pip-services3-commons-nodex';

export class CameraV1Schema extends ObjectSchema {

    public constructor() {
        super();

        this.withOptionalProperty('id', TypeCode.String);
        this.withRequiredProperty('org_id', TypeCode.String);
        this.withOptionalProperty('protocol', TypeCode.String);
        this.withRequiredProperty('address', TypeCode.String);
        this.withOptionalProperty('label', TypeCode.String);
        this.withOptionalProperty('position', null); // TypeCode.Object);
        this.withOptionalProperty('heading', TypeCode.Float);
        this.withOptionalProperty('inclination', TypeCode.Float);
        this.withOptionalProperty('from_view', null); // TypeCode.Object);
        this.withOptionalProperty('to_view', null); // TypeCode.Object);
        this.withOptionalProperty('analytics', TypeCode.Boolean);
    }

}