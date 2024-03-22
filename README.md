# Proyecto fin del Máster de Desarrollo FullStack I

## Empezar
Para empezar a usar este proyecto se debe tener instalado un paquete de herramientas, en mi caso elejí XAMPP.
- Apache --> Servidor Web
- Intérprete PHP --> PHP
- MySql --> Base de datos

## Descargar el proyecto
En GitHub, se debe pulsar en `code` y copiar el enlace que pone en `HTTPS`
- `https://github.com/nvivas/Sapiens-front.git`

## Instalar NVM
- `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash`

Con este comando se instalará nvm en nuestro proyecto y se pueden instalar diferentes versiones de node.js.

## Instalar Node
Con el comando nvm, se debe instalar la siguiente versión: 
- `nvm install 14.15.0`
- `nvm use 14.15.0`

## Node Modules
Se debe instalar node_modules en el proyecto. Para ello, se debe lanzar el siguiente comando en la terminal:
- `npm install` o `npm i` 

## Comentar línea
Se debe comentar la siguiente línea en el fichero `translate.directive.d.ts`
-     static ɵdir: i0.ɵɵDirectiveDeclaration<TranslateDirective, "[translate],[ngx-translate]", never, { "translate": { "alias": "translate"; "required": false; }; "translateParams": { "alias": "translateParams"; "required": false; }; }, {}, never, never, false, never>;

## Compilar el proyecto
Para compilar se debe ejecutar el siguiente comando en la terminal en el directorio del proyecto
- `npm start`
