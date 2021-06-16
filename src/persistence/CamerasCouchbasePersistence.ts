import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';
import { DoubleConverter } from 'pip-services3-commons-nodex';
import { IdentifiableCouchbasePersistence } from 'pip-services3-couchbase-nodex';

import { CameraV1 } from '../data/version1/CameraV1';
import { ICamerasPersistence } from './ICamerasPersistence';

export class CamerasCouchbasePersistence
    extends IdentifiableCouchbasePersistence<CameraV1, string>
    implements ICamerasPersistence {

    constructor() {
        super('app', 'cameras');
        // super.ensureIndex({ org_id: 1 });
        // super.ensureIndex({ address: 1 });
    }

    private composeFilter(filter: FilterParams): any {
        filter = filter || new FilterParams();

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
        let view1 = view ? DoubleConverter.toNullableDouble(view[0]) : null;
        let view2 = view ? DoubleConverter.toNullableDouble(view[1]) : null;
        if (view1 != null && view2 != null) {
            criteria.push("from_view.coordinates[0]<=" + view1);
            criteria.push("from_view.coordinates[1]<=" + view2);
            criteria.push("to_view.coordinates[0]>=" + view1);
            criteria.push("to_view.coordinates[1]>=" + view2);
        }

        return criteria.length > 0 ? criteria.join(" AND ") : null;
    }

    public async getPageByFilter(correlationId: string, filter: FilterParams,
        paging: PagingParams): Promise<DataPage<CameraV1>> {
        return await super.getPageByFilter(correlationId, this.composeFilter(filter), paging, null, null);
    }

    public async getOneByAddress(correlationId: string, address: string): Promise<CameraV1> {        
        // In couchbase it is a query operation anyway
        let page = await this.getPageByFilter(
            correlationId,
            FilterParams.fromTuples("address", address),
            null
        );

        let item = page != null && page.data != null ? page.data[0] : null;

        return item || null;
    }
    
}