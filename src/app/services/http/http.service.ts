import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class HttpUsingFormDataService {

  public baseUrl = 'http://localhost/hermerest_backend/web/app_dev.php';
  // public baseUrl = 'http://localhost/hermerest_backend/web';
  headers: any;

  constructor(private http: HttpClient) {
    this.refrescar();
  }

  refrescar() {
    if (localStorage.getItem('token') !== null) {
      this.headers = {headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded', 'Authorization':
            localStorage.getItem('token')})};
    } else {
      this.headers = {headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'})};
    }
  }
  get(endpoint: string) {
    return this.http.get(this.baseUrl + endpoint, this.headers);
  }

  post(endpoint: string, json) {
    return this.http.post(this.baseUrl + endpoint, this.bodyToString(json), this.headers);
  }

  put(endpoint: string, json) {
    return this.http.put(this.baseUrl + endpoint, this.bodyToString(json), this.headers);
  }

  delete(endpoint: string) {
    return this.http.delete(this.baseUrl + endpoint,  this.headers);
  }

  postFile(endpoint: string, formData) {
    return this.http.post(this.baseUrl + endpoint, formData,
      {headers: new HttpHeaders({'enctype': 'multipart/form-data'})});
  }

  bodyToString(json) {
    let urlSearchParams = '';
    Object.keys(json).forEach(function (key) {
      if (json[key] != null) {
        urlSearchParams += this.encode(key + '')
          + '=' + this.encode(json[key] + '') + '&';
      }
    }, this);
    return urlSearchParams;
  }

  encode(cadena) {
    cadena = cadena.replace(/&/g, '%26');
    cadena = cadena.replace(/\+/g, '%2B');
    cadena = cadena.replace(/=/g, '%3D');
    cadena = cadena.replace(/\?/g, '%3F');
    return cadena;
  }
}
