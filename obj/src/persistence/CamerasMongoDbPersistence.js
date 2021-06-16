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
exports.CamerasMongoDbPersistence = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_2 = require("pip-services3-commons-nodex");
const pip_services3_mongodb_nodex_1 = require("pip-services3-mongodb-nodex");
class CamerasMongoDbPersistence extends pip_services3_mongodb_nodex_1.IdentifiableMongoDbPersistence {
    constructor() {
        super('cameras');
        super.ensureIndex({ org_id: 1 });
        super.ensureIndex({ address: 1 });
    }
    composeFilter(filter) {
        filter = filter || new pip_services3_commons_nodex_1.FilterParams();
        let criteria = [];
        let search = filter.getAsNullableString('search');
        if (search != null) {
            let searchRegex = new RegExp(search, "i");
            let searchCriteria = [];
            searchCriteria.push({ label: { $regex: searchRegex } });
            criteria.push({ $or: searchCriteria });
        }
        let id = filter.getAsNullableString('id');
        if (id != null) {
            criteria.push({ _id: id });
        }
        let orgId = filter.getAsNullableString('org_id');
        if (orgId != null) {
            criteria.push({ org_id: orgId });
        }
        let label = filter.getAsNullableString('label');
        if (label != null) {
            criteria.push({ label: label });
        }
        let address = filter.getAsNullableString('address');
        if (address != null) {
            criteria.push({ address: address });
        }
        let tempAddresses = filter.getAsNullableString('addresses');
        if (tempAddresses != null) {
            let addresses = tempAddresses.split(",");
            criteria.push({ address: { $in: addresses } });
        }
        let tempView = filter.getAsNullableString('view');
        let view = tempView ? tempView.split(":") : null;
        let view1 = view ? pip_services3_commons_nodex_2.DoubleConverter.toNullableDouble(view[0]) : null;
        let view2 = view ? pip_services3_commons_nodex_2.DoubleConverter.toNullableDouble(view[1]) : null;
        if (view1 != null && view2 != null) {
            criteria.push({ "from_view.coordinates.0": { $lte: view1 } });
            criteria.push({ "from_view.coordinates.1": { $lte: view2 } });
            criteria.push({ "to_view.coordinates.0": { $gte: view1 } });
            criteria.push({ "to_view.coordinates.1": { $gte: view2 } });
        }
        return criteria.length > 0 ? { $and: criteria } : null;
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
            let criteria = {
                address: address
            };
            let item = yield new Promise((resolve, reject) => {
                this._collection.findOne(criteria, (err, item) => {
                    if (err != null) {
                        reject(err);
                        return;
                    }
                    resolve(item);
                });
            });
            item = this.convertToPublic(item);
            if (item)
                this._logger.trace(correlationId, "Found camera by %s", address);
            else
                this._logger.trace(correlationId, "Cannot find camera by %s", address);
            return item;
        });
    }
}
exports.CamerasMongoDbPersistence = CamerasMongoDbPersistence;
//# sourceMappingURL=CamerasMongoDbPersistence.js.map