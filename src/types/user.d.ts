interface UserType {
  id: number;
  roleName: string;
  roleType: number;
  rights: [];
}

interface regionsType{
  id:number;
  value:string;
  title:string;
}


type PeopleType = {
  id: number;
  default?: boolean;
  password: number;
  region: string;
  role?: UserType;
  roleState?: boolean;
  username: string;
  roleId:any;
}