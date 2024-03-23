import {
  IsEmail,
  IsMobilePhone,
  IsUUID,
  ValidateIf,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class EditDto {
  @IsString()
  @ValidateIf((o) => o.name !== undefined)
  name?: string;

  @IsUUID()
  id: string;

  @IsEmail()
  @ValidateIf((o) => o.email !== undefined)
  email?: string;

  @IsMobilePhone()
  @ValidateIf((o) => o.phoneNumber !== undefined)
  phone_number?: string;

  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1,
    minUppercase: 1,
  })
  @ValidateIf((o) => o.password !== undefined)
  password?: string;
}
