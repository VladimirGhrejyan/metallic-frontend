import { GetClientsApiArg } from '~entities/client';

export interface IAdminClientsQueryArgs extends Omit<GetClientsApiArg, 'page' | 'itemsPerPage'> {
    page?: number;
    itemsPerPage?: number;
}
