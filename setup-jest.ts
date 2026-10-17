import { setupZoneTestEnv } from 'jest-preset-angular/setup-env/zone';

setupZoneTestEnv();

jest.mock('@faker-js/faker', () => ({
  faker: {
    commerce: {
      productName: jest.fn(() => 'Producto Test'),
      price: jest.fn(() => '10.00'),
    },
    person: {
      firstName: jest.fn(() => 'Juan'),
      lastName: jest.fn(() => 'Pérez'),
    },
    number: {
      int: jest.fn(() => 30),
    },
    internet: {
      email: jest.fn(() => 'test@mail.com'),
    },
    helpers: {
      arrayElement: jest.fn((arr) => arr ? arr[0] : ''),
    },
  },
}));