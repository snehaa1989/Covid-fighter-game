function loadImages(){
   v1_image=new Image();
   v1_image.src="assets/v1.png";
   v2_image=new Image();
   v2_image.src="assets/v2.png";
   player_image=new Image();
   player_image.src="assets/superhero.png";
   gem_image=new Image();
   gem_image.src="assets/gemm.png";
}

function init(){
//objects
canvas=document.getElementById("mycanvas");
W=700;
H=400;
canvas.width=W;
canvas.height=H;
game_over=false;
win=false;

pen=canvas.getContext('2d');
 e1={
    x:150,
    y: 50,
    w: 60,
    h: 60,
    speed:20
};
e2={
    x:300,
    y: 50,
    w: 60,
    h: 60,
    speed:30
};
e3={
    x:450,
    y: 50,
    w: 60,
    h: 60,
    speed:40
};
enemy=[e1,e2,e3];
player={
x:20,
y:H/2,
w:60,
h:60,
speed:20,
moving:false,
score:1000

};
gem={
  x:W-100,
  y:H/2,
  w:60,
  h:60
};
//mouse click
canvas.addEventListener('mousedown',function(){
player.moving=true;
player.score+=20;
});
canvas.addEventListener('mouseup',function(){
    player.moving=false;
    });
}
function isoverlap(rect1,rect2)
{
    if (rect1.x < rect2.x + rect2.w &&
        rect1.x + rect1.w > rect2.x &&
        rect1.y < rect2.y + rect2.h &&
        rect1.y + rect1.h > rect2.y) {
         return true;
     } 
   return false;
}

function draw(){
    pen.clearRect(0,0,W,H);
    pen.drawImage(player_image,player.x,player.y,player.w,player.h);
    pen.drawImage(gem_image,gem.x,gem.y,gem.w,gem.h);
    pen.drawImage(v1_image,e1.x,e1.y,e1.w,e1.h);
    pen.drawImage(v2_image,e2.x,e2.y,e2.w,e2.h);
    pen.drawImage(v1_image,e3.x,e3.y,e3.w,e3.h);
    pen.fillStyle="white";
    pen.fillText("SCORE "+ player.score,10,10);

}
function update()
{   
    if(isoverlap(player,gem))
    {
        win=true;
    }
    for(var i=0;i<enemy.length;i++)
    {
        if(isoverlap(player,enemy[i]))
        {
            player.score-=50;
            if(player.score<=0)
            {
                game_over=true;
                break;
            }
        }
    }

    if(player.moving==true){
        player.x+=player.speed;
    }
  for(var i=0;i<enemy.length;i++){
   enemy[i].y+=enemy[i].speed;
   if(enemy[i].y>=H-enemy[i].h || enemy[i].y<0)
   {
       enemy[i].speed*=-1;
   }}
   
}
function gameloop(){
    if(game_over==true)
    {  
       alert("YOU TOUCHED THE VIRUS :( your score is " + player.score);
       clearInterval(f);
    }
    if(win==true)
    {
        alert("CONGRATULATIONS! YOU WON!!! score is " + player.score);
       clearInterval(f);
    }
   draw();
   update();
}
loadImages();
init();
var f=setInterval(gameloop,100);