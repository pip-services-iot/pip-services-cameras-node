# <img src="https://github.com/pip-services/pip-services/raw/master/design/Logo.png" alt="Pip.Services Logo" style="max-width:30%"> <br/> Cameras microservice

This microservice stores a list of installed cameras and finds cameras that 
can observe a specific point.

Supported functionality:
* Deployment platforms: Standalone Process, Docker, AWS Lambda
* External APIs: HTTP (REST and Commandable), GRPC (Custom and Commandable)
* Persistence: Memory, Flat Files, MongoDB, PosgreSQL (Relational and NoSQL), SQLServer (Relational and NoSQL)
* Health checks: Heartbeat, Status
* Consolidated logging: ElasticSearch, CloudWatch
* Consolidated metrics: Prometheus, CloudWatch

There are no dependencies on other microservices.

<a name="links"></a> Quick links:

* Client SDKs:
  - [Node.js SDK](https://github.com/pip-services-iot/pip-clients-cameras-node)
  - [Golang SDK](https://github.com/pip-services-iot/pip-clients-cameras-go)
* [API Reference](https://github.com/pip-services-iot/pip-services-cameras-node/pages/globals.html)
* [Change Log](CHANGELOG.md)

##  Contract

```typescript

class CameraV1 implements IStringIdentifiable {
    public id: string;
    public org_id: string;
    public protocol?: string;
    public address: string;
    public label?: string;
    public position?: any; // GeoJSON
    public heading?: number; 
    public inclination?: number; 
    public from_view?: any; // GeoJSON
    public to_view?: any; // GeoJSON
    public analytics?: boolean;
}

interface ICamerasController {
    getCameras(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<CameraV1>>;

    getCameraById(correlationId: string, id: string): Promise<CameraV1>;
    
    getCameraByAddress(correlationId: string, address: string): Promise<CameraV1>;            
    
    findViewCameras(correlationId: string, orgId: string, position: any): Promise<CameraV1[]>;
    
    createCamera(correlationId: string, item: CameraV1): Promise<CameraV1>;
    
    updateCamera(correlationId: string, item: CameraV1): Promise<CameraV1>;
    
    deleteCameraById(correlationId: string, id: string): Promise<CameraV1>;
}

```

## Get

Get the microservice source from GitHub:
```bash
git clone git@github.com:pip-services-iot/pip-services-cameras-node.git
```

Install the microservice as a binary dependency:
```bash
npm install pip-services-cameras-node
```

Get docker image for the microservice:
```bash
docker pull pipdevs/pip-services-cameras-node:latest
```

## Run

The microservice can be configured using the environment variables:
* MEMORY_ENABLED - turn on in-memory persistence. Keep it undefined to turn it off
* FILE_ENABLED - turn on file persistence. Keep it undefined to turn it off
* FILE_PATH - file path where persistent data shall be stored (default: ../data/id_records.json) 
* MONGO_ENABLED - turn on MongoDB persistence. Keep it undefined to turn it off
* MONGO_SERVICE_URI - URI to connect to MongoDB. When it's defined other database parameters are ignored
* MONGO_SERVICE_HOST - MongoDB hostname or server address
* MONGO_SERVICE_PORT - MongoDB port number (default: 3360)
* MONGO_DB - MongoDB database name (default: app)
* MONGO_COLLECTION - MongoDB collection (default: id_records)
* MONGO_USER - MongoDB user login
* MONGO_PASS - MongoDB user password
* COUCHBASE_ENABLED - turn on Couchbase persistence. Keep it undefined to turn it off
* COUCHBASE_SERVICE_URI - URI to connect to Couchbase. When it's defined other database parameters are ignored
* COUCHBASE_SERVICE_HOST - Couchbase hostname or server address
* COUCHBASE_SERVICE_PORT - Couchbase port number (default: 5432)
* COUCHBASE_BUCKET - Couchbase database name (default: app)
* COUCHBASE_TABLE - Couchbase table (default: id_records)
* COUCHBASE_USER - Couchbase user login
* COUCHBASE_PASS - Couchbase user password
* HTTP_ENABLED - turn on HTTP endpoint
* HTTP_PORT - HTTP port number (default: 8080)
* GRPC_ENABLED - turn on GRPC endpoint
* GRPC_PORT - GRPC port number (default: 8090)

Start the microservice as process:
```bash
node ./bin/main
```

Run the microservice in docker:
Then use the following command:
```bash
docker run pipdevs/pip-services-cameras-node:latest
```

Launch the microservice with all infrastructure services using docker-compose:
```bash
docker-compose -f ./docker/docker-compose.yml
```

## Use

Install the client NPM package as
```bash
npm install @NationalOilwellVarco/max-templates/client-idgenerator-node
```

Inside your code get the reference to the client SDK
```typescript
 import { CamerasHttpClientV1 } from 'pip-clients-cameras-node';
```

Instantiate the client
```typescript
// Create the client instance
let client = new CamerasHttpClientV1();
```

Define client configuration parameters.
```typescript
// Client configuration
let httpConfig = ConfigParams.fromTuples(
    "connection.protocol", "http",
    "connection.host", "localhost",
    "connection.port", 3000
);
client.configure(httpConfig);
```

Connect to the microservice
```typescript
// Connect to the microservice
await client.open(null);
```

Add a camera that is installed at point [90:90] and is able to view area [90:90]-[100:100]
```typescript 
let camera = await client.createCamera(
    "123",
    {
        id: null,
        protocol: "Onvif",
        label: "Test Camera",
        position: { type: "Point", coordinates: [90, 90] },
        heading: 0,
        inclination: 90,
        from_view: { type: "Point", coordinates: [90, 90] },
        to_view: { type: "Point", coordinates: [110, 110] }
    }
);
console.log("Added test camera with id " + camera.id);
```

Retrieve cameras that observe point [100:100] on site 1
```typescript 
let cameras = await client.findViewCameras(
    "123",
    "1",
    { type: "Point", coordinates: [100, 100] }
);
console.log("Found " + cameras.length + " cameras");
```

## Develop

For development you shall install the following prerequisites:
* Node.js
* Visual Studio Code or another IDE of your choice
* Docker
* Typescript

Install dependencies:
```bash
npm install
```

Compile the microservice:
```bash
tsc
```

Before running tests launch infrastructure services and required microservices:
```bash
docker-compose -f ./docker-compose.dev.yml
```

Run automated tests:
```bash
npm test
```

Run automated benchmarks:
```bash
npm run benchmark
```

Generate API documentation:
```bash
./docgen.ps1
```

Before committing changes run dockerized build and test as:
```bash
./build.ps1
./test.ps1
./package.ps1
./run.ps1
./clean.ps1
```

## Contacts

This microservice was created and currently maintained by *Sergey Seroukhov*.