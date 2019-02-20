export class User {
    public username: string;

    public token: string;

    public id: string;

    public expires: Date;

    public isAuthenticated(){
        return !!this.token;
    }
}
