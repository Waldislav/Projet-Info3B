const borneVue=30;//amplitude de deplacement de la camera
const PosInitial=new THREE.Vector3(0,-16.25,0);
const PosLancer=new THREE.Vector3(0,-4,0); 

let Pierre1=PierreF(true);
var haut=Pierre1.position.z;  //permet de positionner le bas de la pierre sur un plan de coordonnée z=0 
let Balai1=BalaisF();
let Balai2=BalaisF();

let tabPierreR = [];
  for(var i=0;i<5;i++){
    let Pierre=PierreF(true);
    Pierre.position.set(0,PosInitial.y,haut);
    tabPierreR.push(Pierre);
  }

  let tabPierreB = [];
  for(var i=0;i<5;i++){
    let Pierre=PierreF(false);
    Pierre.position.set(0,PosInitial.y,haut);
    tabPierreB.push(Pierre);
  }


function init(){
 var stats = initStats();
    // creation de rendu et de la taille
 let rendu = new THREE.WebGLRenderer({ antialias: true });
 rendu.shadowMap.enabled = true;
 let scene = new THREE.Scene();   
 let camera = new THREE.PerspectiveCamera(20, window.innerWidth / window.innerHeight, 0.1, 100);
 rendu.shadowMap.enabled = true;
 rendu.setClearColor(new THREE.Color(0xFFFFFF));
 rendu.setSize(window.innerWidth*.9, window.innerHeight*.9);
 cameraLumiere(scene,camera);
 lumiere(scene);
 repere(scene);

 //********************************************************
 //
 //  P A R T I E     G E O M E T R I Q U E
 //
 //********************************************************
 
  initTerrain(scene);   
  
  //tracePt(scene, PosInitial, 0xFF0000,0.1);
  //alert(Pierre1.position.z);
  Pierre1.position.set(0,PosInitial.y,haut);
  Balai1.position.set(Balai1.position.x-haut,Balai1.position.y+PosLancer.y+0.3,Balai1.position.z);
  Balai2.rotateZ(Math.PI);
  Balai2.position.set(Balai2.position.x+haut,Balai2.position.y+PosLancer.y+1,Balai2.position.z);
  //scene.add(Pierre1);
  scene.add(Balai1);
  scene.add(Balai2);

  let A=new THREE.Vector3(0,0,0.1);
  let B=new THREE.Vector3(-0.5,-6,0.1);
  let C=new THREE.Vector3(0.5,6,0.1);
  let Fin=new THREE.Vector3(0,16,0.1);
  let Fin2=new THREE.Vector3(1,14.5,0.1);
  let Fin3=new THREE.Vector3(0.75,12,0.1);
  let B2=new THREE.Vector3(1,-4,0.1);
  let C2=new THREE.Vector3(-1,4,0.1);
  tabPoints1=[PosInitial,B,A];
  tabPoints2=[A,C,Fin];
  tabPoints3=[A,C,Fin2];
  tabPoints4=[PosInitial,B2,A];
  tabPoints5=[A,C2,Fin3];

  let bez=TraceBezierQuadratique(tabPoints1, 50, 0xFF0000, 3);
  //scene.add(bez);
  let bez2=TraceBezierQuadratique(tabPoints2, 50, 0xFF0000, 3);
  //scene.add(bez2);



 //********************************************************
 //
 // F I N      P A R T I E     G E O M E T R I Q U E
 //
 //********************************************************
 
 //********************************************************
 //
 //  D E B U T     M E N U     G U I
 //
 //********************************************************

 var gui = new dat.GUI();//interface graphique utilisateur
  // ajout du menu dans le GUI
 let menuGUI = new function () {
   this.cameraxPos = camera.position.x;
   this.camerayPos = camera.position.y;
   this.camerazPos = camera.position.z;
   this.cameraZoom = 1;
   //pb avec camera lockAt
   this.cameraxDir = PosInitial.x;//camera.getWorldDirection().x;
   this.camerayDir = PosInitial.y;//camera.getWorldDirection().y;
   this.camerazDir = 1;//camera.getWorldDirection().z;
   this.cameraFar = 100; //distance du plan le plus loin
   this.cameraNear = 0.1; //distance du plan le plus proche
   this.cameraFov = 90;// angle de vision de 90°

   //pour actualiser dans la scene   
   this.actualisation = function () {
    posCamera();
    reAffichage();
   }; // fin this.actualisation
   this.Scene1=function(){
    this.cameraxPos = 0;
    this.camerayPos = -26;
    this.camerazPos = 2;
    this.cameraZoom = 1;
    this.cameraxDir = 0;
    this.camerayDir = PosInitial.y;
    this.camerazDir = 1;
    camera.position.set(0,-26,2);
    camera.lookAt(0,-16,1);
   }

   this.Scene2=function(){
    this.cameraxPos = 15;
    this.camerayPos = 25;
    this.camerazPos = 10;
    this.cameraZoom = 1;
    this.cameraxDir = 0;
    this.camerayDir = 0;
    this.camerazDir = 0;
    camera.position.set(15,25,10);
    camera.lookAt(0,0,0);
   }

   this.Scene3=function(){
    this.cameraxPos = 15;
    this.camerayPos = 25;
    this.camerazPos = 10;
    this.cameraZoom = 1;
    this.cameraxDir = 0;
    this.camerayDir = 0;
    this.camerazDir = 0;
    camera.position.set(15,-25,10);
    camera.lookAt(0,0,0);
   }
   this.Scene4=function(){
    this.cameraxPos = 0;
    this.camerayPos = 15;
    this.camerazPos = 30;
    this.cameraZoom = 1;
    this.cameraxDir = 0;
    this.camerayDir = 13.5;
    this.camerazDir = 0;
    camera.position.set(0,15,30);
    camera.lookAt(0,13.5,0);
   }
 }; // fin de la fonction menuGUI
 // ajout de la camera dans le menu
 ajoutCameraGui(gui,menuGUI,camera)
 // ajout du choix de la courbe
 // ne pas oublier de definir this.choixCbe

 function posCamera(){
  camera.position.set(menuGUI.cameraxPos*testZero(menuGUI.cameraZoom),menuGUI.camerayPos*testZero(menuGUI.cameraZoom),menuGUI.camerazPos*testZero(menuGUI.cameraZoom));
  camera.lookAt(menuGUI.cameraxDir,menuGUI.camerayDir,menuGUI.camerazDir);
  actuaPosCameraHTML();
 }

 
 
 //ajout du menu pour actualiser l'affichage 
 gui.add(menuGUI, "actualisation");
  //gui.addFolder("Test");
 menuGUI.actualisation();
 //********************************************************
 //
 //  F I N     M E N U     G U I
 //
 //********************************************************
 renduAnim();
 
 
  // ajoute le rendu dans l'element HTML
 document.getElementById("webgl").appendChild(rendu.domElement);
   
  // affichage de la scene
 rendu.render(scene, camera);

 function reAffichage() {
  setTimeout(function () {
    switch(ordre){
      case 0 : MouvementBezier(tabPierreB[0],tabPoints1,tabPoints2,scene,false);break;
      case 1 : MouvementRectiligne(tabPierreR[0],-0.1,13.25,scene);break;
      case 2 : MouvementRectiligne(tabPierreB[1],0.05,14,scene);break;
      case 3 : MouvementBezier(tabPierreR[1],tabPoints1,tabPoints3,scene,false);break;
      case 4 : MouvementBezier(tabPierreB[2],tabPoints4,tabPoints5,scene,false);break;
      case 5 : MouvementRectiligne(tabPierreR[2],0,13.5,scene);break;
      //case 6 : MouvementRectiligne(tabPierreB[3],-0.1,13.25,scene); Choc(tabPierreB[3],tabPierreR[0]); break;
    }
  }, 1000);// fin setTimeout(function ()
    // render avec requestAnimationFrame
  rendu.render(scene, camera);
 }// fin fonction reAffichage()
 
 
  function renduAnim() {
    stats.update();
    reAffichage();
    // render avec requestAnimationFrame
    requestAnimationFrame(renduAnim);
// ajoute le rendu dans l'element HTML
    rendu.render(scene, camera);
  }
 
} // fin fonction init()