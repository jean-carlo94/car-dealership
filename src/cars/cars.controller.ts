import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';

import { CarsService } from './cars.service';
import { CreateCardDto, UpdateCardDto } from './dtop';

@Controller('cars')
export class CarsController {

  constructor(
    private readonly carsService: CarsService
  ){};

  @Get()
  getAllCars() {
    return this.carsService.findAll();
  };

  @Get(':id')
  getCarById( @Param('id', ParseUUIDPipe) id: string ) {
    return this.carsService.findOneById( id );
  };

  @Post()
  createCart( @Body() createCartDto: CreateCardDto ) {
    return this.carsService.create( createCartDto );
  };

  @Patch(':id')
  updateCart(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateCartDto: UpdateCardDto 
  ) {
    return this.carsService.update( id, updateCartDto );
  };

  @Delete(':id')
  deletedCar( @Param('id', ParseUUIDPipe) id: string ){
    return this.carsService.delete( id );
  };
};
