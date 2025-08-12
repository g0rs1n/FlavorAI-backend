import {
  Get,
  Post,
  HttpCode,
  UseGuards,
  Controller,
  Body,
  Request
} from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateRecipeDto } from './dtos/create-recipe.dto';

@Controller('recipes')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  @HttpCode(200)
  @Get()
  @UseGuards(AuthGuard("jwt"))
  getAll () {
    return this.recipeService.getAllRecipes()
  }

  @HttpCode(201)
  @Post()
  @UseGuards(AuthGuard("jwt"))
  createRecipe (
    @Body() dto: CreateRecipeDto,
    @Request() req
  ) {
    const user = req.user
    return this.recipeService.createRecipe(dto, user)
  }

  @HttpCode(200)
  @Get("/my")
  @UseGuards(AuthGuard("jwt"))
  getMyRecipe (
    @Request() req
  ) {
    const user = req.user
    return this.recipeService.getMyRecipe(user)
  }

}
