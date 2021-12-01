const borneVue=6;//amplitude de deplacement de la camera

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
 
  let r= 3/4;                //Rayon de la pierre
  let coulPierre=0x777777;
  let haut=0.30;
  /*let P0=new THREE.Vector3( 0, 3*haut/2, 0 );
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

  let Lathe=latheBezCub(50, 50, ptTab, coulPierre, 1/2, false);
  Lathe.position.set(Lathe.position.x,Lathe.position.y+r,0);
  Lathe.rotateX(1/2*Math.PI);
  scene.add(Lathe);
  let Lathe2=latheBezCub(50, 50, ptTab2, coulPierre, 1/2, false);
  Lathe2.position.set(Lathe2.position.x,Lathe2.position.y+r,0);
  Lathe2.rotateX(1/2*Math.PI);
  scene.add(Lathe2);
  let Lathe3=latheBezQuad(50, 50, ptTab3, coulPierre, 1/2, false);
  Lathe3.position.set(Lathe3.position.x,Lathe3.position.y+r,0);
  Lathe3.rotateX(1/2*Math.PI);
  scene.add(Lathe3);*/
  PierreF(r,coulPierre,haut,scene);

  

  //let LatheCSG=new ThreeBSP(Lathe);
  //let LatheCSG2=new ThreeBSP(Lathe2);
  //let LatheCSG3=new ThreeBSP(Lathe3);
  //let Pierre=LatheCSG.union(LatheCSG2);
  //let Pierre=Pierre.union(LatheCSG3);



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
   this.cameraxDir = 0;//camera.getWorldDirection().x;
   this.camerayDir = 0;//camera.getWorldDirection().y;
   this.camerazDir = 0;//camera.getWorldDirection().z;
   this.cameraFar = 100; //distance du plan le plus loin
   this.cameraNear = 0.1; //distance du plan le plus proche
   this.cameraFov = 90;// angle de vision de 90°

   //pour actualiser dans la scene   
   this.actualisation = function () {
    posCamera();
    reAffichage();
   }; // fin this.actualisation
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
 
  }, 200);// fin setTimeout(function ()
    // render avec requestAnimationFrame
  rendu.render(scene, camera);
 }// fin fonction reAffichage()
 
 
  function renduAnim() {
    stats.update();
    // render avec requestAnimationFrame
    requestAnimationFrame(renduAnim);
// ajoute le rendu dans l'element HTML
    rendu.render(scene, camera);
  }
 
} // fin fonction init()