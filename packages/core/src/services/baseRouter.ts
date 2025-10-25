import { ApiClient } from './apiClient';
import type {Hooks} from 'ky';

export abstract class BaseRouter {
  protected client: ApiClient;

  constructor(baseUrl: string, hooks?: Hooks) {
    this.client = new ApiClient(baseUrl, hooks);
  }
}
