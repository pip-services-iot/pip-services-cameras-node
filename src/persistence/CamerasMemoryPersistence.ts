import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';
import { DoubleConverter } from 'pip-services3-commons-nodex';
import { IdentifiableMemoryPersistence } from 'pip-services3-data-nodex';

import { CameraV1 } from '../data/version1/CameraV1';
import { ICamerasPersistence } from './ICamerasPersistence';

export class CamerasMemoryPersistence
    extends IdentifiableMemoryPersistence<CameraV1, string>
    implements ICamerasPersistence {

    constructor() {
        super();
        this._maxPageSize = 1000;
    }

    private matchString(value: string, search: string): boolean {
        if (value == null && search == null) {
            return true;
        }
        if (value == null || search == null) {
            return false;
        }
        return value.toLowerCase().indexOf(search) >= 0;
    }

    private matchSearch(item: CameraV1, search: string): boolean {
        search = search.toLowerCase();
        if (this.matchString(item.label, search)) {
            return true;
        }
        return false;
    }
    private composeFilter(filter: FilterParams): any {
        filter = filter || new FilterParams();

        let search = filter.getAsNullableString('search');
        let id = filter.getAsNullableString('id');
        let orgId = filter.getAsNullableString('org_id');
        let label = filter.getAsNullableString('label');
        let address = filter.getAsNullableString('address');
        let tempAddresses = filter.getAsNullableString('addresses');
        let addresses = tempAddresses ? tempAddresses.split(",") : null;
        let tempView = filter.getAsNullableString('view');
        let view = tempView ? tempView.split(":") : null;
        let view1 = view ? DoubleConverter.toNullableDouble(view[0]) : null;
        let view2 = view ? DoubleConverter.toNullableDouble(view[1]) : null;

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
                    return false
                if (item.to_view == null && item.to_view.coordinates == null)
                    return false;
                if (item.to_view.coordinates[0] < view1 || item.to_view.coordinates[1] < view2)
                    return false
            }
            return true;
        };
    }

    public async getPageByFilter(correlationId: string, filter: FilterParams,
        paging: PagingParams): Promise<DataPage<CameraV1>> {
        return await super.getPageByFilter(correlationId, this.composeFilter(filter), paging, null, null);
    }

    public async getOneByAddress(correlationId: string, address: string): Promise<CameraV1> {
        let item = this._items.find((item) => item.address == address);

        if (item) this._logger.trace(correlationId, "Found camera by %s", address);
        else this._logger.trace(correlationId, "Cannot find camera by %s", address);

        return item;
    }
    
}