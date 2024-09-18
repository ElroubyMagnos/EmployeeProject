export interface ProgramEntity {
    id: number;
    step: string;
    description: string;
    startDate: string;
    endDate: string;
    percentage: number;
    state: string;
    detailsParent: number;
}