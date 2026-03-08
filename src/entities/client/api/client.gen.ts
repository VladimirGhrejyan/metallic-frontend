import { api } from '~shared/config/api';

export const addTagTypes = ['clients'] as const;
const injectedRtkApi = api
    .enhanceEndpoints({
        addTagTypes,
    })
    .injectEndpoints({
        endpoints: (build) => ({
            getClients: build.query<GetClientsApiResponse, GetClientsApiArg>({
                query: (queryArg) => ({
                    url: `/clients`,
                    params: {
                        search: queryArg.search,
                        order: queryArg.order,
                        sortBy: queryArg.sortBy,
                        page: queryArg.page,
                        itemsPerPage: queryArg.itemsPerPage,
                    },
                }),
                providesTags: ['clients'],
            }),
            createClient: build.mutation<CreateClientApiResponse, CreateClientApiArg>({
                query: (queryArg) => ({
                    url: `/clients`,
                    method: 'POST',
                    body: queryArg.createClientDto,
                }),
                invalidatesTags: ['clients'],
            }),
            getClientById: build.query<GetClientByIdApiResponse, GetClientByIdApiArg>({
                query: (queryArg) => ({ url: `/clients/${queryArg.id}` }),
                providesTags: ['clients'],
            }),
            updateClient: build.mutation<UpdateClientApiResponse, UpdateClientApiArg>({
                query: (queryArg) => ({
                    url: `/clients/${queryArg.id}`,
                    method: 'PATCH',
                    body: queryArg.updateClientDto,
                }),
                invalidatesTags: ['clients'],
            }),
            deleteClient: build.mutation<DeleteClientApiResponse, DeleteClientApiArg>({
                query: (queryArg) => ({
                    url: `/clients/${queryArg.id}`,
                    method: 'DELETE',
                }),
                invalidatesTags: ['clients'],
            }),
            createClientPhone: build.mutation<
                CreateClientPhoneApiResponse,
                CreateClientPhoneApiArg
            >({
                query: (queryArg) => ({
                    url: `/clients/${queryArg.id}/phones`,
                    method: 'POST',
                    body: queryArg.createClientPhoneDto,
                }),
                invalidatesTags: ['clients'],
            }),
            updateClientPhone: build.mutation<
                UpdateClientPhoneApiResponse,
                UpdateClientPhoneApiArg
            >({
                query: (queryArg) => ({
                    url: `/clients/${queryArg.id}/phones/${queryArg.phoneId}`,
                    method: 'PATCH',
                    body: queryArg.updateClientPhoneDto,
                }),
                invalidatesTags: ['clients'],
            }),
            deleteClientPhone: build.mutation<
                DeleteClientPhoneApiResponse,
                DeleteClientPhoneApiArg
            >({
                query: (queryArg) => ({
                    url: `/clients/${queryArg.id}/phones/${queryArg.phoneId}`,
                    method: 'DELETE',
                }),
                invalidatesTags: ['clients'],
            }),
        }),
        overrideExisting: false,
    });
export { injectedRtkApi as enhancedApi };
export type GetClientsApiResponse = /** status 200  */ GetAllClientsOutputDto;
export type GetClientsApiArg = {
    search?: string;
    order?: 'ASC' | 'DESC';
    sortBy?: 'name' | 'taxpayerRegistrationNumber' | 'createdAt' | 'updatedAt';
    page?: string;
    itemsPerPage?: string;
};
export type CreateClientApiResponse = /** status 201  */ GetOneClientOutputDto;
export type CreateClientApiArg = {
    createClientDto: CreateClientDto;
};
export type GetClientByIdApiResponse = /** status 200  */ GetOneClientOutputDto;
export type GetClientByIdApiArg = {
    id: number;
};
export type UpdateClientApiResponse = /** status 200  */ GetOneClientOutputDto;
export type UpdateClientApiArg = {
    id: number;
    updateClientDto: UpdateClientDto;
};
export type DeleteClientApiResponse = unknown;
export type DeleteClientApiArg = {
    id: number;
};
export type CreateClientPhoneApiResponse = /** status 201  */ GetOneClientOutputDto;
export type CreateClientPhoneApiArg = {
    id: number;
    createClientPhoneDto: CreateClientPhoneDto;
};
export type UpdateClientPhoneApiResponse = /** status 200  */ GetOneClientOutputDto;
export type UpdateClientPhoneApiArg = {
    id: number;
    phoneId: number;
    updateClientPhoneDto: UpdateClientPhoneDto;
};
export type DeleteClientPhoneApiResponse = unknown;
export type DeleteClientPhoneApiArg = {
    id: number;
    phoneId: number;
};
export type GetAllClientsOutputDto = {
    items: {
        name: string;
        address: string | null;
        priceAdjustment: number;
        taxpayerRegistrationNumber: string | null;
        phones: {
            phone: string;
            name: string | null;
            id: number;
            createdAt: string;
            updatedAt: string | null;
            deletedAt: string | null;
        }[];
        id: number;
        createdAt: string;
        updatedAt: string | null;
        deletedAt: string | null;
    }[];
    meta: {
        totalItems: number;
        totalPages: number;
        currentPage: number;
        itemsPerPage: number;
    };
};
export type GetOneClientOutputDto = {
    name: string;
    address: string | null;
    priceAdjustment: number;
    taxpayerRegistrationNumber: string | null;
    phones: {
        phone: string;
        name: string | null;
        id: number;
        createdAt: string;
        updatedAt: string | null;
        deletedAt: string | null;
    }[];
    id: number;
    createdAt: string;
    updatedAt: string | null;
    deletedAt: string | null;
};
export type CreateClientDto = {
    name: string;
    address?: string | null;
    priceAdjustment?: number;
    taxpayerRegistrationNumber?: string | null;
    phones?: {
        phone: string;
        name?: string | null;
    }[];
};
export type UpdateClientDto = {
    name?: string;
    address?: string | null;
    priceAdjustment?: number;
    taxpayerRegistrationNumber?: string | null;
};
export type CreateClientPhoneDto = {
    phone: string;
    name?: string | null;
};
export type UpdateClientPhoneDto = {
    phone?: string;
    name?: string | null;
};
