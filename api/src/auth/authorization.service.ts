import { AuthorizationTypeKey } from "./authorization.type";
import { CurrentUser } from "./current-user.model";
import { IAuthorizationService } from "./i-authorization.service";

export class AuthorizationService implements IAuthorizationService {
    
    private currentUser: CurrentUser

    constructor({ CurrentUser } : any) {   
        this.currentUser = new CurrentUser;
    }

    public async authorize(authorizationList: AuthorizationTypeKey[]) : Promise<void> {
        // 1-verifica se usuário já existe internamente no cache 
        //     1.1-sim: retorna claims para validar
        //     1.2-não: verifica se usuário existe no banco
        //         1.2.1-sim: alimenta usuário no cache e volta para passo 1
        //         1.2.2-nao: cria usuario no banco e volta para passo 1.2.1
        // 2-valida claims
        //     2.1-sucesso: continua
        //     2.2-falha: throw error
        
    }
}