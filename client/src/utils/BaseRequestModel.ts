import { Observable } from "rxjs";
import { Method, _Headers, Body } from "./types";

interface Props {
  url: string;
  method?: Method;
  headers?: _Headers;
  body?: Body;
  request(): Observable<any>;
}

const baseUrl = process.env.REACT_APP_API_DOMAIN;

class BaseRequestModel implements Props {
  constructor(
    public url: string,
    public method?: Method,
    public headers?: _Headers,
    public body?: Body
  ) {
    this.url = url;
    this.method = method || "GET";
    this.headers = headers || {};
    this.body = body;
  }

  request(): Observable<any> {
    return new Observable((observable) => {
      fetch(`${baseUrl}/${this.url}`, {
        method: this.method,
        credentials: "include",
        headers: this.headers,
        body: this.body,
      })
        .then((response: Response) => response.json())
        .then((data: any) => {
          observable.next(data);
          observable.complete();
        })
        .catch((error: any) => {
          observable.error(error);
        });
    });
  }
}

export default BaseRequestModel;
