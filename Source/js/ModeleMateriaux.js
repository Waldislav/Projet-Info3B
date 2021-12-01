// primitive avec Phong
function surfPhong(geom,coulD,transpa,bolTrans,coulSpe){ 
 let Material = new THREE.MeshPhongMaterial({
   color: coulD,
   opacity: transpa,
   transparent: bolTrans,
   //     wireframe: false,
   specular:coulSpe, 
   flatShading: true,
   side: THREE.DoubleSide,
 });
 let maillage = new THREE.Mesh(geom,Material);
 return maillage;
}//fin fonction surfPhong

//insensible a la lumiere
function surfMateriauBasic(geom,coul){
 let Materiau = new THREE.MeshBasicMaterial({color: coul});
 let maillage = new THREE.Mesh(geom,Materiau);
 return maillage; 
} //fin fonction surfMateriauBasic

//Gouraud
function surfGouraud(geom,coul){
 let Materiau = new THREE.MeshLambertMaterial({color: coul});
 let maillage = new THREE.Mesh(geom,Materiau);
 return maillage; 
 
}// fin fonction surfGouraud

  // primitive en fil de fer
function surfFilDeFer(ObjetGeometrique,coul,tailleFil) {
 let ProprieteFilDeFer = new THREE.MeshBasicMaterial({
  color:coul,
  wireframeLinewidth: tailleFil
 });
 ProprieteFilDeFer.wireframe = true;
 let maillage = new THREE.Mesh(ObjetGeometrique, ProprieteFilDeFer);
 return maillage;
 }// fin fonction surfFilDeFer

function Plan(largPlan,hautPlan,nbSegmentLarg,nbSegmentHaut,coulPlan,){
      let largPlan = 25;
      let hautPlan = 25;
      let nbSegmentLarg= 30;
      let nbSegmentHaut= 30;
      let planGeometry = new THREE.PlaneGeometry(largPlan, hautPlan, nbSegmentLarg, nbSegmentHaut);
      let MaterialPhong= new THREE.MeshPhongMaterial({
      color: "#FF0000",
      opacity: 1,
      transparent: false,
      emissive: 0x000000, 
      specular: "#00FFFF",
      flatShading: true,
      shininess:30,        
      side:THREE.DoubleSide
      });
      let planPhong = new THREE.Mesh(planGeometry, MaterialPhong);
      planPhong.castShadow=true;
      planPhong.receiveShadow= true;
      return planPhong;
}