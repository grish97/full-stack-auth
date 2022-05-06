import { Observable } from "rxjs";
import BaseRequestModel from "utils/BaseRequestModel";
import { Body, _Headers } from "utils/types";

interface IApiService {
  get(route: string): Observable<any>;
  post(route: string, body: Body): Observable<any>;
  put(route: string, body: Body): Observable<any>;
  delete(route: string): Observable<any>;
}

class ApiService implements IApiService {
  get(route: string): Observable<any> {
    const headers: _Headers = {};
    const requestModel = new BaseRequestModel(route, "GET", headers);

    return requestModel.request();
  }

  post(route: string, body: Body): Observable<any> {
    const headers: _Headers = {
      "Content-Type": "application/json",
    };
    const requestModel = new BaseRequestModel(route, "POST", headers, body);

    return requestModel.request();
  }

  put(route: string, body: Body): Observable<any> {
    const headers: _Headers = {
      "Content-Type": "application/json",
    };
    const requestModel = new BaseRequestModel(route, "POST", headers, body);

    return requestModel.request();
  }

  delete(route: string): Observable<any> {
    const headers: _Headers = {
      "Content-Type": "application/json",
    };
    const requestModel = new BaseRequestModel(route, "POST", headers);

    return requestModel.request();
  }
}

export default new ApiService();
