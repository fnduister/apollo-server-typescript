declare module '*.graphql' {
    // eslint-disable-next-line no-unused-vars
    import { DocumentNode } from 'graphql';

    const value: DocumentNode;
    export = value;
}
