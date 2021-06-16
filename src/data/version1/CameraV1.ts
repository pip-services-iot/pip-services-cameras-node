import { IStringIdentifiable } from 'pip-services3-commons-nodex';

export class CameraV1 implements IStringIdentifiable {
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