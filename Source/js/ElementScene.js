//********************************************************
 //
 //  CREATION PIERRE
 //
 //********************************************************

 function PierreF(r,coulPierre,haut,scene){

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

  let Lathe=latheBezCub(50, 100, ptTab, coulPierre, 1/2, false);
  let latheGeometry=Lathe.geometry;
  let Lathe2=latheBezCub(50, 100, ptTab2, coulPierre, 1/2, false);
  let latheGeometry2=Lathe2.geometry;	
  //scene.add(Lathe2);
  let Lathe3=latheBezQuad(50, 100, ptTab3, coulPierre, 1/2, false);
  let latheGeometry3=Lathe3.geometry;
  THREE.GeometryUtils.merge(latheGeometry2,latheGeometry3);
  THREE.GeometryUtils.merge(latheGeometry,latheGeometry);

  var totalGeom = new THREE.Geometry();

  let BasePierre=surfPhong(latheGeometry2,coulPierre,true,0.5,coulPierre);
  BasePierre.rotateX(1/2*Math.PI);
  BasePierre.position.set(BasePierre.position.x,BasePierre.position.y+r,0+3*haut/2);
  BasePierre.updateMatrix(); 
  totalGeom.merge(BasePierre.geometry, BasePierre.matrix);
  let LatheInter=surfPhong(latheGeometry,0xFF0000,true,0.5,0xFF0000);
  LatheInter.rotateX(1/2*Math.PI);
  LatheInter.position.set(LatheInter.position.x,LatheInter.position.y+r,0+3*haut/2);
  LatheInter.updateMatrix(); 
  totalGeom.merge(LatheInter.geometry, LatheInter.matrix);
  var materiaux=[];
  materiaux.push(BasePierre.material);
  materiaux.push(LatheInter.material);
  var total = new THREE.Mesh(totalGeom, new THREE.MeshFaceMaterial(materiaux));
  var total2=_mergeMeshes([BasePierre,LatheInter], true);
  //total.rotateX(1/2*Math.PI);
  total2.position.set(0,1,0);
  //total2.position.set(total2.position.x,total2.position.y,0);
  //scene.add(BasePierre);
  //scene.add(LatheInter);
  scene.add(total2);
  //BasePierre.rotateX(1/2*Math.PI);
  //BasePierre.position.set(BasePierre.position.x,BasePierre.position.y+r,0);
  //scene.add(BasePierre);
  //scene.add(LatheInter);
  return total;
  //scene.add(Lathe3);
  

  //let LatheCSG=new ThreeBSP(BasePierre);
  //let LatheCSG2=new ThreeBSP(LatheInter);
  //let Pierre=LatheCSG.union(LatheCSG2);
  //let Pierre=Pierre.union(LatheCSG3);

  //PierreGeo = Pierre.toMesh();
  /*PierreGeo.castShadow = true;
  PierreGeo.receiveShadow = true;
  PierreGeo.material = MateriauPhong("#009999",1,true,"#FFFF00");*/

  //scene.add(PierreGeo);
  //return PierreGeo;
  //return None;
}