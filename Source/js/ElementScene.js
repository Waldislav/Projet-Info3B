//********************************************************
 //
 //  CREATION PIERRE
 //
 //********************************************************


 function PierreF(equipe){

  let r= (3/4)/4;                //Rayon de la pierre
  let coulPierre=0x777777;
  let haut=0.30/4;
  let rayonTube=(1/16)/4;
  let hauteur=(1/3)/4;
  
  let coulEquipe;
  if(equipe)
    coulEquipe=0xFF0000;
  else
    coulEquipe=0x0000FF;

  let P0=new THREE.Vector3( 0, 3*haut/2, 0 );
  let P1=new THREE.Vector3( r/2, 3*haut/2, 0 );
  let P2=new THREE.Vector3( r, 3*haut/2, 0 );
  let P3=new THREE.Vector3( r, haut/2, 0 );

  let R0=new THREE.Vector3(r,0,0);
  let R1=new THREE.Vector3(r, -haut/2, 0);

  let Q1=new THREE.Vector3(r,-3*haut/2,0);
  let Q2=new THREE.Vector3(r/2,-3*haut/2,0);
  let Q3=new THREE.Vector3(0,-3*haut/2,0);

  let ptTab=[P0,P1,P2,P3];
  let ptTab2=[R1,Q1,Q2,Q3];
  let ptTab3=[P3,R0,R1];

  let Lathe1=latheBezCub(50, 100, ptTab, coulEquipe, 1/2, false);
  let Lathe2=latheBezQuad(50, 100, ptTab3, coulPierre, 1/2, false);
  let Lathe3=latheBezCub(50, 100, ptTab2, coulPierre, 1/2, false);

  let Poignee = new THREE.Group();
  let rayonCentre=rayonTube*2;
  let lgArc=Math.PI/4;

  let Tore=ToreF(rayonCentre,rayonTube, 50, 50, lgArc, coulEquipe, 1, false);

	let nbPtsCercle=60;
	let nbPtsGenera=2;
	let bolOuvert=true;
	let theta0=0;
	let thetaLg=2*Math.PI;
  let Cylindre=CylindreF(rayonTube,rayonTube, hauteur, nbPtsCercle, nbPtsGenera, bolOuvert, theta0, thetaLg, coulEquipe, 1, false);
  Cylindre.position.set(Cylindre.position.x,Cylindre.position.y-hauteur/2,Cylindre.position.z)
  Tore.position.set(Tore.position.x-2*rayonTube,Tore.position.y,Tore.position.z)
  
  Poignee.add(Tore);
  Poignee.add(Cylindre);

  hauteurTore=Math.sin(Math.PI/4)*(3*rayonTube)-(Math.sin(Math.PI/4)*rayonTube);
  Poignee.rotateX(3/2*Math.PI);
  Poignee.rotateZ(2*Math.PI);
  Poignee.position.set(rayonTube,rayonTube,0);

  let SuitePoignee1=CylindreF(rayonTube,rayonTube, hauteur, nbPtsCercle, nbPtsGenera, bolOuvert, theta0, thetaLg, coulEquipe, 1, false);
  let SuitePoignee2=ToreF(rayonCentre,rayonTube, 50, 50, lgArc, coulEquipe, 1, false);
  let SpherePoignee=SphereF(rayonTube, 50, 50, 0, 2*Math.PI, 0,Math.PI/2, coulEquipe, 1, false);
  SpherePoignee.position.set(0.3,0.3,0);
  let SuitePoignee=new THREE.Group();
  SuitePoignee.add(SuitePoignee1);
  SuitePoignee.add(SuitePoignee2);

  Poignee.add(SuitePoignee1);
  Poignee.add(SuitePoignee2);
  Poignee.add(SpherePoignee);

  SuitePoignee2.rotateZ(-Math.PI/4);
  SuitePoignee2.position.set(-2*rayonTube,-hauteur,0);

  let constanteatrouver=0.026/4;

  SuitePoignee1.rotateZ(3/2*Math.PI);
  SuitePoignee1.rotateZ(Math.PI/4);
  SuitePoignee1.position.set(0-2*rayonTube-constanteatrouver,-hauteur-2*hauteurTore-constanteatrouver,0);      //0.026 trouvé graphiquement

  hauteurCylindre=Math.sin(Math.PI/4)*hauteur;
  SpherePoignee.rotateZ(3*Math.PI/4);
  SpherePoignee.position.set(-hauteurCylindre-rayonTube/2,-hauteur-hauteurTore-hauteurCylindre+0.005/4,0);

  BasePierre = new THREE.Group();
  BasePierre.add(Lathe1);
  BasePierre.add(Lathe2);
  BasePierre.add(Lathe3);
  BasePierre.rotateX(1/2*Math.PI);
  BasePierre.position.set(BasePierre.position.x+r,BasePierre.position.y+r,BasePierre.position.z+3*haut/2);
  
  Poignee.rotateX(-Math.PI/2);
  Poignee.rotateZ(-Math.PI/4);
  Poignee.position.set(r/2,3*haut/2+hauteurTore/1.5,0);

  BasePierre.add(Poignee);

  return BasePierre;
}



function initTerrain(){

  

}
