import type { UserConfig } from '@commitlint/types';

const Configuration: UserConfig = {
    extends: ['@commitlint/config-conventional'],

    parserPreset: 'conventional-changelog-atom',

    formatter: '@commitlint/format',

    rules: {
        'type-empty': [2, 'never'],

        'type-enum': [2, 'always', ['feat', 'fix', 'hotfix', 'refactor', 'build', 'chore']],

        'subject-case': [0],
    },
};

export default Configuration;
