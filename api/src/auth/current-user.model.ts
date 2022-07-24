export class CurrentUser {
    public id!: string;
    public name!: string;
    public email!: string;
    public claims: string[] = [];

    constructor() {
    }

    UpdateUser(id: string, name: string, email: string){
        this.id = id;
        this.name = name;
        this.email = email;
    }
}