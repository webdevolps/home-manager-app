import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

export interface IEntity {
  name: string;
}

export interface IQuery {
  id?: string | number;
  folio?: string;
}

export interface IVerbs {
  query?: IQuery;
  config?: AxiosRequestConfig;
  toCreate?: object;
  id?: string | number;
  toUpdate?: object;
  toPatch?: object;
  segment?: string;
}

export interface IEndpoint {
  get: (verbs: IVerbs) => Promise<AxiosResponse>;
  getId: (verbs: IVerbs) => Promise<AxiosResponse>;
  getAll: (verbs: IVerbs) => Promise<AxiosResponse>;
  create: (verbs: IVerbs) => Promise<AxiosResponse>;
  update: (verbs: IVerbs) => Promise<AxiosResponse>;
  patch: (verbs: IVerbs) => Promise<AxiosResponse>;
  delete: (verbs: IVerbs) => Promise<AxiosResponse>;
  sendFile: (verbs: IVerbs) => Promise<AxiosResponse>;
}

export interface IApi {
  createEntity(entity: IEntity): void;
  createEntities(arrayOfEntity: IEntity[]): void;
  getEndpoints(): Record<string, IEndpoint>;
}

class ApiImpl implements IApi {
  private readonly url: string;
  private readonly endpoints: Record<string, IEndpoint>;
  private axiosInstance!: AxiosInstance;

  constructor({ url }: { url: string }) {
    this.url = url;
    this.endpoints = {};
    this.createAxiosConfig();
  }

  private createAxiosConfig() {
    this.axiosInstance = axios.create();
    // Interceptors can be added here as in sysec-front
  }

  public createEntity(entity: IEntity) {
    const name = entity.name.toLowerCase();
    this.endpoints[name] = this.generateEndpoints(entity);
  }

  public createEntities(arrayOfEntity: IEntity[]): void {
    arrayOfEntity.forEach(this.createEntity.bind(this));
  }

  public getEndpoints() {
    return this.endpoints;
  }

  generateEndpoints({ name }: IEntity): IEndpoint {
    const endpoints = {} as IEndpoint;
    const resourceURL = `${this.url}${name}`;

    endpoints.get = ({ config = {} }: IVerbs) => {
      return this.axiosInstance.get(resourceURL, config);
    };

    endpoints.getId = ({ id, config = {} }: IVerbs) => {
      return this.axiosInstance.get(`${resourceURL}/${id}`, config);
    };

    endpoints.getAll = ({ config = {}, query = {} }: IVerbs) => {
      return this.axiosInstance.get(resourceURL, { params: query, ...config });
    };

    endpoints.create = ({ toCreate = {}, config = {} }: IVerbs) => {
      return this.axiosInstance.post(resourceURL, toCreate, config);
    };

    endpoints.update = ({ id, toUpdate = {}, config = {} }: IVerbs) => {
      return this.axiosInstance.put(`${resourceURL}/${id}`, toUpdate, config);
    };

    endpoints.patch = ({ id, toPatch = {}, config = {} }: IVerbs) => {
      return this.axiosInstance.patch(`${resourceURL}/${id}`, toPatch, config);
    };

    endpoints.delete = ({ id, config = {} }: IVerbs) => {
      return this.axiosInstance.delete(`${resourceURL}/${id}`, config);
    };

    endpoints.sendFile = ({ toCreate = {}, config = {} }: IVerbs) => {
      return this.axiosInstance.postForm(resourceURL, toCreate, config);
    };

    return endpoints;
  }
}

export default ApiImpl;
