declare namespace NodeJS {
  export type ProcessEnv = {
    NODE_ENV: string;
    PORT: number;
    BCRYPT_SALT_ROUND: number;
  };
}
