const API_PATH = process.cwd() + '/src/shared/config/api';
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
];

const endpointMatcherFn = (targetTag) => (_, operationDefinition) => {
    if (operationDefinition?.operation?.tags?.length) {
        return operationDefinition.operation.tags.some((tag) => tag === targetTag);
    }
    return false;
};

const buildPathFn = (entity) => {
    return process.cwd() + `/src/entities/${entity}/api/${entity}.gen.ts`;
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

const config = {
    schemaFile: 'http://localhost:3000/static/openapi/openapi.json',
    apiFile: API_PATH,
    apiImport: API_NAME,
    hooks: false,
    tag: true,
    outputFiles: outputFilesFactory(ENTITIES_AND_TAGS),
};

module.exports = config;
