# Awesome Project Build with TypeORM

Steps to run this project:

1. Run `npm i` command
2. Setup database settings inside `ormconfig.json` file
3. Run `npm start` command


## Limpiar bd
```bash
npm run typeorm schema:drop 
```
## migrations! (se utiliza cuando la sincronizacion esta en false)
```bash
npm run typeorm migration:create --  --name nombre-de-migracion
npm run typeorm migration:generate --  --name nombre-de-migracion

npm run typeorm migration:run
```
