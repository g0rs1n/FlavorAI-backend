import { 
    Injectable,
    HttpException
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRecipeDto } from './dtos/create-recipe.dto';
import { User } from '@prisma/client';

@Injectable()
export class RecipeService {

    constructor (
        private readonly prisma: PrismaService
    ) {}

    async getAllRecipes () {
        try {
            const allRecipes = await this.prisma.recipe.findMany()
            return allRecipes
        } catch (error) {
            throw new HttpException("Error: api recipe - getAllRecipe", error)
        }
        
    }

    async createRecipe (dto: CreateRecipeDto, user: User) {
        try {
            const newRecipeData = {
                ...dto,
                authorId: user.id
            }
            const newRecipe = await this.prisma.recipe.create({
                data: newRecipeData
            })
            return newRecipe
        } catch (error) {
            throw new HttpException("Error: api recipe - createRecipe", error)
        }
    }

}
