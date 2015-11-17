var CURVES = ( function(){

	/* Dado los puntos de control se obtiene la matriz inversa para el metodo de interpolacion de puntos */
	var InvMatrixInterpolation = function (pControl){
		var u = pControl[0]; var u2 = Math.pow(u,2); var u3 = Math.pow(u,3);
		var n = pControl[1]; var n2 = Math.pow(n,2); var n3 = Math.pow(n,3);

		var a0 = (-n -n*u-u) / (n*u)
		var a1 = n / (u3 - n * u2 - u2 + n * u)
		var a2 = u / (n3-n2-n2*u+n*u);
		var a3 = n*u / (-n+n*u-u+1);

		var b0 = (n+u+1) / (n*u);
		var b1 = (-n-1) / (u3-n*u2-u2+n*u);
		var b2 = (-u-1) / (n3 -n2 -n2 *u +n *u);
		var b3 = (n+u ) / (n-n*u+u-1);

		var c0 = -1 / (n*u);
		var c1 = 1 / (u3-n*u2-u2+n*u);
		var c2 = 1 / (n3 -n2-n2*u+n*u);
		var c3 = 1 /(-n+n*u-u+1);

		var matrizInversa = new Array (4);

		matrizInversa[0] = [ 1, 0 , 0 , 0 ];
		matrizInversa[1] = [ a0, a1, a2, a3 ];
		matrizInversa[2] = [ b0, b1, b2, b3];
		matrizInversa[3] = [ c0, c1, c2, c3];

		return matrizInversa;
	}

	/* No necesita de los puntos de control */
	var InvMatrixHermite = function(){

		var matrizInversa = new Array (4);

		matrizInversa[0] = [ 1, 0 , 0 , 0 ];
		matrizInversa[1] = [ 0 , 0, 1, 0 ];
		matrizInversa[2] = [ -3 , 3, -2, -1];
		matrizInversa[3] = [ 2 , -2, 1, 1 ];

		return matrizInversa;
	}

	/* No necesita de los puntos de control */
	var InvMatrixBezier = function(){

		var matrizInversa = new Array (4);

		matrizInversa[0] = [ 1, 0 , 0 , 0 ];
		matrizInversa[1] = [ -3 , 3, 0, 0 ];
		matrizInversa[2] = [ 3 , -6 , 3, 0];
		matrizInversa[3] = [ 1 , 3, -3, 1 ];

		return matrizInversa;
	}

	/*  Multiplica una matriz por un vector para hallar las constantes */
	var coefficients = function(matrix , points){
		if(matrix[0].length != points.length)
			return 0;

		var resultPoints = [];
		var value = 0;
		for (var i = 0 ; i < matrix.length; i++){
			value = 0;
			for (var j = 0 ; j < points.length; j++){
				value = value + matrix[i][j] * points[j];
			}
			resultPoints.push(value.toFixed(2));
		}

		return resultPoints;
	}
	
	/*  Modofico el orden de los puntos para calculas los coeficientes */
	var realignPoints = function(puntos){
		
			var x2 = puntos[1];
			var x3 = puntos[2];
			var x4 = puntos[3];

			puntos[1] = x4;
			puntos[2] = x2;
			puntos[3] = x3;

			return puntos;

	}

	/* Evalua en la ecuacion para obtener el punto segun el parametro u y las constantes */
	var getPoint = function(coefficients,u){
		var u2 = Math.pow(u,2);
		var u3 = Math.pow(u,3);
		var c0 = parseFloat(coefficients[0]);
		var c1 = parseFloat(coefficients[1]);
		var c2 = parseFloat(coefficients[2]);
		var c3 = parseFloat(coefficients[3]);

		var result = c0 +(c1*u) + (c2*u2)+ (c3*u3);
		return result.toFixed(2);
	}

	var getDegree3Curve = function(puntos,length,matrix){
		if (puntos.length != 4 && length > 1)
				return 0;
		var result = [];
		var puntosX =[];
		var puntosY = [];
		var coefficientsX,coefficientsY;
		var x,y,point;

		/* Obtengo los puntos x y en listas separadas */
		for(var i = 0;i<puntos.length;i++){
			puntosX.push(puntos[i][0]);
			puntosY.push(puntos[i][1]);
		}

		/*  Modofico el orden de los coeficientes para calculas las constantes */
		puntosX = realignPoints(puntosX);
		puntosY = realignPoints(puntosY);

		coefficientsX = coefficients(matrix,puntosX);
		coefficientsY = coefficients(matrix,puntosY);
		for(var u = 0;u<=1;u+=length){
			x = getPoint(coefficientsX,u);
			y = getPoint(coefficientsY,u);
			point = [x,y]
			result.push(point);
		}

		return result;
	}

	return{

		/* Retorna los puntos de una curva interpolada
		   puntos = los 4 puntos que contendra la curva
		   pCOntrol = los puntos de control para la matriz
		   lenght = segun este valor se obtienen el numero de puntos resultantes
		*/
		InterpolationCurve: function(puntos,pControl,length){
			if(puntos.length!=4 && pControl.length!=2 && length>1)
				return 0;

			var result = [];
			var puntosX =[];
			var puntosY = [];
			var matrix,coefficientsX,coefficientsY;
			var x,y,point;
			for(var i = 0;i<puntos.length;i++){
				puntosX.push(puntos[i][0]);
				puntosY.push(puntos[i][1]);
			}
			matrix = InvMatrixInterpolation(pControl);
			coefficientsX = coefficients(matrix,puntosX);
			coefficientsY = coefficients(matrix,puntosY);
			for(var u = 0;u<=1;u+=length){
				x = getPoint(coefficientsX,u);
				y = getPoint(coefficientsY,u);
				point = [x,y]
				result.push(point);
			}

			return result;
		},

		HermiteCurve: function(puntos,length){
			matrix = InvMatrixHermite();
			return getDegree3Curve(puntos,length,matrix)
		},

		BezierCurve: function(puntos,length){
			matrix = InvMatrixBezier();
			return getDegree3Curve(puntos,length,matrix)
		}
	}

})();