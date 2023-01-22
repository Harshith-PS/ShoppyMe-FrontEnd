import { IRoles } from "./roles"

export interface IUsers{
    emailId : string
    userPassword : string
    role :IRoles
    gender : string
    dateOfBirth : Date
    address : string
}