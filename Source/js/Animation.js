var pasX=0;
var pasY=0.1;
var temps=0;
var verifie=true;
var finAnim=false;
var pasYb=0.1
var pasTheta=0;
var ordre=0;

function MouvBalai(Pierre,pas){
  pasTheta+=pasYb;
  Balai1.position.set(Balai1.position.x+Math.cos(8*Math.PI*pasTheta*pasYb)/128+Pierre.position.x/128,pas+0.3,Balai1.position.z);
  Balai2.position.set(Balai2.position.x+Math.sin(8*Math.PI*pasTheta*pasYb)/128+Pierre.position.x/128,pas+1,Balai2.position.z);
}

function MouvementRectiligne(Pierre,posX,posY,scene){
  temps+=1/60;
  if(temps==1/60)
    scene.add(Pierre);
  pasX=posX/39.5;
  //console.log("Le temps : "+temps);
  if(Pierre.position.y<=PosLancer.y){
    Pierre.position.set(Pierre.position.x+pasX,Pierre.position.y+pasY,haut)
  }
  else if(Pierre.position.y>PosLancer.y && Pierre.position.y<posY){
    pasY-=(0.1/((80+10*posY*2)+0.01));                            //  1/(800.01+100*pos*2)
    Pierre.position.set(Pierre.position.x+pasX,Pierre.position.y+pasY,haut);
    if(Pierre.position.y<10)
    MouvBalai(Pierre,Pierre.position.y+pasY);
    else{
      Balai1.position.set(-haut,PosLancer.y+0.3,0);
      Balai2.position.set(haut,PosLancer.y+1,0);
    }
  }
  if(Pierre.position.y>=posY-0.1 && Pierre.position.y<=posY+0.1){
    Balai1.position.set(-haut,PosLancer.y+0.3,0);
    Balai2.position.set(haut,PosLancer.y+1,0);
    ordre+=1
    temps=0;
    pasY=0.1;
    verifie=true;
  }

}
var c=0.005;

var t=0;
 function MouvementBezier(Pierre,tabPt1,tabPt2,scene,boolTrace){
  temps+=1/60;
  if(temps==1/60)
   scene.add(Pierre);
   let P0=tabPt1[0];
   let P1=tabPt1[1];
   let P2=tabPt1[2];

   let Q0=tabPt2[0];
   let Q1=tabPt2[1];
   let Q2=tabPt2[2];

   var aX=P0.x-2*P1.x+P2.x;
   var bX=2*(P1.x-P0.x);
   var aY=P0.y-2*P1.y+P2.y;
   var bY=2*(P1.y-P0.y)
   var cY=-16.25;

   var aX2=Q0.x-2*Q1.x+Q2.x;
   var bX2=2*(Q1.x-Q0.x);
   var cX2=Q0.x;
   var aY2=Q0.y-2*Q1.y+Q2.y;
   var bY2=2*(Q1.y-Q0.y)
   var cY2=Q0.y;
  
  let bez=TraceBezierQuadratique(tabPoints1, 50, 0xFF0000, 3);
  let bez2=TraceBezierQuadratique(tabPoints2, 50, 0xFF0000, 3);

  if(boolTrace){
    scene.add(bez);
    scene.add(bez2);
    tracePt(scene, P0, 0x0000FF,0.01);
    tracePt(scene, P1, 0x0000FF,0.01);
    tracePt(scene, P2, 0x0000FF,0.01);
    tracePt(scene, Q1, 0x0000FF,0.01);
    tracePt(scene, Q2, 0x0000FF,0.01);
  }
  
   if(Pierre.position.y<P2.y){
    t+=0.005;
    Pierre.position.set(aX*t*t+bX*t,aY*t*t+bY*t+cY,haut)
    if(Pierre.position.y>=-4)
      MouvBalai(Pierre,aY*t*t+bY*t+cY);
  }
  else if(Pierre.position.y>=Q0.y && Pierre.position.y<Q2.y){
    if(verifie){
      t=0;
      verifie=!verifie;
    }
    if(Pierre.position.y<=10)
      MouvBalai(Pierre,aY2*t*t+bY2*t+cY2);
    else{
      Balai1.position.set(-haut,PosLancer.y+0.3,0);
      Balai2.position.set(haut,PosLancer.y+1,0);
    }
    Pierre.position.set(aX2*t*t+bX2*t+cX2,aY2*t*t+bY2*t+cY2,haut);
    c-=0.000012468;
    t+=c;                          //  1/(800.01+100*pos*2)
  }
  if(Pierre.position.y>=Q2.y-0.1 && Pierre.position.y<=Q2.y+0.1){
    Balai1.position.set(-haut,PosLancer.y+0.3,0);
    Balai2.position.set(haut,PosLancer.y+1,0);
    ordre+=1
    temps=0;
    t=0;
    c=0.005;
    verifie=true;
  }

 }

function Choc(Pierre1,Pierre2){
  let r= (3/4)/4; 
  if(Pierre1.position.y+r*2+Pierre1.position.x+r*2==Pierre2.position.y)
    console.log("ouias");
}

