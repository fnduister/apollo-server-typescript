const defaultPort = 4000;

interface Environment {
    apollo: {
        introspection: boolean,
        playground: boolean
    },
  port: number | string;
  mongoUsername: string| undefined;
  mongoPassword: string| undefined;
  mongoDatabaseName: string | undefined;
  passwordDecripter: string | undefined;
}

const environment: Environment = {
  apollo: {
    introspection: process.env.APOLLO_INTROSPECTION === 'true',
    playground: process.env.APOLLO_PLAYGROUND === 'true'
  },
  port: process.env.PORT || defaultPort,
  mongoUsername: process.env.MONGO_USER,
  mongoPassword: process.env.MONGO_PASSWORD,
  mongoDatabaseName: process.env.MONGO_DB_NAME,
  passwordDecripter: process.env.PASSWORD_DECRIPTER
};

export default environment;
