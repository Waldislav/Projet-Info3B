function det(u,v,w){
 let tmp1 = new THREE.Vector3(0,0,0); 
 tmp1.crossVectors(v,w);//cross ne marche plus
 return u.dot(tmp1);
}

function repere(MaScene){ 
    var PointO3 = new THREE.Vector3( 0,0,0 );
    var vecI = new THREE.Vector3( 1, 0, 0 );
    var vecJ = new THREE.Vector3( 0, 1, 0 );
    var vecK = new THREE.Vector3( 0, 0, 1 );
    vecteur(MaScene,PointO3,vecI, 0xFF0000, 0.25, 0.125 );
    vecteur(MaScene,PointO3,vecJ, 0x00FF00, 0.25, 0.125 );
    vecteur(MaScene,PointO3,vecK, 0x0000FF, 0.25, 0.125 );
}


function TraceBezierCubique(tabPt, nbPts, coul, epaiCbe){
	let cbeBez = new THREE.CubicBezierCurve3(tabPt[0], tabPt[1], tabPt[2], tabPt[3]);
	let cbeGeometry = new THREE.Geometry();
	cbeGeometry.vertices = cbeBez.getPoints(nbPts);
	let material=new THREE.LineBasicMaterial({
		color:coul,
		linewidth: epaiCbe
	});
	let BezierCubique= new THREE.Line(cbeGeometry, material);
	return(BezierCubique);
}

function TraceBezierQuadratique(tabPt, nbPts, coul, epaiCbe){

	let cbeBez= new THREE.QuadraticBezierCurve3(tabPt[0], tabPt[1], tabPt[2]);
	
	let cbeGeometry = new THREE.Geometry();
	
	cbeGeometry.vertices = cbeBez.getPoints(nbPts);
	
	let material = new THREE.LineBasicMaterial({
	
	color: coul,
	
	linewidth: epaiCbe
	
	});
	
	let BezierQuadratique = new THREE.Line(cbeGeometry, material);
	return(BezierQuadratique);
}

function latheBezCub(nbePtCbe, nbePtRot, tabP, coul, opacite, bolTranspa){
	let cbeBez=new THREE.CubicBezierCurve3(tabP[0], tabP[1], tabP[2], tabP[3]);
	let tabPtCourbe=cbeBez.getPoints(nbePtCbe);
	let latheGeometry=new THREE.LatheGeometry(tabPtCourbe, nbePtRot, 0, 2*Math.PI);	
	let MaterialPhong=new THREE.MeshPhongMaterial({
		color: coul,
		opacity: opacite,
		transparent: bolTranspa,
		emissive: 0x000000,
		specular: "#00FFFF",
		flatShadig: true,
		shininess: 30,
		side: THREE.DoubleSide
	});
	let LatheBez=new THREE.Mesh(latheGeometry, MaterialPhong);
	return(LatheBez);
			
}

function latheBezQuad(nbePtCbe, nbePtRot, tabP, coul, opacite, bolTranspa){
	let cbeBez=new THREE.QuadraticBezierCurve3(tabP[0], tabP[1], tabP[2]);
	let tabPtCourbe=cbeBez.getPoints(nbePtCbe);
	let latheGeometry=new THREE.LatheGeometry(tabPtCourbe, nbePtRot, 0, 2*Math.PI);	
	let MaterialPhong=new THREE.MeshPhongMaterial({
		color: coul,
		opacity: opacite,
		transparent: bolTranspa,
		emissive: 0x000000,
		specular: "#00FFFF",
		flatShadig: true,
		shininess: 30,
		side: THREE.DoubleSide
	});
	let LatheBez=new THREE.Mesh(latheGeometry, MaterialPhong);
	return(LatheBez);
			
}

function ToreF(rayonCentre,rayonTube, nbPtsMeridien, nbPtsParallele, lgArc, coul, opacite, bolTranspa){
	let MaterialPhong=new THREE.MeshPhongMaterial({
	  color: coul,
	  opacity: opacite,
	  transparent: bolTranspa,
	  emissive: 0x000000,
	  specular: "#00FFFF",
	  flatShadig: true,
	  shininess: 30,
	  side: THREE.DoubleSide
	});
	let ToreGeom=new THREE.TorusGeometry(rayonCentre, rayonTube, nbPtsMeridien, nbPtsParallele, lgArc);
	var ToreM=new THREE.Mesh(ToreGeom, MaterialPhong);
	return ToreM;
  }

  function CylindreF(rayon1,rayon2, haut, nbPtsCercle, nbPtsGenera, bolOuvert, theta0, thetaLg, coul, opacite, bolTranspa){
	let MaterialPhong=new THREE.MeshPhongMaterial({
	  color: coul,
	  opacity: opacite,
	  transparent: bolTranspa,
	  emissive: 0x000000,
	  specular: "#00FFFF",
	  flatShadig: true,
	  shininess: 30,
	  side: THREE.DoubleSide
	});
	let CylConeGeom= new THREE.CylinderGeometry(rayon1, rayon2, haut, nbPtsCercle, nbPtsGenera, bolOuvert, theta0, thetaLg);
	let CylMesh=new THREE.Mesh(CylConeGeom,MaterialPhong);
	return CylMesh;
  }

  function SphereF(rayon, nbParallel, nbMeridien, phi0, phiLg, theta0,thetaLg, coul, opacite, bolTranspa){
	let MaterialPhong=new THREE.MeshPhongMaterial({
	  color: coul,
	  opacity: opacite,
	  transparent: bolTranspa,
	  emissive: 0x000000,
	  specular: "#00FFFF",
	  flatShadig: true,
	  shininess: 30,
	  side: THREE.DoubleSide
	});
	let sphereGeom = new THREE.SphereGeometry(rayon, nbParallel, nbMeridien, phi0, phiLg, theta0, thetaLg);
	let sphereMesh=new THREE.Mesh(sphereGeom,MaterialPhong);
	return sphereMesh;
  }



//segment AB
function segment(MaScene,A,B,CoulHexa,epai){
 var geometry = new THREE.Geometry();
 geometry.vertices.push(A,B);
 var line = new THREE.Line(geometry, new THREE.LineDashedMaterial({
     color: CoulHexa,
     linewidth: epai,
    /* scale: .1,
     dashSize: .3,
     gapSize: .1*/
 }));
 //line.computeLineDistances();
 //scene.add(line);
 MaScene.add(line );
}

function tracePt(MaScene, P, CoulHexa,dimPt){    
 let sphereGeometry = new THREE.SphereGeometry(dimPt,12,24);
 let  sphereMaterial = new THREE.MeshBasicMaterial({color: CoulHexa });
 let sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
 sphere.position.set(P.x,P.y,P.z);
 //alert(P.x+"\n"+P.y+"\n"+P.z+"\n"+CoulHexa+"\n"+dimPt);
 MaScene.add(sphere);
} // fin function tracePt

var epsilon = 0.00000001;
function testZero(x){
  var val=parseFloat(Number(x).toPrecision(PrecisionArrondi));
  if (parseFloat(Math.abs(x).toPrecision(PrecisionArrondi))<epsilon) val=0;
  return val;
}

const PrecisionArrondi=50;

//vecteur normal unitaire a une face
function vecteurProdVec(MaScene,A,u,v,CoulHexa,longCone,RayonCone){
 let w = new THREE.Vector3(0,0,0);
 let C = new THREE.Vector3(0,0,0);
 w.crossVectors(u,v);
 w.normalize();
 C.addVectors(A,w);
 vecteur(MaScene,A,C,CoulHexa,longCone,RayonCone);
}
//vecteur AB qui est une fleche
function vecteur(MaScene,A,B,CoulHexa,longCone,RayonCone){
 var vecAB = new THREE.Vector3( B.x-A.x, B.y-A.y, B.z-A.z );
 vecAB.normalize();
 MaScene.add( new THREE.ArrowHelper( vecAB, A, B.distanceTo(A), CoulHexa,longCone,RayonCone ));
}

//retour le vecteur AB qui est une fleche sans l'afficher
function vecteurRetroune(MaScene,A,B,CoulHexa,longCone,RayonCone){
 var vecAB = new THREE.Vector3( B.x-A.x, B.y-A.y, B.z-A.z );
 vecAB.normalize();
 return(vecAB);
}

//retour le vecteur  normal unitaire a une face sans l'afficher
function vecteurProdVecRetroune(MaScene,A,u,v,CoulHexa,longCone,RayonCone){
 let w = new THREE.Vector3(0,0,0);
 let C = new THREE.Vector3(0,0,0);
 w.crossVectors(u,v);
 w.normalize();
 //C.addVectors(A,w);
 return(w);
}

//vecteur AB qui est une fleche
function vecteurTan(MaScene,A,vB,CoulHexa,longCone,RayonCone){
 let B = new THREE.Vector3( 0, 0, 0);
 B.addVectors(A,vB);
 vecteur(MaScene,A,B,CoulHexa,longCone,RayonCone);
}


function afficheVecteur(V,nom,lieu){
 var mes = nom+" : (";
 for(var i=0;i<2;i++)
   mes+=V.getComponent(i)+" , ";
 mes+=V.getComponent(2)+" ) <br />";
 document.getElementById(lieu).innerHTML+=mes;
}


