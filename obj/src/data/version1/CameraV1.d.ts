import { IStringIdentifiable } from 'pip-services3-commons-nodex';
export declare class CameraV1 implements IStringIdentifiable {
    id: string;
    org_id: string;
    protocol?: string;
    address: string;
    label?: string;
    position?: any;
    heading?: number;
    inclination?: number;
    from_view?: any;
    to_view?: any;
    analytics?: boolean;
}
