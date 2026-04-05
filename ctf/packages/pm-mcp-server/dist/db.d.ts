declare const Client: any;
declare let client: InstanceType<typeof Client> | null;
export declare function initializeDb(): Promise<void>;
export declare function getClient(): typeof client;
export declare function closeDb(): Promise<void>;
export declare function query(sql: string, params?: any[]): Promise<any>;
export {};
//# sourceMappingURL=db.d.ts.map