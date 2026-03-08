const API_NAME = 'api';

const ENTITIES_AND_TAGS = [
    {
        tag: 'auth',
        entity: 'auth',
    },
    {
        tag: 'users',
        entity: 'user',
    },
    {
        tag: 'product-categories',
        entity: 'product-category',
    },
    {
        tag: 'products',
        entity: 'product',
    },
    {
        tag: 'orders',
        entity: 'order',
    },
    {
        tag: 'clients',
        entity: 'client',
    },
];

const endpointMatcherFn = (targetTag) => (_, operationDefinition) => {
    if (operationDefinition?.operation?.tags?.length) {
        return operationDefinition.operation.tags.some((tag) => tag === targetTag);
    }
    return false;
};

const path = require('path');
const buildPathFn = (entity) => {
    return path.join(process.cwd(), `src/entities/${entity}/api/${entity}.gen.ts`);
};

const outputFilesFactory = (data) => {
    return Object.fromEntries(
        data.map(({ tag, entity }) => [
            buildPathFn(entity),
            {
                filterEndpoints: endpointMatcherFn(tag),
            },
        ]),
    );
};

// After running rtk:codegen, if *.gen.ts get absolute import path, replace it with: from '~shared/config/api'
const config = {
    schemaFile: 'http://localhost:3000/static/openapi/openapi.json',
    apiFile: path.join(process.cwd(), 'src/shared/config/api'),
    apiImport: API_NAME,
    hooks: false,
    tag: true,
    outputFiles: outputFilesFactory(ENTITIES_AND_TAGS),
};

module.exports = config;
