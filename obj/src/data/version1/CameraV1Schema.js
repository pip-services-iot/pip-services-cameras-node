"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CameraV1Schema = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_2 = require("pip-services3-commons-nodex");
class CameraV1Schema extends pip_services3_commons_nodex_1.ObjectSchema {
    constructor() {
        super();
        this.withOptionalProperty('id', pip_services3_commons_nodex_2.TypeCode.String);
        this.withRequiredProperty('org_id', pip_services3_commons_nodex_2.TypeCode.String);
        this.withOptionalProperty('protocol', pip_services3_commons_nodex_2.TypeCode.String);
        this.withRequiredProperty('address', pip_services3_commons_nodex_2.TypeCode.String);
        this.withOptionalProperty('label', pip_services3_commons_nodex_2.TypeCode.String);
        this.withOptionalProperty('position', null); // TypeCode.Object);
        this.withOptionalProperty('heading', pip_services3_commons_nodex_2.TypeCode.Float);
        this.withOptionalProperty('inclination', pip_services3_commons_nodex_2.TypeCode.Float);
        this.withOptionalProperty('from_view', null); // TypeCode.Object);
        this.withOptionalProperty('to_view', null); // TypeCode.Object);
        this.withOptionalProperty('analytics', pip_services3_commons_nodex_2.TypeCode.Boolean);
    }
}
exports.CameraV1Schema = CameraV1Schema;
//# sourceMappingURL=CameraV1Schema.js.map