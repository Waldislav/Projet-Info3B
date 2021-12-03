const borneVue=30;//amplitude de deplacement de la camera
const PosInitial=new THREE.Vector3(0,-16.25,0);
const PosLancer=new THREE.Vector3(0,0,0); 





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
  let Pierre1=PierreF(true);
  let haut=Pierre1.position.z;  //permet de positionner le bas de la pierre sur un plan de coordonnée z=0 
  //tracePt(scene, PosInitial, 0xFF0000,0.1);
  //alert(Pierre1.position.z);
  Pierre1.position.set(0,PosInitial.y,haut);
  scene.add(Pierre1);
  let Balais1=BalaisF();
  //scene.add(Balais1);




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
    MouvementRectiligne(10);
  
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