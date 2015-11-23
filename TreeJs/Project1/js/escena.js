cuartoPosition = [0,0,0];//Cuarto 2 unidades detras de la camara
camaraPosition = [0,0,0];// Camara en el origen
cuboPosition = [0,0,-12];
cuartoSize = [19,7,30];
cuboSize = [1.5,1.5,1.5];

function Escena( render , canvasWidth , canvasHeight, objects ) {
	this.lastTime = 0;
	this.positionCameraAnimation = 0;
	this.tipo = 0;	
	
	this.render = render;

	this.escena = new THREE.Scene();

	initLuces(this.escena);
	
	this.camara = initCamara(canvasWidth/canvasHeight,this.escena);

	this.cuarto = initCuarto(cuartoSize[0],cuartoSize[1],cuartoSize[2],cuartoPosition[0],cuartoPosition[1],cuartoPosition[2],"img/cuarto.jpg",3,this.escena);

	this.caja = new Caja(cuboSize[0],cuboSize[1],cuboSize[2],cuboPosition[0],cuboPosition[1],cuboPosition[2],"img/madera.jpg",this.cuarto, objects);

	initEsfera(this.caja.get());

	initCubo(this.caja.get(),-1,-1,1);

	initPiramide(this.caja.get());

	initLuces(this.cuarto);


}




function initLuces(object){
	
	var luzAmbiente = new THREE.AmbientLight(0X111111);
	object.add(luzAmbiente);

	var spotLight = new THREE.SpotLight( 0xffffff );
	spotLight.position.set( 0,0,2);
	spotLight.castShadow = true;
	object.add( spotLight );    

}

function initCamara(aspectRatio,object){
    camara = new THREE.PerspectiveCamera(45,aspectRatio,0.1,100);
	camara.position.set(camaraPosition[0],camaraPosition[1],camaraPosition[2]);
	camara.lookAt(object.position);
	object.add(camara);
	return camara;
}

function initCuarto(sizeX,sizeY,sizeZ,posX,posY,posZ,imagen,nimagenes,object){	
	
	var cuboTextura = new THREE.ImageUtils.loadTexture(imagen);
	var cuboMaterial = new THREE.MeshLambertMaterial({ map:cuboTextura, side:THREE.DoubleSide, shading: THREE.SmoothShading });
	var x1=((0-sizeX)/2); var x2=((0+sizeX)/2); var y1=((0-sizeY)/2); var y2=((0+sizeY)/2); var z1=((0-sizeZ)/2); var z2=((0+sizeZ)/2); 
	//var meshMaterial = new THREE.MeshLambertMaterial( { color: 0x4b3621 } );
	//meshMaterial.side = THREE.DoubleSide;

	var cara = new THREE.Geometry(); //creo el cubo personalizado

	var v1 = new THREE.Vector3(x1,y1,z1);
	var v2 = new THREE.Vector3(x2,y1,z1);
	var v3 = new THREE.Vector3(x2,y2,z1);
	var v4 = new THREE.Vector3(x1,y2,z1);
	var v5 = new THREE.Vector3(x1,y1,z2);
	var v6 = new THREE.Vector3(x2,y1,z2);
	var v7 = new THREE.Vector3(x2,y2,z2);
	var v8 = new THREE.Vector3(x1,y2,z2);
	var v9 = new THREE.Vector3(x2,y2,z2);
	var v10 = new THREE.Vector3(x1,y2,z2);

	cara.vertices.push(v1);
	cara.vertices.push(v2);
	cara.vertices.push(v3);
	cara.vertices.push(v4);
	cara.vertices.push(v5);
	cara.vertices.push(v6);
	cara.vertices.push(v7);
	cara.vertices.push(v8);
	cara.vertices.push(v9);
	cara.vertices.push(v10);
	
	if(nimagenes==1){
		//lado1	
		cara.faces.push( new THREE.Face3(3,2,0) );
		cara.faces.push( new THREE.Face3(2,1,0) );
		cara.faceVertexUvs[0].push([new THREE.Vector2(0,0),new THREE.Vector2(1,0),new THREE.Vector2(0,1)]); //triangulo arriba
		cara.faceVertexUvs[0].push([new THREE.Vector2(1,0),new THREE.Vector2(1,1),new THREE.Vector2(0,1)]); //triangulo abajo
		//lado2
		cara.faces.push( new THREE.Face3(2,3,8) );
		cara.faces.push( new THREE.Face3(3,9,8) );
		cara.faceVertexUvs[0].push([new THREE.Vector2(0,0),new THREE.Vector2(1,0),new THREE.Vector2(0,1)]); //triangulo arriba
		cara.faceVertexUvs[0].push([new THREE.Vector2(1,0),new THREE.Vector2(1,1),new THREE.Vector2(0,1)]); //triangulo abajo
		//lado3
		cara.faces.push( new THREE.Face3(3,4,7));
		cara.faces.push( new THREE.Face3(3,0,4) );
		cara.faceVertexUvs[0].push([new THREE.Vector2(0,0),new THREE.Vector2(1,1),new THREE.Vector2(1,0)]);
		cara.faceVertexUvs[0].push([new THREE.Vector2(0,0),new THREE.Vector2(0,1),new THREE.Vector2(1,1)]);
		//lado4
		cara.faces.push( new THREE.Face3(1,2,6) );
		cara.faces.push( new THREE.Face3(1,6,5) );
		cara.faceVertexUvs[0].push([new THREE.Vector2(0,1),new THREE.Vector2(0,0.66),new THREE.Vector2(1,0.66)]); //triangulo arriba
		cara.faceVertexUvs[0].push([new THREE.Vector2(0,1),new THREE.Vector2(1,0.66),new THREE.Vector2(1,1)]); //triangulo abajo
		//lado51
		//cara.faces.push( new THREE.Face3(4,5,6) ); //DESCOMENTAR PARA TAPAR CARA FRONTAL
		//cara.faces.push( new THREE.Face3(7,4,6) ); //DESCOMENTAR PARA TAPAR CARA FRONTAL
		//cara.faceVertexUvs[0].push([new THREE.Vector2(0,0),new THREE.Vector2(1,1),new THREE.Vector2(1,0)]);
		//cara.faceVertexUvs[0].push([new THREE.Vector2(0,0),new THREE.Vector2(0,1),new THREE.Vector2(1,1)]);
		//lado6
		cara.faces.push( new THREE.Face3(4,0,5) );
		cara.faces.push( new THREE.Face3(0,1,5) );
		cara.faceVertexUvs[0].push([new THREE.Vector2(0,0.33),new THREE.Vector2(1,0.33),new THREE.Vector2(0,0.66)]); //triangulo arriba
		cara.faceVertexUvs[0].push([new THREE.Vector2(1,0.33),new THREE.Vector2(1,0.66),new THREE.Vector2(0,0.66)]); //triangulo abajo
	}
	if(nimagenes==3){
		//lado1	
		cara.faces.push( new THREE.Face3(3,2,0) );
		cara.faces.push( new THREE.Face3(2,1,0) );
		cara.faceVertexUvs[0].push([new THREE.Vector2(0,0.66),new THREE.Vector2(1,0.66),new THREE.Vector2(0,1)]); //triangulo arriba
		cara.faceVertexUvs[0].push([new THREE.Vector2(1,0.66),new THREE.Vector2(1,1),new THREE.Vector2(0,1)]); //triangulo abajo
		//lado2
		cara.faces.push( new THREE.Face3(2,3,8) );
		cara.faces.push( new THREE.Face3(3,9,8) );
		cara.faceVertexUvs[0].push([new THREE.Vector2(0,0.33),new THREE.Vector2(1,0.33),new THREE.Vector2(0,0.66)]); //triangulo arriba
		cara.faceVertexUvs[0].push([new THREE.Vector2(1,0.33),new THREE.Vector2(1,0.66),new THREE.Vector2(0,0.66)]); //triangulo abajo
		//lado3
		cara.faces.push( new THREE.Face3(3,4,7));
		cara.faces.push( new THREE.Face3(3,0,4) );
		cara.faceVertexUvs[0].push([new THREE.Vector2(1,0.66),new THREE.Vector2(0,1),new THREE.Vector2(0,0.66)]); //triangulo arriba
		cara.faceVertexUvs[0].push([new THREE.Vector2(1,0.66),new THREE.Vector2(1,1),new THREE.Vector2(0,1)]); //triangulo abajo
		//lado4
		cara.faces.push( new THREE.Face3(1,2,6) );
		cara.faces.push( new THREE.Face3(1,6,5) );
		cara.faceVertexUvs[0].push([new THREE.Vector2(0,1),new THREE.Vector2(0,0.66),new THREE.Vector2(1,0.66)]); //triangulo arriba
		cara.faceVertexUvs[0].push([new THREE.Vector2(0,1),new THREE.Vector2(1,0.66),new THREE.Vector2(1,1)]); //triangulo abajo
		//lado51
		//cara.faces.push( new THREE.Face3(4,5,6) ); //DESCOMENTAR PARA TAPAR CARA FRONTAL
		//cara.faces.push( new THREE.Face3(7,4,6) ); //DESCOMENTAR PARA TAPAR CARA FRONTAL
		//cara.faceVertexUvs[0].push([new THREE.Vector2(0,0),new THREE.Vector2(1,1),new THREE.Vector2(1,0)]);
		//cara.faceVertexUvs[0].push([new THREE.Vector2(0,0),new THREE.Vector2(0,1),new THREE.Vector2(1,1)]);
		//lado6
		cara.faces.push( new THREE.Face3(4,0,5) );
		cara.faces.push( new THREE.Face3(0,1,5) );
		cara.faceVertexUvs[0].push([new THREE.Vector2(0,0.33),new THREE.Vector2(1,0.33),new THREE.Vector2(0,0.66)]); //triangulo arriba
		cara.faceVertexUvs[0].push([new THREE.Vector2(1,0.33),new THREE.Vector2(1,0.66),new THREE.Vector2(0,0.66)]); //triangulo abajo
	}	
	
	
	
	cara.computeFaceNormals();
    cara.computeVertexNormals();

	cubo = new THREE.Mesh(cara,cuboMaterial);
	cubo.position.set(posX,posY,posZ);

	cubo.doubleSided = true;

	//cubo.castShadow = true;
	cubo.receiveShadow = true;

	object.add(cubo);
	return cubo;
}

function initEsfera(object){
	var esferaTextura = new THREE.ImageUtils.loadTexture("img/pelota.jpg");
	var esferaMaterial = new THREE.MeshLambertMaterial({ map:esferaTextura, side:THREE.DoubleSide});
	var esferaGeometria = new THREE.SphereGeometry(0.4, 16 ,16);
	var esfera = new THREE.Mesh(esferaGeometria, esferaMaterial);
	esfera.position.set(-0.5,0,0);
	esfera.castShadow = true;
	object.add(esfera);
	
}

function initCubo(object,x,y,z){
	var cuboTextura2 = new THREE.ImageUtils.loadTexture("img/cubo.jpg");
	var cuboMaterial2 = new THREE.MeshLambertMaterial({ map:cuboTextura2, side:THREE.DoubleSide });
	var cuboGeometria2 = new THREE.CubeGeometry(0.6, 0.6, 0.6);
	var cubo2 = new THREE.Mesh(cuboGeometria2, cuboMaterial2);
	cubo2.position.set(x,y,z);
	cubo2.castShadow = true;
	object.add(cubo2);	
}

function initPiramide(object){
	var piramideTextura = new THREE.ImageUtils.loadTexture("img/piramide.jpg");
	var piramideMaterial = new THREE.MeshLambertMaterial({ map:piramideTextura, side:THREE.DoubleSide });
	var piramideGeometria = new THREE.CylinderGeometry(0, 0.5 ,1, 4, 1, true);
	var piramide = new THREE.Mesh(piramideGeometria, piramideMaterial);
	piramide.position.set(0.9,0,0);
	piramide.castShadow = true;
	object.add(piramide);
}

function moverCamara(x,y,z){
	this.camara.position.set(x,y,z);
}
    
Escena.prototype.animarCamara = function(puntos){
	var length = puntos.length;
	moverCamara(puntos[this.positionCameraAnimation][0],0,puntos[this.positionCameraAnimation][1]);

	if(controlCamara.paralelo == true){
	this.camara.lookAt(0,0,0);}else{
	this.camara.lookAt(this.caja.position())
	}
	

	if (this.positionCameraAnimation == length-1)
		this.tipo = 1;
	if (this.positionCameraAnimation == 0)
		this.tipo = 0;

	if(this.tipo == 0)
		this.positionCameraAnimation+=1;
	if(this.tipo == 1)
		this.positionCameraAnimation-=1;
}

Escena.prototype.renderScene = function() {
  this.render.render(this.escena,this.camara);
};

Escena.prototype.getCamera = function() {
  return this.camara;
};
