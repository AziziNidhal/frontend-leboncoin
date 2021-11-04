export class AuthData {
  token: string;
  expiresIn: string;
  nickname: string;
  imageUrl: string;
  userId:string

  constructor(
    token: string,
    expiresIn: string,
    nickname: string,
    imageUrl: string,
    userId:string
  ) {
    this.token = token;
    this.expiresIn = expiresIn;
    this.nickname = nickname;
    this.imageUrl = imageUrl;
    this.userId = userId;
  }
}
