import axios, { AxiosInstance } from "axios";
import Studant from "../entities/studant";

export default class StudantService {
  private http: AxiosInstance;

  constructor(axios: AxiosInstance) {
    this.http = axios;
  }

  public async getStudants(): Promise<Studant[]> {
    return await this.http.get("http://localhost:3005/studants")
    .then(x => {
      return x.data;
    }).catch(x => {
      return []
    });
  }
}
