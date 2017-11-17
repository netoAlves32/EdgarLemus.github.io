var http = require( "http" );
var fs = require( "fs" );

// Crear una instancia del servidor HTTP
var server = http.createServer( atenderServidor );

console.log( "Servidor iniciado" );

// Iniciar la escucha del servidor en el puero 8088
server.listen( 8088 );

//   CoffeeScript o TypeScript
function atenderServidor( request, response ){
	console.log( "Peticion recibida : " + request.url );

	 if( request.url == "/usuarios"){
        retornarLogin(request,response);
	}else if (request.url == "/registro") {
		guardarRegistro(request, response);
	}
	else {
		retornarArchivo( request, response );
	}
}
//Vector que va a almacenar los usuarios registrados

var usuarios = [];

var s = fs.readFile("usuarios.json",cargarUsuario);

function cargarUsuario(error,data) {
	if (error == null) {
		usuarios = JSON.parse(data);
		console.log("Los usuarios registrados son: ");
		console.log(usuarios);
	}else{
		console.log(error);
		response.end(error.toString());
	}
}

function guardarRegistro(request, response) {
	// Programa el Callback
	request.on("data", recibir);
	// Callback que recibe el cuerpo del POST
	  function recibir(data) {
		console.log(data.toString());
		var usr = JSON.parse(data);
		// Agregar al vector
		usuarios.push(usr);
		fs.writeFile("usuarios.json",JSON.stringify(usuarios), null);
		response.end("Ya recibimos el usuario");

	}
}



function retornarArchivo( request, response ){
  fs.readFile('C:/Users/ASUS R/Desktop/COSAS IMPORTANTES/DESARROLLO EN LA WEB/ULTIMAS TAREAS/loggin.html', archivoListo );

  function archivoListo( error, data ){
	if( error == null ){
		response.write( data );
		response.end();
	} else {
		console.log( error );
		response.end( error.toString() );
	}
  }
}

function retornarLogin(request,response) {
	fs.readFile('C:/Users/ASUS R/Desktop/COSAS IMPORTANTES/DESARROLLO EN LA WEB/ULTIMAS TAREAS/usuarios.json', archivoListo );

  function archivoListo( error, data ){
	if( error == null ){
		response.write( data );
		response.end();
	} else {
		console.log( error );
		response.end( error.toString() );
	}
  }
}
