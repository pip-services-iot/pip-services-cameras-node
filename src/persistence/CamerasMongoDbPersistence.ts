import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';
import { DoubleConverter } from 'pip-services3-commons-nodex';
import { IdentifiableMongoDbPersistence } from 'pip-services3-mongodb-nodex';

import { CameraV1 } from '../data/version1/CameraV1';
import { ICamerasPersistence } from './ICamerasPersistence';

export class CamerasMongoDbPersistence
    extends IdentifiableMongoDbPersistence<CameraV1, string>
    implements ICamerasPersistence {

    constructor() {
        super('cameras');
        super.ensureIndex({ org_id: 1 });
        super.ensureIndex({ address: 1 });
    }

    private composeFilter(filter: FilterParams): any {
        filter = filter || new FilterParams();

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
        let view1 = view ? DoubleConverter.toNullableDouble(view[0]) : null;
        let view2 = view ? DoubleConverter.toNullableDouble(view[1]) : null;
        if (view1 != null && view2 != null) {
            criteria.push({ "from_view.coordinates.0": { $lte: view1 } });
            criteria.push({ "from_view.coordinates.1": { $lte: view2 } });
            criteria.push({ "to_view.coordinates.0": { $gte: view1 } });
            criteria.push({ "to_view.coordinates.1": { $gte: view2 } });
        }

        return criteria.length > 0 ? { $and: criteria } : null;
    }

    public async getPageByFilter(correlationId: string, filter: FilterParams,
        paging: PagingParams): Promise<DataPage<CameraV1>> {
        return await super.getPageByFilter(correlationId, this.composeFilter(filter), paging, null, null);
    }

    public async getOneByAddress(correlationId: string, address: string): Promise<CameraV1> {        
        let criteria = {
            address: address
        };

        let item = await new Promise<any>((resolve, reject) => {
            this._collection.findOne(criteria, (err, item) => {
                if (err != null) {
                    reject(err);
                    return;
                }
                resolve(item);
            });
        });

        item = this.convertToPublic(item);

        if (item) this._logger.trace(correlationId, "Found camera by %s", address);
        else this._logger.trace(correlationId, "Cannot find camera by %s", address);

        return item;
    }
    
}