import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(3, {
    message: 'Username must be at least 3 characters',
  })
  @MaxLength(20, {
    message: 'Username cannot be more than 20 characters',
  })
  @Matches(/^[^\s]+$/, {
    message: 'Username cannot contain spaces',
  })
  username: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;
}
