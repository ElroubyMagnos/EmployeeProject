export interface ManagerRequest {
    id: number;
    title: string;
    description: string;
    toID: number;
    active: boolean;
    detailsID: number;
    writerID: number;
}