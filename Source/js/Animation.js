var pas=0.1;

var temps=0;
var verifie=true;

function MouvementRectiligne(pos){
  temps+=1/60;
  //console.log("Le temps : "+temps);
  if(Pierre1.position.y<=-4){
    Pierre1.position.set(0,Pierre1.position.y+pas,haut)
  }
  else if(Pierre1.position.y>-4 && Pierre1.position.y<pos){
    pas-=(0.1/286.02);
    Pierre1.position.set(0,Pierre1.position.y+pas,haut);
  }
  if(Pierre1.position.y>=pos-0.1 && Pierre1.position.y<=pos+0.1 && verifie){
    console.log("Le temps : "+temps);
    Pierre1.position.set(0,pos,haut);
    verifie=!verifie;
  }
 }

