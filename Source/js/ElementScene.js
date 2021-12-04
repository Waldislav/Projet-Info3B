function PierreF(equipe){

  let r= (3/4)/4;                //Rayon de la pierre
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

  let Lathe1=latheBezCub(50, 100, ptTab, coulEquipe, 1/2, false,30);
  let Lathe2=latheBezQuad(50, 100, ptTab3, 0xCCCCCC, 1/2, false,5);
  let Lathe3=latheBezCub(50, 100, ptTab2, 0x999999, 1/2, false,5);

  let Poignee = new THREE.Group();
  let rayonCentre=rayonTube*2;
  let lgArc=Math.PI/4;

  let Tore=ToreF(rayonCentre,rayonTube, 50, 50, lgArc, coulEquipe, 1, false,30);

	let nbPtsCercle=60;
	let nbPtsGenera=2;
	let bolOuvert=true;
	let theta0=0;
	let thetaLg=2*Math.PI;
  let Cylindre=CylindreF(rayonTube,rayonTube, hauteur, nbPtsCercle, nbPtsGenera, bolOuvert, theta0, thetaLg, coulEquipe, 1, false,30);
  Cylindre.position.set(Cylindre.position.x,Cylindre.position.y-hauteur/2,Cylindre.position.z)
  Tore.position.set(Tore.position.x-2*rayonTube,Tore.position.y,Tore.position.z)
  
  Poignee.add(Tore);
  Poignee.add(Cylindre);

  hauteurTore=Math.sin(Math.PI/4)*(3*rayonTube)-(Math.sin(Math.PI/4)*rayonTube);
  Poignee.rotateX(3/2*Math.PI);
  Poignee.rotateZ(2*Math.PI);
  Poignee.position.set(rayonTube,rayonTube,0);

  let SuitePoignee1=CylindreF(rayonTube,rayonTube, hauteur, nbPtsCercle, nbPtsGenera, bolOuvert, theta0, thetaLg, coulEquipe, 1, false,30);
  let SuitePoignee2=ToreF(rayonCentre,rayonTube, 50, 50, lgArc, coulEquipe, 1, false,30);
  let SpherePoignee=SphereF(rayonTube, 50, 50, 0, 2*Math.PI, 0,Math.PI/2, coulEquipe, 1, false,30);
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

  BasePierre.rotateY(Math.PI/2);

  return BasePierre;
}

//********************************************************
 //
 //  FIN PIERRE
 //
 //********************************************************



 //********************************************************
 //
 //  INITIALISATION DU TERRAIN
 //
 //********************************************************


function initTerrain(scene){
  let Sol=PlanF(100,100,20,20,0xAAAAAA,5);
  scene.add(Sol);
  Sol.position.set(0,0,-0.01);
  let P0=new THREE.Vector3((8.5/2)/2,(73/2)/2,0);
  let P1=new THREE.Vector3((-8.5/2)/2,(73/2)/2,0);
  let P2=new THREE.Vector3((8.5/2)/2,(-73/2)/2,0);
  let P3=new THREE.Vector3((-8.5/2)/2,(-73/2)/2,0);
  tabPoints=[P0,P1,P3,P2,P0];
  let CourbeSol=CourbeF(tabPoints,0x222222,3);
  scene.add(CourbeSol);
  let Terrain=PlanF(8.5/2,73/2,20,20,0xFFFFFF,30);
  scene.add(Terrain);

  let Maison1=Maison();
  scene.add(Maison1);
  let Maison2=Maison();
  Maison2.position.set(0,-Maison2.position.y,0.01);
  scene.add(Maison2);

}

function Maison(){
  let rayon=3/16;
  rayon=rayon*1.1;
  let Cercle1=CercleF(rayon,50,0,2*Math.PI,0xFFFFFF,30);
  Cercle1.position.set(0,0,0.01);

  rayon=rayon*2.1;
  let Cercle2=CercleF(rayon,50,0,2*Math.PI,0xFF0000,30);
  Cercle2.position.set(0,0,0.005);

  rayon=rayon*1.9;
  let Cercle3=CercleF(rayon,50,0,2*Math.PI,0xFFFFFF,30);
  Cercle3.position.set(0,0,0.0025);

  rayon=rayon*1.5;
  let Cercle4=CercleF(rayon,50,0,2*Math.PI,0x0000FF,30);
  Cercle4.position.set(0,0,0.001);

  let Maison=new THREE.Group();
  Maison.add(Cercle1);
  Maison.add(Cercle2);
  Maison.add(Cercle3);
  Maison.add(Cercle4);
  Maison.position.set(0,(-(73/2)/2)+5,0.01);

  return Maison;
}

 //********************************************************
 //
 //  FIN DU TERRAIN
 //
 //********************************************************


 //********************************************************
 //
 //  CREATION BALAIS
 //
 //********************************************************

function BalaisF(){
  let rcone=0.1/10;
  let lcone=0.3/8;

  let larg=0.4/2;
  let haut=0.1/2;
  let prof=0.3;

  let Balais=new THREE.Group();

  let Rectangle=ParalleliF(larg,haut,prof,0x582900,false,1/2,3);
  Rectangle.rotateX(Math.PI/2);
  Rectangle.rotateY(Math.PI/2);
  Rectangle.position.set(Rectangle.position.x+prof/2,Rectangle.position.y-larg/2,Rectangle.position.z+haut/2+lcone);

  let rayonTube=(1/12)/4;
  let rayonCentre=rayonTube*2;
  let lgArc=Math.PI/4;

  let Tore=ToreF(rayonCentre,rayonTube, 50, 10, lgArc, 0x582900, 1, false,3);
  Tore.position.set(Tore.position.x+prof/2,Tore.position.y+rayonCentre-larg/2,Tore.position.z+haut+lcone);
  Tore.rotateX(Math.PI/2);
  Tore.rotateY(-Math.PI/2);
  Balais.add(Tore);

  let hautManche=1.5;
  let Manche=CylindreF(rayonTube,rayonTube, hautManche, 50, 2, false, 0, 2*Math.PI, 0x582900, 1/2, false,3);
  Manche.rotateX(Math.PI/4);
  hautMancheR=Math.sin(Math.PI/4)*hautManche;         //Hauteur du manche après rotation (l'axe central touche le sol)
  hautMancheRcompl=Math.sin(Math.PI/4)*rayonTube;
  longMancheR=Math.cos(Math.PI/4)*hautManche;         //Longueur du manche après rotation
  longMancheRcompl=Math.cos(Math.PI/4)*rayonTube;
  hauteurTore=Math.sin(Math.PI/4)*(3*rayonTube)-(Math.sin(Math.PI/4)*rayonTube);    //Hauteur du Tore
  Manche.position.set(0,longMancheR/2+longMancheRcompl,hautMancheR/2+hautMancheRcompl);
  Manche.position.set(Manche.position.x+prof/2,Manche.position.y-larg/2-0.0028,Manche.position.z+haut+lcone+hauteurTore/2);
  Balais.add(Manche);

  lesPoils = [];
  for(let j=-lcone/2;j>-larg;j=j-lcone/2)
  for(let i=2*rcone;i<prof;i=i+2*rcone)
  {
  let Poil=ConeF(rcone,0,lcone,50,false,0,Math.PI*2,0x000000,false,1/2,1);
  Poil.rotateX(Math.PI/2);
  Poil.position.set(Poil.position.x+i,Poil.position.y+j,Poil.position.z+lcone/2);
  lesPoils.push(Poil);
  Balais.add(Poil);
  }
  Balais.add(Rectangle);
  Balais.rotateZ(Math.PI/2);

  return Balais;
}



 //********************************************************
 //
 //  FIN BALAIS
 //
 //********************************************************
