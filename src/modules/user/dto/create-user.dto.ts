interface CreateUserDTOProps {
  email: string;
  name: string;
  password: string;
  role: number;
  salt: string;
}

export class CreateUserDTO {
  email: string;
  name: string;
  password: string;
  role: number;
  salt: string;

  constructor(dto: CreateUserDTOProps) {
    this.email = dto.email;
    this.name = dto.name;
    this.password = dto.password;
    this.role = dto.role;
    this.salt = dto.salt;
  }
}
