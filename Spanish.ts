/* 
    Este archivo esta pensado para verlo coloreado y con los errores 
    correspondientes, asi que conviene descargarlo y abrirlo con un
    editor compatible con TypeSciprt como por ejemplo el VS Code.
*/

///////////////////////////////  QUE HAY EN ESTE DOCUMENTO Y ¿QUE CARAJO ES TYPESCRIPT?  ////////////////////////////
/*
    Este documento hace un recorrido muy rapido por todas las cosas que hay que saber para poder trabajar con 
    Typescript, en una hora se puede aprender si se le ponen ganas y se enseña bien.

    Todos los lenguajes incluyendo las ultimas versiones de PHP y Python tienen "tipado estatico", osea son como 
    TypeScript, solo faltaba que JavaScript tenga esta funcionalidad que es indispensable en un lenguaje de calidad. 
    Usan Typescript: Google, Github, Facebook, Microsoft y casi todas las empresas conocidas.

    El tipado estatico nos obliga a escribir el tipo de cada variable que creamos, esto es una información extra en 
    el código que permite que el editor entienda mucho mejor nuestro codigo y nos pueda ayudar con autocompletado de 
    calidad, funcionalidades de automatizacion de trabajo que no sabias que existian en el editor, señalamiento de 
    bugs mientras se escribe, etc, etc.

    Esto implica que estamos escribiendo una documentación implicita (obligatoria) que tambien sirve para poder leer 
    mejor nuestro codigo sin tener que abrir archivos y documentaciones para saber como proceder con un codigo que 
    no es nuestro o que no recordamos.

    Asi que todo el tiempo extra que necesitamos para escribir lo que Typescript nos obliga, nos lo devuelve 
    multiplicado mas tarde en bugs que no tenemos que arreglar y en las demas ventajas antes explicadas, no consume 
    tiempo si no todo lo contrario.

    Typescript funciona igual que babel: Procesa nuestro codigo y genera un Javascript comun, se instala como un 
    plugin de webpack. Asi que es 100% compatible con todos los navegadores por que no esta presente en la ejecucion 
    final en el navegador, es una herramienta para usar mientras se programa.
*/

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////// ANTES DE EMPEZAR //////////////////////////////////////////////

/*
    1) Ejecutar el comando: npm install typescript tslint -g
    2) Instalar el plugin TSlint para Visual Studio Code o para el editor que uses
*/

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////// LO PRINCIPAL  /////////////////////////////////////////////////////

/*
    La diferencia entre Typescript y Javascript es que hay que escribir los tipos al crear una variable o una funcion, 
    por ejemplo:
*/

    const palabraDeSaludo: string = "hola";

    function saludo(nombre: string): string {    // Aca especificamos el tipo del parametro y que tipo devuelve la funcion.
        return palabraDeSaludo + " " + nombre;
    }

/*
    La gracia de escribir el tipo es que el contenido que le asignas a la variable tiene que ser del tipo que escribiste, 
    de lo contrario nos va a dar un error.

    Los tipos que se pueden poner son estos:
*/
    string    // Para los strings (los tipos basicos van en minuscula)
    number    // Para los numeros
    boolean   // Para los booleanos
    Array<TIPO_DEL_CONTENIDO> /* o tambien puede ser: */ TIPO_DEL_CONTENIDO[]    // Para los arrays
    void 	// Se usa solo para indicar que algo no devuelve nada.
    (a:string, b:string)=>void	// Ejemplo de un tipo para una funcion o una arrow function, (si, es largo de escribir).
    NombreDeClase	            // Para la instancia de una clase el tipo es el mismo nombre de la clase. 
    NombreDeInterfaz            // Ver mas abajo que son las Interfaces
    NombreDeEnum                // Ver mas abajo que son los Enums
    any 	// NO HAY QUE USARLO, desactiva el tipado, si sentis que es la unica solucion a un problema es por que algo esta mal o te falta aprender algo.
    object  // NO HAY QUE USARLO, sirve para los objetos, igual que el any es un tipo sin informacion por lo tanto es inservible y anti-tipado.

/* 
    Tipos literales:
*/
    /*
        En el siguiente ejemplo la variable saludo no solo tiene que ser un string si no que el string 
        tiene que decir "hola", de lo contrario nos da error.
    */
    let saludo1: "hola" = "chau";    // Da error
    let saludo2: "hola" = "hola";    // Funciona

    /*
        Otro ejemplo con numeros:
    */
    let cero: 0 = 0;

    /*
        Otro ejemplo con un objeto:
    */
    let ejemplo2: {valor1: string, valor2: number} = {valor1: "hola", valor2: 666};

    /*
        Los tipos literales se vuelven largos e ilegibles muy facilmente, para solucionar eso existen las 
        interfaces y los enums, de esa manera podemos escribir el tipo aparte y ponerle un nombre que se 
        usa como el tipo. Mas abajo esta explicado en mas detalle.
    */

/*
    Typescript agrega una cosa mas, los modificadores de acceso, private y public, esto sirve para que una
    propiedad de una clase no pueda ser leida desde afuera (private) o si pueda (public, es lo que viene por
    defecto en javascript). Mas abajo hay una explicacion detallada.
*/

////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////  EJEMPLO DE UNA CLASE ESCRITA CON TYPESCRIPT //////////////////////////

export class Employee implements IExample
{
    private department  : string | number;							// Se puede poner como tupo mas de un tipo a la vez separado por | , esto se llama: "Union Types".
    public  _list       : string[];									// Los arrays son tipados, solo pueden contener elementos del tipo indicado 
    public  list2       : Array<string>;						    // La otra sintaxis del tipo array.
    public  myEvent     : (x: number, y: number) => void;           // Function types

    constructor(yourName: string, department: string | number) 		// En el constructor no se escribe que tipo devuelve.
    {
        this.department = department;
    }

    public example(): string
    {
        return `Hello, I work in ${this.department}.`;
    }

    /*
        Getter
    */
    get superList(): Array<string> 
    {
        return this._list;
    }

    /*
        Setter
    */
    set superList(newList: Array<string>) : void
    {
        this._list = newList;
    }

    /*
        Union Types en uso:
    */
    public unionTypesUsageExample(param: string | number | HTMLElement | HTMLImageElement | HTMLDivElement): void 
    {
        /* 
            Se usa typeof para los tipos basicos (string y number) y se usa instanceof para los demas tipos 
            (de todas maneras esto es un dato de JS no esta relacionado con TS):
        */
        if (param instanceof HTMLDivElement) {
            console.log('this is HTMLDivElement');
        } else if (param instanceof HTMLImageElement) {
            console.log('this is HTMLImageElement');
        } else if (param instanceof HTMLElement) {
            console.log('this is HTMLElement');
        } else if (typeof param === "string") {
            console.log('this is string');
        } else if (typeof param === "number") {
            console.log('this is number');
        } else {
            console.log("You're not supposed to be here!");
        }
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////  MODIFICADORES DE ACCESO  /////////////////////////////////////////////

/*
    Nos permite hacer que una clase tenga una especie de api publica y privada para que no se acceda ni se 
    haga autocompletado de cosas que no hay que llamar desde afuera.
*/

export class Person
{
	private id : number;			// private hace que la propiedad solo sea visible dentro de la clase 
    protected name : string;		// protected hace que la propiedad sea solo visible dentro de la clase y clases hijas
    public nickname : string		// public deja que la propiedad sea visible desde afuera como es comun en JS, tambien es
    								// la default si no se escribe el modificador de acceso.

	// Los modificadores de acceso en los parametros del constructor crean parametros y propiedades a la vez
    constructor(private lastName: string, name: string)  
    {
    	this.name = name;			// Usando un modificador de acceso en la propiedad del constructor nos ahorramos este tipo de lineas.
    }

    private saludar():void			// Tambien se usan en los metodos, observar el private aca antes del nombre del metodo.
    {

    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////  INTERFACES  ///////////////////////////////////

/*
    Como vimos antes con los tipos literales, se pueden escribir las keys de un objeto con su tipo como el
    tipo del objeto asi:
*/
let ejemplo: {valor1: string, valor2: number} = {valor1: "hola", valor2: 666};

/*
    Pero un tipo no puede ser tan largo por una cuestion de legibilidad, de hecho es una muy mala practica
    escribir un tipo literal asi. Asi que se lo puede escribir aparte con un nombre y usar ese nombre como
    el tipo, asi queda mas legibley es reautilizable, eso son las interfaces.
*/

/* 
    Declarar una interfaz:
*/
interface IExample 			          // Las interfaces se usa escribirlas con una I adelante del nombre.
{
    name: string;                     // Ejemplo de propiedad obligatoria (si no esta presente en el objeto tira error)
    color?: string;                   // Ejemplo de propiedad opcional (es con el signo de interrogación)
    walk?(): number;                  // Ejemplo de metodo obligatorio.
    getHairType?(): number;           // Ejemplo de metodo opcional.
}

/* 
    Utilizar la interfaz con una variable:
*/
const miObjeto: IExample = {color: "red", walk: () => 200}      // Error: falta la propiedad "name"

/*    
    Ademas se pueden aplicar a claseses, con la palabra implements, esto obliga a la clase a que 
    implemente lo que esta en la interfaz.
    De esa manera el nombre de la interfaz puede ser usado como el tipo para las instancias de la
    clase y tambien vale para todas las clases que implementen la interfaz haciendolas compatibles
    en el tipado, por ejemplo la interfaz IMascota se puede usar como tipo para
    las instancias de Perro y Gato (siempre que ambas implementen la interfaz IMascota).
    Para esto se usa la palabra "implements":
*/

class MiClase implements IExample {}    // Error: No implementamos las propiedades de IExample en la clase

/*
    Como las propiedades de una clase se escriben con su tipo no hace falta que las clases implementen 
    si o si una interfaz, pero si hace falta que todos los objetos escritos utilizando {}, deberian 
    tener su interfaz.
*/

///////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////// ENUMS  //////////////////////////////////////////////////////

/*
    Como vimos antes una variable puede tener varios tipos simultaneamente y pueden ser tipos 
    literales, por ejemplo:
*/

const direccion: "left" | "right" | "top" | "down" = "left";

/*
    Esta variable es un string que puede tener esos 4 valores, pero se hace muy largo de leer, 
    para solucionar eso estan los enums.
*/

/////// Declaración: 
export enum Direction {
    Up,
    Down,
    Left,
    Right,
}

/////// Ejemplos de uso:
const whereToGo: Direction = Direction.Left;
exampleInMethod(Direction.Left);

function exampleInMethod(newDirection:Direction)
{
	if(newDirection == Direction.Left)
		console.log("going left");
}

/*
    El transpilador transforma los usos del enum en numeros, se puede especificar que numeros queremos
    para cada elemento del enum (es raro que se necesite):
*/
		enum Directions {
		    Up = 0,
		    Down = 1,
		    Left = 2,
		    Right = 3
		}

///////// También se pueden hacer "string enums":

		enum Directions2 {
		    Up = "UP",
		    Down = "DOWN",
		    Left = "LEFT",
		    Right = "RIGHT",
		}



//////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////// GENERICS //////////////////////////////////////////////////

/*
    Este es el último concepto y el mas complicado de aprender aveces. 
    Es para que nunca sea necesario usar los tipos "any" u "object", caundo si o si necesitas esos 
    tipos es por que tenes que recurrir a esto.
    Esta herramienta permite crear metodos o clases donde le pasamos el tipo entre los caracteres < > 
    e internamente trabaja con ese tipo sin importar cual sea.
*/

/**
 * Declarar:
 */
function randomizeArray<T>(array: Array<T>): Array<T> 
{
    /*
        Esta funciona mezclaria un array, no importa de que tipo es
        por que no nos metemos con los elementos.
    */
   return array;
}

/**
 * Usar:
 */
const randomized: Array<string> = randomizeArray<string>(["Frutilla", "Chocolate"]);

/*
	Si no usaramos esto, el método habría que escribirlo asi:

	function randomizeArray(array: Array<any>): Array<any> 

	Perderiamos la informacion del tipo, "any" no es bueno por que no contiene ninguna información.
*/

///////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////// PARTIAL ///////////////////////////////////////////////////

/*
    En react usamos la funcion: this.setState(state) que acepta un objeto que tenga alguna de las propiedades
    del state, si le pasas un objeto que no tiene ninguna propiedad del state nos da error o si tiene alguna
    propiedad que no esta en el state tambien nos da error, la pregunta es, como sabe typescript esto?.
    Es un tipo que viene con typescript que se llama Partial<>:
 */

let parteDelObjeto1: IExample = {  // Error: IExample tiene la propiedad "name" como obligatoria y no la estamos poniendo.
    color: "Black"
}

const parteDelObjeto2: Partial<IExample> = {    // Aca no tenemos mas ese problema. Con que tenga alguna propiedad de IExample esta bien.
    color: "Black"
}

const parteDelObjeto3: Partial<IExample> = {    // Error: la propiedad sarasa no esta en IExample.
    sarasa: "Hola"
}

/*
    Esto es muy util tanto en React como en cualquier otro codigo que incorpora el patron inmutability.
    Hay mas tipos que vienen con Typescript para hacer otras cosas pero son poco comunes.
*/


///////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////// CAST  ////////////////////////////////////////////////

/*
    Se le llama castear cuando se quiere hacer pasar un tipo por otro, si son compatibles nos los va 
    a permitir, los tipos compatibles son las clases padres con sus clases hijos o las clases que
    implementan una interfaz.

    Se puede castear con 2 sintaxis, una sirve para cuando la otra tira error de sintaxis por culpa
    del contexto o para cuando se quiere dejar mas legible el codigo, funcionalmente son 
    identicas en TS.
*/

/* 
    Sintaxis 1
*/
hacerAlgo((ClaseHijo)instanciaClasePadre);

/* 
    Sintaxis 2
*/
instanciaClaseHijo as ClasePadre


////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////// USAR UNA LIBRERIA ESCRITA EN JS /////////////////////////////////////

/*
Se pueden usar librerias hechas en JS como si estuvieran hechas en TS, la comunidad escribe archivos
con extensión .d.ts que son definiciones de tipos para librerias de JS, hay muchas escritas y ya casi 
todo se encuentra. En otras palabras esto le agrega los tipos a una libreria que no los tiene.

Para agregarle los tipos a una libreria hacemos lo siguiente:
    1) npm install, con el nombre de la libreria agregandole el prefijo @types/ por ejemplo:    
           npm install @types/react

    2) Si nos dice que no existe el paquete puede ser que sea por que la libreria ya esta programada en 
       TypeScript y no necesitamos los tipos aparte por que vienen ya, en ese caso no tenemos que hacer 
       nada y simplemente vemos el tipado.

    3) Si no tuvimos suerte con ninguno de los puntos anteriores y no tenemos los tipos entonces podemos
       usar la libreria sin los tipos, (ver instrucciones para eso abajo).
*/

/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////// USAR UNA LIBRERIA EN JS QUE NADIE ESCRIBIO LOS TIPOS ////////////////////////

/* 
    Para eso hay que agregar en el import, un comentario con el texto @ts-ignore, asi:
*/

// @ts-ignore
import { LibraryObject } from "example-library";


/////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////// CREAR LOS TIPOS DE UNA LIBRERIA EN JS /////////////////////////////////

/*
    El proceso para crear una definicion de tipos .d.ts es bastante automatizado, no requiere mucho 
    tiempo, mas detalles en este link:
		https://stackoverflow.com/questions/12687779/how-do-you-produce-a-d-ts-typings-definition-file-from-an-existing-javascript
*/

////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////// CONVERTIR JSON EN UNA INTERFAZ ///////////////////////////////////

/*
    Cuando recibimos un json y lo parseamos a un objeto, necesitamos el tipo para ese objeto, 
    concretamente necesitamos la interfaz. Esto puede ser una tarea tediosa de hacer a mano, 
    en esta aplicacion web pegamos el json y nos genera las interfaces bien hechas:
	
		https://jvilk.com/MakeTypes/
*/

/////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////// INSTALACION: EN UN PROYECTO CON NODE.JS ///////////////////////////////

/*
    1) Creamos una carpeta vacia y abrimos la carpeta con el VS code.
    
    2) Ejecutar en la consola: npm init -y
       Eso crea el archivo package.json, si la carpeta tiene un espacio en el nombre nos puede tirar error.

    3) Abrimos package.json y reemplazamos la linea del valor main por la siguiente:
           "main": "./build/index.js",      (O la ruta donde va a ir el index.js)
    
    4) Ejecutar en la consola el siguiente comando:
            npm install --save-dev typescript @types/node tslint
    
    5) Crear archivo tsconfig.json y pegar el sigueinte codigo:
*/
{
    "compilerOptions": {
        "outDir": "./build",
        "rootDir": "./src",
        "target": "es6",
        "module": "commonjs",
        "sourceMap": true,
        "watch": true
    }
}
/*
    6) Crear src/index.ts, ahi vamos a arrancar a programar nuestra aplicacion.

    7) El comando para compilar typescript en todo el proyecto y que se quede vigilando
    los cambios es: tsc
    Asi que tiene que estar incluido en el comando npm start

    8) Crear un archivo tslint.json con este contenido:
*/
{
  "extends": ["tslint:latest"],
  "rules": {
    "no-console": {
        "severity": "warning",
        "options": [
            "debug",
            "info",
            "log",
            "time",
            "timeEnd",
            "trace"
        ]
    },
    "typedef": [
        true,
        "call-signature",
        "parameter",
        "property-declaration",
        "variable-declaration",
        "member-variable-declaration",
        "object-destructuring",
        "array-destructuring"
    ],
    "no-var-requires": false,
    "ordered-imports": false,
    "no-empty-interface": false,
    "object-literal-sort-keys": false,
    "no-eval": false,
    "no-trailing-whitespace": false,

    "no-shadow": ["error", { "builtinGlobals": false, "hoist": "never", "allow": [] }],
    "no-submodule-imports": false,

    "no-implicit-dependencies": false
  },
  "jsRules": {},
  "rulesDirectory": []
}

/*
    Con eso ya se puede empezar a programar.

    Para tener en cuenta:

    - Para iniciar el server ejecutar este comando:
    node ./build/index.js         (o la ruta donde esté el index.js)

    - Para iniciar una sesion de debug que permite poner breakpoints:
    Presionar F5 y seleccionar Node.js          (no puede estar corriendo el server)
*/

////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////// INSTALACION: EN UN PROYECTO CON WEBPACK ////////////////////////////////

/*
    Si vas a usar React lo mas rapido es usar un boilerplate, osea un proyecto inicial con 
    todo configurado como este:
        https://github.com/fermmm/boilerplate-typescript-react-redux-webpack

    Para configurarlo de cero sin React estos son los pasos:
*/

/*     
    1) En el root del proyecto creamos un achivo llamado tsconfig.json con este contenido:
*/

{
    "compileOnSave": false,
    "compilerOptions": {
    	"noImplicitAny": true,
    	"allowJs": true,
        "module": "ES6",
        "target": "es5",
        "emitDecoratorMetadata": true,
        "experimentalDecorators": true,
        "lib": [ "es2015", "dom" ],
        "moduleResolution": "node",
        "sourceMap": true,
        "suppressImplicitAnyIndexErrors": true,
        "jsx": "react"
    }
}

/*
	2) En el archvo webpack.config.js dentro de module.rules tiene que estar esto:
*/
module: {
	rules: [
		...
		{
		    test: /\.tsx?$/,
		    use: 'ts-loader',
		    exclude: /node_modules/
		}

/*
    3) En el mismo archvo (webpack.config.js) dentro de resolve.extensions tiene que 
       estar '.tsx' y '.ts':
*/
resolve: {
    extensions: [ '.tsx', '.ts', '.js' ]
},

/*
	4) Ejecutar el siguiente comando:

		npm install ts-loader typescript
*/

/*
	Con eso ya tendría que funcionar Typescript.
*/