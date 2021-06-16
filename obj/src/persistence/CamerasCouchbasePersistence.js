"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CamerasCouchbasePersistence = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_2 = require("pip-services3-commons-nodex");
const pip_services3_couchbase_nodex_1 = require("pip-services3-couchbase-nodex");
class CamerasCouchbasePersistence extends pip_services3_couchbase_nodex_1.IdentifiableCouchbasePersistence {
    constructor() {
        super('app', 'cameras');
        // super.ensureIndex({ org_id: 1 });
        // super.ensureIndex({ address: 1 });
    }
    composeFilter(filter) {
        filter = filter || new pip_services3_commons_nodex_1.FilterParams();
        let criteria = [];
        let search = filter.getAsNullableString('search');
        if (search != null) {
            criteria.push("label LIKE '%" + search + "%'");
        }
        let id = filter.getAsNullableString('id');
        if (id != null) {
            criteria.push("id='" + id + "'");
        }
        let orgId = filter.getAsNullableString('org_id');
        if (orgId != null) {
            criteria.push("org_id='" + orgId + "'");
        }
        let label = filter.getAsNullableString('label');
        if (label != null) {
            criteria.push("label='" + label + "'");
        }
        let address = filter.getAsNullableString('address');
        if (address != null) {
            criteria.push("address='" + address + "'");
        }
        let tempAddresses = filter.getAsNullableString('addresses');
        if (tempAddresses != null) {
            let addresses = tempAddresses.split(",");
            criteria.push("address IN('" + addresses.join("','") + "')");
        }
        let tempView = filter.getAsNullableString('view');
        let view = tempView ? tempView.split(":") : null;
        let view1 = view ? pip_services3_commons_nodex_2.DoubleConverter.toNullableDouble(view[0]) : null;
        let view2 = view ? pip_services3_commons_nodex_2.DoubleConverter.toNullableDouble(view[1]) : null;
        if (view1 != null && view2 != null) {
            criteria.push("from_view.coordinates[0]<=" + view1);
            criteria.push("from_view.coordinates[1]<=" + view2);
            criteria.push("to_view.coordinates[0]>=" + view1);
            criteria.push("to_view.coordinates[1]>=" + view2);
        }
        return criteria.length > 0 ? criteria.join(" AND ") : null;
    }
    getPageByFilter(correlationId, filter, paging) {
        const _super = Object.create(null, {
            getPageByFilter: { get: () => super.getPageByFilter }
        });
        return __awaiter(this, void 0, void 0, function* () {
            return yield _super.getPageByFilter.call(this, correlationId, this.composeFilter(filter), paging, null, null);
        });
    }
    getOneByAddress(correlationId, address) {
        return __awaiter(this, void 0, void 0, function* () {
            // In couchbase it is a query operation anyway
            let page = yield this.getPageByFilter(correlationId, pip_services3_commons_nodex_1.FilterParams.fromTuples("address", address), null);
            let item = page != null && page.data != null ? page.data[0] : null;
            return item || null;
        });
    }
}
exports.CamerasCouchbasePersistence = CamerasCouchbasePersistence;
//# sourceMappingURL=CamerasCouchbasePersistence.js.map