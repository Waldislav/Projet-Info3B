//********************************************************
 //
 //  CREATION PIERRE
 //
 //********************************************************


 function PierreF(r,coulPierre,haut,scene,equipe){
  
  let coulEquipe;
  if(equipe)
    coulEquipe=0xFF0000;
  else
    coulEquipe=0x0000FF;

  let P0=new THREE.Vector3( 0, 3*haut/2, 0 );
  let P1=new THREE.Vector3( r/2, 3*haut/2, 0 );
  let P2=new THREE.Vector3( r, 3*haut/2, 0 );
  let P3=new THREE.Vector3( r, haut/2, 0 );
  /*tracePt(scene, P0, 0xFF0000,0.01);
  tracePt(scene, P1, 0xFF0000,0.01);
  tracePt(scene, P2, 0xFF0000,0.01);
  tracePt(scene, P3, 0xFF0000,0.01);
  */

  let R0=new THREE.Vector3(r,0,0);
  let R1=new THREE.Vector3(r, -haut/2, 0);

  //tracePt(scene, R0, 0xFF0000,0.01);
  //tracePt(scene, R1, 0xFF0000,0.01);

  let Q1=new THREE.Vector3(r,-3*haut/2,0);
  let Q2=new THREE.Vector3(r/2,-3*haut/2,0);
  let Q3=new THREE.Vector3(0,-3*haut/2,0);

  //tracePt(scene, Q1, 0xFF0000,0.01);
  //tracePt(scene, Q2, 0xFF0000,0.01);
  //tracePt(scene, Q3, 0xFF0000,0.01);

  let ptTab=[P0,P1,P2,P3];
  let ptTab2=[R1,Q1,Q2,Q3];
  let ptTab3=[P3,R0,R1];

  let Lathe1=latheBezCub(50, 100, ptTab, coulEquipe, 1/2, false);
  let Lathe2=latheBezQuad(50, 100, ptTab3, coulPierre, 1/2, false);
  let Lathe3=latheBezCub(50, 100, ptTab2, coulPierre, 1/2, false);

  /*let bez1=TraceBezierCubique(ptTab, 50, 0x0000FF, 0.01);
  scene.add(bez1);
  let bez2=TraceBezierCubique(ptTab2, 50, 0x0000FF, 0.01);
  scene.add(bez2);
  let bez3=TraceBezierQuadratique(ptTab3, 50, 0x0000FF, 0.01);
  scene.add(bez3);*/

  rayonCentre=1/2;
  rayonTube=1/4;
  lgArc=Math.PI/4;


  segment(scene,P0,P1,coulPierre,0.1);
  let Tore=Tore(rayonCentre,rayonTube, 50, 50, lgArc, coul, 1/2, true);
  //cene.add(Tore);

  
  BasePierre = new THREE.Group();
  BasePierre.add(Lathe1);
  BasePierre.add(Lathe2);
  BasePierre.add(Lathe3);
  BasePierre.rotateX(1/2*Math.PI);
  BasePierre.position.set(BasePierre.position.x+r,BasePierre.position.y+r,BasePierre.position.z+3*haut/2);
  
  //scene.add(BasePierre);
  return BasePierre;
}