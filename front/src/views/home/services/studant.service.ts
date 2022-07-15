import { AxiosInstance } from "axios";
import Studant from "../entities/studant";

export default class StudantService {
  private http: AxiosInstance;

  constructor(axios: AxiosInstance) {
    this.http = axios;
  }

  public getStudants(): Promise<Studant[]> {
    return this.http.get("http://127.0.0.1:3005/studants")
    .then(x => {
      debugger
      return x.data;
    }).catch(x => {
      debugger
      return[]
    });
  }
}
