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
            const allRecipes = await this.prisma.recipe.findMany({
                include: {
                    ratings: true
                }
            })
            return allRecipes.map(recipe => ({
                ...recipe,
                averageRating:
                    recipe.ratings.length > 0
                    ? recipe.ratings.reduce((sum, r) => sum + r.score, 0) /
                        recipe.ratings.length
                    : null
            }))
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

    async getMyRecipe (user: User) {
        try {
            const myRecipesWithAvgRating = await this.prisma.recipe.findMany({
                where: {
                    authorId: user.id,
                },
                include: {
                    ratings: true,
                },
            });

            const result = myRecipesWithAvgRating.map(recipe => {
                const avgRating =
                    recipe.ratings.length > 0
                    ? recipe.ratings.reduce((sum, r) => sum + r.score, 0) / recipe.ratings.length
                    : 0;

                return {
                    ...recipe,
                    averageRating: avgRating,
                }
            })

            return result
        } catch (error) {
            throw new HttpException("Error: api getMyRecipe", error)
        }
    }

}
