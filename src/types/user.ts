export class User{
  _id: number
  nickname: string
  email: string
  imageUrl:string
  status?: string

  constructor(_id:number,nickname:string,email,imageUrl:string,status?:string){
    this._id = _id;
    this.nickname = nickname
    this.email = email;
    this.imageUrl = imageUrl
    this.status = status?status:'unknown';

  }
}