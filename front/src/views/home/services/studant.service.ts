import { AxiosInstance } from "axios";
import Studant from "../entities/studant";

export default class StudantService {
  private http: AxiosInstance;

  constructor(axios: AxiosInstance) {
    this.http = axios;
  }

  public getStudants(): Promise<Studant[] | null> {
    return this.http
      .get("http://localhost:3000/studants")
      .then((x) => {
        return x.data;
      })
      .catch(() => {
        return null;
      });
  }
}
