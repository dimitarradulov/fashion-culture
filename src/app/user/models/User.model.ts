export class User {
  constructor(
    public email: string,
    public id: string,
    private _token: string,
    private _tokenExpiration: Date,
    private _isAdmin: boolean
  ) {}

  getToken() {
    const currentDate = new Date();

    if (currentDate > this._tokenExpiration) return null;

    return this._token;
  }
}
