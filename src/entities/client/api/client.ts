import { enhancedApi as genClientApi } from './client.gen';

export const clientApi = genClientApi.enhanceEndpoints({});
export const {
    useGetClientsQuery,
    useLazyGetClientsQuery,
    useGetClientByIdQuery,
    useLazyGetClientByIdQuery,
    useCreateClientMutation,
    useUpdateClientMutation,
    useDeleteClientMutation,
    useCreateClientPhoneMutation,
    useUpdateClientPhoneMutation,
    useDeleteClientPhoneMutation,
} = clientApi;

export type {
    CreateClientApiArg,
    CreateClientDto,
    CreateClientPhoneApiArg,
    CreateClientPhoneDto,
    GetClientByIdApiResponse,
    GetClientsApiArg,
    GetClientsApiResponse,
    UpdateClientApiArg,
    UpdateClientDto,
    UpdateClientPhoneDto,
} from './client.gen';
