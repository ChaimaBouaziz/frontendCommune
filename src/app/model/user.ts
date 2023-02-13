import {Role} from "../model/role";
export class User {
    idUser: number;
    login: string;
    password: string;
    roles: Role[];
}
