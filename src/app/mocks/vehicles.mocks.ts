import { Vehicle} from "../core/domain/models/vehicle.model";

export const VEHICLES_MOCK: Vehicle[] = [
    {
        id: 1,
        brand: 'Toyota',
        category: 'Sedan',
        price: '$20000',
        year: 2020
    },
    {
        id: 2,
        brand: 'Honda',
        category: 'SUV',
        price: '$30000',
        year: 2021
    }
];