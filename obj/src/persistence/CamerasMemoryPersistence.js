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
exports.CamerasMemoryPersistence = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_2 = require("pip-services3-commons-nodex");
const pip_services3_data_nodex_1 = require("pip-services3-data-nodex");
class CamerasMemoryPersistence extends pip_services3_data_nodex_1.IdentifiableMemoryPersistence {
    constructor() {
        super();
        this._maxPageSize = 1000;
    }
    matchString(value, search) {
        if (value == null && search == null) {
            return true;
        }
        if (value == null || search == null) {
            return false;
        }
        return value.toLowerCase().indexOf(search) >= 0;
    }
    matchSearch(item, search) {
        search = search.toLowerCase();
        if (this.matchString(item.label, search)) {
            return true;
        }
        return false;
    }
    composeFilter(filter) {
        filter = filter || new pip_services3_commons_nodex_1.FilterParams();
        let search = filter.getAsNullableString('search');
        let id = filter.getAsNullableString('id');
        let orgId = filter.getAsNullableString('org_id');
        let label = filter.getAsNullableString('label');
        let address = filter.getAsNullableString('address');
        let tempAddresses = filter.getAsNullableString('addresses');
        let addresses = tempAddresses ? tempAddresses.split(",") : null;
        let tempView = filter.getAsNullableString('view');
        let view = tempView ? tempView.split(":") : null;
        let view1 = view ? pip_services3_commons_nodex_2.DoubleConverter.toNullableDouble(view[0]) : null;
        let view2 = view ? pip_services3_commons_nodex_2.DoubleConverter.toNullableDouble(view[1]) : null;
        return (item) => {
            if (id && item.id != id)
                return false;
            if (orgId && item.org_id != orgId)
                return false;
            if (address && item.address != address)
                return false;
            if (addresses && addresses.indexOf(item.address) < 0)
                return false;
            if (label && item.label != label)
                return false;
            if (search && !this.matchSearch(item, search))
                return false;
            if (view1 && view2) {
                if (item.from_view == null && item.from_view.coordinates == null)
                    return false;
                if (item.from_view.coordinates[0] > view1 || item.from_view.coordinates[1] > view2)
                    return false;
                if (item.to_view == null && item.to_view.coordinates == null)
                    return false;
                if (item.to_view.coordinates[0] < view1 || item.to_view.coordinates[1] < view2)
                    return false;
            }
            return true;
        };
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
            let item = this._items.find((item) => item.address == address);
            if (item)
                this._logger.trace(correlationId, "Found camera by %s", address);
            else
                this._logger.trace(correlationId, "Cannot find camera by %s", address);
            return item;
        });
    }
}
exports.CamerasMemoryPersistence = CamerasMemoryPersistence;
//# sourceMappingURL=CamerasMemoryPersistence.js.map