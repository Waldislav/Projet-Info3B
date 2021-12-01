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
  
  BasePierre = new THREE.Group();
  BasePierre.add(Lathe1);
  BasePierre.add(Lathe2);
  BasePierre.add(Lathe3);
  BasePierre.rotateX(1/2*Math.PI);
  BasePierre.position.set(BasePierre.position.x+r,BasePierre.position.y+r,BasePierre.position.z+3*haut/2);
  
  scene.add(BasePierre);
  return BasePierre;
}