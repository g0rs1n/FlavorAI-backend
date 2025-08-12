import { 
    IsString, 
    IsOptional, 
    MinLength,
    ValidateIf
} from 'class-validator';

export class CreateRecipeDto {
  @IsString()
  @MinLength(3, { message: 'Recipe title must be at least 3 characters long' })
  title: string;

  @IsOptional()
  @IsString()
  @ValidateIf((_, value) => value?.trim().length > 0)
  @MinLength(10, { message: 'Description must be at least 10 characters long' })
  description?: string;

  @IsString()
  @MinLength(3, { message: 'Ingredients must be at least 3 characters long' })
  ingredients: string;

  @IsString()
  @MinLength(5, { message: 'Instructions must be at least 5 characters long' })
  instructions: string;
}