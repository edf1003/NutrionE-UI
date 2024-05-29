#Publicar a fichero desde Visual Studio, en modo release
Botón derecho -> Publish desde el proyecto VibracousticAudits

#Instalar el Bundle de hosting de ASP.NET Core
Contiene el módulo aspnetCore para IIS y el runtime del propio netcore
https://dotnet.microsoft.com/download/dotnet/thank-you/runtime-aspnetcore-5.0.5-windows-hosting-bundle-installer

#Dar permisos a la carpeta de publicación
Dar permisos de control total para el grupo IIS_IUSRS

#Crear usuario en SqlServer para el pool de IIS. Ejemplo en el appPool
Es preferible hacerlo desde comando en lugar de desde el GUI de SQL Server Management
CREATE LOGIN [IIS APPPOOL\DefaultAppPool] FROM WINDOWS;
CREATE USER MyAppPoolUser FOR LOGIN [IIS APPPOOL\DefaultAppPool];

# ClientApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.0.5.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
