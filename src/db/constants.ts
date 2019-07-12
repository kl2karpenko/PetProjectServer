export const DATABASE_NAME = 'main';
export const DEFAULT_HOST = process.env.POSTGRES_HOST || 'localhost';
export const DEFAULT_PORT = parseInt(process.env.POSTGRES_PORT || '5435', 10);
export const DEFAULT_USER = process.env.POSTGRES_USER || 'lily';
export const DEFAULT_PASS =
    process.env.POSTGRES_PASSWORD || 'Kbkz1993';