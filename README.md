# Clean Architecture en Angular

```
src/app
│
├── core
│   ├── domain
│   │   ├── models
│   │   │   ├── user.model.ts
│   │   │   └── product.model.ts
│   │   └── repositories
│   │       ├── user.repository.ts
│   │       └── product.repository.ts
│   │
│   ├── application
│   │   └── use-cases
│   │       ├── get-all-users.usecase.ts
│   │       ├── get-user-by-id.usecase.ts
│   │       ├── get-all-products.usecase.ts
│   │       └── get-product-by-id.usecase.ts
│   │
│   └── infrastructure
│       ├── services
│       │   ├── user-api.service.ts
│       │   └── product-api.service.ts
│       └── repositories
│           ├── user.repository.impl.ts
│           └── product.repository.impl.ts
│
├── presentation
│   ├── users
│   └── products
│
└── app.config.ts
```


## Paso 1 - Crear Modelos

```
src/app/core/domain/models/
├── user.model.ts
└── product.model.ts
```

## Paso 2 - Crear Repositorios

```
src/app/core/domain/repositories/
├── user.repository.ts
└── product.repository.ts
```

## Paso 3 - Crear Casos de Uso

### User
```
src/app/core/application/usecases/user/
├── get-all-users.usecase.ts
└── get-user-by-id.usecase.ts
```

### Product
```
src/app/core/application/usecases/product/
├── get-all-products.usecase.ts
└── get-product-by-id.usecase.ts
```

## Paso 4 - Crear Servicios


```
src/app/core/infrastructure/services/
├── user.service.ts
└── product.service.ts
```

## Paso 5 - Crear Repositorios Implementadores

### Implementación para Consumo de Datos Local
```
src/app/core/infrastructure/repositories/local
├── user-local.repository.impl.ts
└── product-local.repository.impl.ts
```

### Implementación para Consumo de Datos NodeJS
```
src/app/core/infrastructure/repositories/node
├── user-node.repository.impl.ts
└── product-node.repository.impl.ts
```

## Paso 6 - Agregar Providers con sus Implementadores

```
src/app/
└── app.config.ts
```