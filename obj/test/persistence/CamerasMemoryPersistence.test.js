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
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const CamerasMemoryPersistence_1 = require("../../src/persistence/CamerasMemoryPersistence");
const CamerasPersistenceFixture_1 = require("./CamerasPersistenceFixture");
suite('CamerasMemoryPersistence', () => {
    let persistence;
    let fixture;
    setup(() => __awaiter(void 0, void 0, void 0, function* () {
        persistence = new CamerasMemoryPersistence_1.CamerasMemoryPersistence();
        persistence.configure(new pip_services3_commons_nodex_1.ConfigParams());
        fixture = new CamerasPersistenceFixture_1.CamerasPersistenceFixture(persistence);
        yield persistence.open(null);
    }));
    teardown(() => __awaiter(void 0, void 0, void 0, function* () {
        yield persistence.close(null);
    }));
    test('CRUD Operations', () => __awaiter(void 0, void 0, void 0, function* () {
        yield fixture.testCrudOperations();
    }));
    test('Get with Filters', () => __awaiter(void 0, void 0, void 0, function* () {
        yield fixture.testGetWithFilters();
    }));
});
//# sourceMappingURL=CamerasMemoryPersistence.test.js.map