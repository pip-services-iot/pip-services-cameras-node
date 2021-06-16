"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CamerasFilePersistence = void 0;
const pip_services3_data_nodex_1 = require("pip-services3-data-nodex");
const CamerasMemoryPersistence_1 = require("./CamerasMemoryPersistence");
class CamerasFilePersistence extends CamerasMemoryPersistence_1.CamerasMemoryPersistence {
    constructor(path) {
        super();
        this._persister = new pip_services3_data_nodex_1.JsonFilePersister(path);
        this._loader = this._persister;
        this._saver = this._persister;
    }
    configure(config) {
        super.configure(config);
        this._persister.configure(config);
    }
}
exports.CamerasFilePersistence = CamerasFilePersistence;
//# sourceMappingURL=CamerasFilePersistence.js.map