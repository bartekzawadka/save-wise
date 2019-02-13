export class User {
    public username: string;

    public token: string;

    public IsAuthenticated = (this.username && this.token);
}
