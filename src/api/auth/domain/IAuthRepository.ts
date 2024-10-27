import { PublicUser } from "../../users/domain/User";
import { LoginCredentials } from "./LoginCredentials";

export interface IAuthRepository{
    logUser(credentials:LoginCredentials):Promise<any>
}