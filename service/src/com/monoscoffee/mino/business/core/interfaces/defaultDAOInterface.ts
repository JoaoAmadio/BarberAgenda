export declare class DefaultDAOInterface {

  public find(entityClass: any, id?: any, options?: any): Promise<any | undefined>;

  public delete(targetOrEntity: any, criteria: any): Promise<any>;

  public save(entity: any, options?: any): Promise<any>;

  public list(entityClass: any, options?: any): Promise<Array<any>>;
}
