import { IDriver } from "./drivers/IDriver";
export { IDriver } from "./drivers/IDriver";
export { MongoDriver, CollectionInterface } from "./drivers/MongoDriver";
export { SqliteDriver } from "./drivers/SqliteDriver";
export { MySQLDriver, Config } from "./drivers/MySQLDriver";
export { MemoryDriver, Table } from "./drivers/MemoryDriver";
export { JSONDriver, DataLike } from "./drivers/JSONDriver";
export interface IQuickDBOptions {
    table?: string;
    filePath?: string;
    driver?: IDriver;
    normalKeys?: boolean;
}
export declare class QuickDB<D = any> {
    private static instance;
    private prepared;
    private _driver;
    private tableName;
    private normalKeys;
    private options;
    get driver(): IDriver;
    constructor(options?: IQuickDBOptions);
    private addSubtract;
    private getArray;
    static createSingleton<T>(options?: IQuickDBOptions): QuickDB<T>;
    init(): Promise<void>;
    all<T = D>(): Promise<{
        id: string;
        value: T;
    }[]>;
    get<T = D>(key: string): Promise<T | null>;
    set<T = D>(key: string, value: T): Promise<T>;
    has(key: string): Promise<boolean>;
    delete(key: string): Promise<number>;
    deleteAll(): Promise<number>;
    add(key: string, value: number): Promise<number>;
    sub(key: string, value: number): Promise<number>;
    push<T = D>(key: string, ...values: T[]): Promise<T[]>;
    unshift<T = D>(key: string, value: T | T[]): Promise<T[]>;
    pop<T = D>(key: string): Promise<T | undefined>;
    shift<T = D>(key: string): Promise<T | undefined>;
    pull<T = D>(key: string, value: T | T[] | ((data: T, index: string) => boolean), once?: boolean): Promise<T[]>;
    startsWith<T = D>(query: string, key?: string): Promise<{
        id: string;
        value: T;
    }[]>;
    table<T = D>(table: string): QuickDB<T>;
    tableAsync(table: string): Promise<QuickDB>;
    useNormalKeys(activate: boolean): void;
}
