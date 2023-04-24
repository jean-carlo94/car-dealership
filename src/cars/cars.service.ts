import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { CreateCardDto, UpdateCardDto } from './dtop';

@Injectable()
export class CarsService {

  private cars:ICar[] = [
        {
            id: 'a47e5e18-18bf-4cbc-be69-47b85b4917b2',
            brand: 'Toyota',
            model: 'Corolla',
        }, 
        {
            id: 'b4683f26-75a0-46a0-9f34-8778ec189b02',
            brand: 'Honda',
            model: 'Civic',
        },
        {
            id: 'e8401e28-a035-4123-a643-9444262cec3d',
            brand: 'Jeep',
            model: 'Cherokee',
        },
    ];

    findAll() {
        return this.cars;
    };

    findOneById( id: string ) {

        const car = this.cars.find( car => car.id === id );  
        if( !car ) throw new NotFoundException(`Car with id ${ id } not found`);

        return car;
    };
    
    create( createCarDto: CreateCardDto ){
        const newCar:ICar = {
            id: uuid(),
            ...createCarDto,
        };

        this.cars.push( newCar );
        return newCar;
    };

    update( id: string, updateCardDto: UpdateCardDto  ){
        let carDB = this.findOneById( id );

        if( updateCardDto.id && updateCardDto.id !== id ) 
            throw new BadRequestException(`Card id is not valid inside body`)
        
        this.cars = this.cars.map( car => {
            if( car.id === id ){
                carDB = {
                    ...carDB,
                    ...updateCardDto,
                    id,
                };
                return carDB
            };

            return car;
        });

        return carDB;
    };

    delete( id: string ){
        const deleCars = this.findOneById( id );
        this.cars = this.cars.filter( car => car.id !== deleCars.id );
    }
};
