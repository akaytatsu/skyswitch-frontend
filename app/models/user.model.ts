import { z } from 'zod';

export class UserModel {
  id: number;
  name: string;
  email: string;
  active: boolean;
  is_admin: boolean;
  created_at: string;
  updated_at: string;

  constructor(data: any) {
    this.id = data.id;
    this.name = data.name;
    this.email = data.email;
    this.active = data.active;
    this.is_admin = data.is_admin;
    this.created_at = data.created_at;
    this.updated_at = data.updated_at;
  }

  get initials(): string {
    if (!this.name) return '';

    if (this.name.split(' ').length === 1) return this.name[0];

    const [first, last] = this.name.split(' ');
    return `${first[0]}${last[0]}`;
  }

  toJson() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      active: this.active,
      is_admin: this.is_admin,
      created_at: this.created_at,
      updated_at: this.updated_at,
    };
  }

  public static schema = z.object({
    id: z.number(),
    email: z.string().email(),
  });

  static validate(values: any) {
    const data = new UserModel(values);
    UserModel.schema.parse(data);
    return data;
  }
}

export class UpdateUserModel {
  id: number;
  name: string;
  active: boolean;
  is_admin: boolean;

  constructor(data: any) {
    this.id = data.id;
    this.name = data.name;
    this.active = data.active;
    this.is_admin = data.is_admin;
  }

  toJson() {
    return {
      id: this.id,
      name: this.name,
      active: this.active,
      is_admin: this.is_admin,
    };
  }

  public static schema = z.object({
    id: z.number(),
    name: z.string().min(3).max(90),
    active: z.boolean(),
    is_admin: z.boolean(),

  });

  static validate(values: any) {
    const data = new UpdateUserModel(values);
    UpdateUserModel.schema.parse(data);
    return data;
  }

}

export class UserLoginModel {
  email: string;
  password: string;

  constructor(data: any) {
    this.email = data.email;
    this.password = data.password;
  }

  toJson() {
    return {
      email: this.email,
      password: this.password,
    };
  }

  public static schema = z.object({
    email: z.string().email(),
    password: z.string(),
  });

  static validate(values: any) {
    const data = new UserLoginModel(values);
    UserLoginModel.schema.parse(data);
    return data;
  }
}

export class LoginResponseModel{
  error: string;
  token: string;

  constructor(data: any) {
    this.error = data.error;
    this.token = data.token;
  }

  toJson() {
    return {
      error: this.error,
      token: this.token,
    };
  }

  public static schema = z.object({
    error: z.string().optional(),
    token: z.string().optional(),
  });

  static validate(values: any) {
    const data = new LoginResponseModel(values);
    LoginResponseModel.schema.parse(data);
    return data;
  }
}