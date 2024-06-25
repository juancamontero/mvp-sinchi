# SINCHI | Proyectos | MVP
Esta es una aplicación desarrollada en [Next.js](https://nextjs.org/) creada con [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Requisitos

- Base de datos: Postgres V15.1
- Almacenamiento externo para manejo de imágenes, actual y provisionalmente con **CLOUDINARY**
- Nose v18 a v20

## Instalación

1. Instalar dependencias
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

2. Conectar base de datos: ver *.env.template*

**El paso 3** solo es necesario si no existe una base de datos previa, si se ejecuta el *seed* sobre la base de datos de producción se sobre escribe todo.

3.  Alimentar base de datos **Solamente si n 
```bash
npm run seed
# or
yarn  seed
# or
pnpm  seed
# or
bun seed
```

4. Actualizar base de datos con modelo prisma
```bash
npx prisma generate
npx prisma migrate dev
```

5. Hacer build e iniciar
```bash
npm run build
# or
yarn  build
# or
pnpm  build
# or
bun build


