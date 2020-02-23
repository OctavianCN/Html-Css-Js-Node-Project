//Canvas
var canvas; 
var context; 
//Delta Time
const perfectFrameTime = 1000 / 60;
let deltaTime = 0;
let lastTimestamp = 0;
let FrameCount=0; 
let MaxFrame=15;
//Background
var video; 
var SettingsBackground; 
//Audio
var audio;
//Buttons
var PlayButton;
var OptionsButton;
var LevelsButton;
var BackButton
//Mouse Coord
var MouseX; 
var MouseY;
//Indicators
var ArrowIndicator;
//Status
var FillX,FillY,FillW,FillH;
var Fill;
var InMenu;
var InSettings;
var InGame;
var InLevels;
var InLevel1; 
var InLevel2; 
var InLevel3;
//Settings 
var RangeVolume;
var InputName; 
var InputRadio;
//Characters Images 
var MainCh1;
var MainCh2; 
var MainCh3; 
//Player Character
var PlayerChMediaSource;
//Level Maps
//Level 1 Objects
var Walls; 
var Floor; 
var Bed; 
var Chest;  
var Door1;
var Door2;
var key2;
var InGameFrameCount;
var FirePlace;
var Level1Map=[
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,2,0,0,1,0,1,0,0,0,0,0,0,0,0,0,1,0,3,1],
    [1,0,0,0,1,0,1,0,1,1,1,1,1,0,0,0,0,7,0,1],
    [1,0,0,0,1,0,0,0,1,9,2,0,1,0,0,0,1,0,1,1],
    [1,0,5,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,1],
    [1,1,4,1,1,0,1,0,1,1,10,1,1,0,0,0,1,0,0,1],
    [1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1],
    [1,8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,6,1,1,1,1,1,1,1,1,1,1],
];
//Level 2 Objects
var Grass;
var Tree;
var Gate;
var Fence; 
var Fence2;
var Car1;
var Car2;
var Level2Map=[
    [0,0,0,0,0,0,0,0,0,0,0,5,0,0,0,0,0,0,0,0],
    [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
    [0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0],
    [0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0],
    [0,1,0,1,0,0,0,1,0,0,0,0,0,0,0,0,1,0,1,0],
    [0,1,0,1,0,1,0,0,0,1,0,1,0,1,0,0,1,0,1,0],
    [0,1,3,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0],
    [0,1,0,0,6,0,4,0,0,0,0,0,0,0,0,0,0,0,1,0],
    [0,1,3,2,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
];
//Story
var InitialStoryDiv;
var GameIntroFinished;
var GameIntroDeleted;
var GameIntroEverPlayed;
var letter;
var DialogueBox;
var InDialogue;
var IndexDialogueArray;
var OnDialogueEvent;
var WriteText;
var StaticL1Doors;
var DialogueArray = [
                    "blblabbdvfdlmdfkbmdflbmdflkb",
                    "blblabbdvfdlmdfkbmaaaaaaaaadflbmdflkb",
                    "blblabbdvfdlmdfkbmdfaasdsadsffdsfsfdsfslbmdflkb",
                    "aaaa",
                    "stop",
                    "aaaaaaaabbbb",
                    "stop",
                    "aaaaa"

                 ];
//Characters 
var player;
var TheDog; 

//Classes
class Imagine
{
    constructor(MediaSource) {
        this.Img=new Image(); 
        this.Img.src=MediaSource;
    }
    SetPositions(x,y){
        this.x=x;
        this.y=y;
    }
    SetDimensions(w,h){
        this.w=w;
        this.h=h;
    }
    SetNrInMap(nr)
    {
        this.NrInMap=nr;
    }
}
class GameObject extends Imagine{
    constructor(MediaSource)
    {
        super(MediaSource);
        this.PosInImgX=0;
        this.PosInImgY=0;
    }
    SetFrameWH(nrW,nrH)
    {
        this.FrameWidth=this.Img.naturalWidth/nrW;
        this.FrameHeigth=this.Img.naturalHeight/nrH
    }
}
class Player extends Imagine{
    
    constructor(MediaSource){
        super(MediaSource);
        this.health=100; 
        this.speed=10; 
        this.CanMove=true;
        this.FrameWidthDim=this.Img.naturalWidth/3;
        this.FrameHeightDim=this.Img.naturalHeight/4;
        this.CurrentFrameW=0; 
        this.CurrentFrameH=0; 
    }
    Move(event)
    {
        if(player.CanMove==true)
        {
            let PlayerNextX=this.x; 
            let PlayerNextY=this.y;
            FrameCount++; 
            if(FrameCount>=3)
            {
                if(event.keyCode==83)//w
                {
                        //this.y+=this.speed*deltaTime; 
                        PlayerNextY+=this.speed*deltaTime;
                        this.CurrentFrameH=0;
                        if((this.CurrentFrameW+this.FrameWidthDim)<this.Img.naturalWidth)
                            this.CurrentFrameW+=this.FrameWidthDim;
                        else
                            this.CurrentFrameW=0;
          
                }
                if(event.keyCode==65)//a
                {
                    //this.x-=this.speed*deltaTime;
                    PlayerNextX-=this.speed*deltaTime;
                    this.CurrentFrameH=this.FrameHeightDim;
                    if((this.CurrentFrameW+this.FrameWidthDim)<this.Img.naturalWidth)
                        this.CurrentFrameW+=this.FrameWidthDim;
                    else
                        this.CurrentFrameW=0;
                }   
                if(event.keyCode==87)//s
                {
                    //this.y-=this.speed*deltaTime;
                    PlayerNextY-=this.speed*deltaTime;
                    this.CurrentFrameH=3*this.FrameHeightDim;
                    if((this.CurrentFrameW+this.FrameWidthDim)<this.Img.naturalWidth)
                        this.CurrentFrameW+=this.FrameWidthDim;
                    else
                        this.CurrentFrameW=0; 
                }
                if(event.keyCode==68)//d
                {
                    //this.x+=this.speed*deltaTime;
                    PlayerNextX+=this.speed*deltaTime;
                    this.CurrentFrameH=2*this.FrameHeightDim;
                    if((this.CurrentFrameW+this.FrameWidthDim)<this.Img.naturalWidth)
                        this.CurrentFrameW+=this.FrameWidthDim;
                    else
                        this.CurrentFrameW=0;
                }
                if((ColisionLevel1(PlayerNextX,PlayerNextY,this.w,this.h)==false)&&(ColisionLevel2(PlayerNextX,PlayerNextY,this.w,this.h)==false))
                {
                    this.x=PlayerNextX; 
                    this.y=PlayerNextY;
                }
                this.lastKey=event.keyCode;
                FrameCount=0;
            }
        }
       
    }
    
}
class Letter extends Imagine{
    constructor(MediaSource1,MediaSource2)
    {
        super(MediaSource1); 
        this.read=false;
        this.NrInMap=5;
        this.ActualLetter=new Image(); 
        this.ActualLetter.src=MediaSource2;
        this.show=true;
        
    }
    SetActualLetterWH()
    {
        this.ActualLetterHeight=canvas.height;
        this.ActualLetterWidth=canvas.width/2;
        this.ActualLetterX=canvas.width/4; 
        this.ActualLetterY=0;
    }
    
}
class Door extends GameObject{
    constructor(MediaSource)
    {
        super(MediaSource);
        this.locked=true; 
    }
}
class Dog extends GameObject{
    constructor(MediaSource)
    {
        super(MediaSource);
        this.JobDone=false;
    }

}
class Key extends GameObject{
    constructor(MediaSource)
    {
        super(MediaSource);
        this.taken=false;
    }
}

window.onload=function(){
   
    canvas = document.getElementById('canvas'); 
    context = canvas.getContext('2d');
    video = document.getElementById('video'); //iau video-ul care este ascuns si  fac o copie a lui pe care o sa o afisez in canvas
    SetImages();
    InMenu=true;
    InSettings=false;
    InGame=false;
    InLevels=false;
    InLevel1=false; 
    InLevel2=false;
    InLevel3=false;
    canvas.width=1000;
    canvas.height=600;
    Fill=false;
    ImgDimPos();
    RangeVolume = document.createElement("INPUT");
    RangeVolume.setAttribute("type", "range");
    document.body.appendChild(RangeVolume);
    SetVolume(RangeVolume);
    InputName = document.createElement("INPUT");
    InputName.setAttribute("type", "text");
    InputName.setAttribute("value", "Player");
    document.body.appendChild(InputName);
    SetNamePos(InputName);
    InputRadio=document.getElementById("form");
    SetInputRadio(InputRadio);
    PlayerChMediaSource=MainCh1.Img.src;
    audio = document.createElement("AUDIO")
    document.body.appendChild(audio);
    audio.src = "/resurse/Audio/BackgroundAudio.mp3"
    audio.loop=true;
    document.body.addEventListener("mouseup", function () {
        audio.play()
    })
    GameIntroFinished=false;
    GameIntroDeleted=false;
    GameIntroEverPlayed=false;
    DialogueBox=document.getElementById("dialogue");
    InDialogue=false;
    IndexDialogueArray=0;
    OnDialogueEvent=false;
    WriteText=true;
    InGameFrameCount=0;

   // update();
   requestAnimationFrame(update);
    
}
function update(timestamp)
{
    requestAnimationFrame(update);
    deltaTime = (timestamp - lastTimestamp) / perfectFrameTime;
    lastTimestamp = timestamp;
    clear();
    CheckEvents();
    GameProgresStatus();
    draw();
    //requestAnimationFrame(function() { update(); });
}
function clear()
{
   
    if((GameIntroFinished==true)&&(GameIntroEverPlayed==true))
    {
        //InitialStoryDiv.removeChild(InitialStoryDiv.firstChild);
        if(GameIntroDeleted==false)
        { 
            InitialStoryDiv.removeChild(InitialStoryDiv.firstChild);
            InitialStoryDiv.parentNode.removeChild(InitialStoryDiv);
            GameIntroDeleted=true;
        }
       // InitialStoryDiv.paremoveChild(Paragraph);
    }
    context.clearRect(0, 0, canvas.width, canvas.height);
}
function draw() {
    
    
    if(InSettings==false)
    {
        RangeVolume.style.display="none";  
        InputName.style.display="none";  
        InputRadio.style.display="none";
    }
    if(InMenu==true)
    {
        DrawMenu();
    }
    else
    {
        if(InSettings==true)
        {
            
            DrawSettings();
        }    
        else
        {
            if(InGame==true)
            { //Inlevel2=true;
                //InLevel1=false;
                if(InLevel1==true)
                {
                    DrawLevel1();
                }
                else
                {
                    if(Inlevel2==true)
                    {
                        
                        DrawLevel2();
                    }
                }
            }
        }
    }
 
    audio.volume=RangeVolume.value/100;
    
}
function GameProgresStatus()
{
    if(InGame==true)
    {
        if(InLevel1==true)
        {
         ProgressStatusLevel1();
        }
         DialogueProgress();  
    }
}
function DialogueProgress()
{
    if(InDialogue==true)
          {
              DialogueBox.style.visibility="visible";
              player.CanMove=false;
              if(DialogueArray[IndexDialogueArray]=="stop")
              {
                InDialogue=false;
                IndexDialogueArray++;
              }
              else
              {
                  
                if(WriteText==true)
               {
                var Paragraph=document.createElement("P");
                Paragraph.innerHTML=DialogueArray[IndexDialogueArray];
                Paragraph.style.color="white";
                Paragraph.style.marginLeft="20px"; 
                Paragraph.style.fontSize="20px";
                DialogueBox.appendChild(Paragraph);  
                WriteText=false;
               }
               
             }
          }
          else
          {
                DialogueBox.style.visibility="hidden";
                player.CanMove=true;
          }
        if(InDialogue==true)
                {
                    canvas.addEventListener("mousedown",function(e){
                    if((OnDialogueEvent==false)&&(InDialogue==true))
                        {
                            IndexDialogueArray++;
                            OnDialogueEvent=true;
                            WriteText=true;
                            DialogueBox.removeChild(DialogueBox.firstChild);
                        }   
                    });
                    canvas.addEventListener("mouseup",function(e){
                    OnDialogueEvent=false;
                    });
                }
}
function CheckEvents()
{
    canvas.addEventListener("mousemove", CheckPos);
    canvas.addEventListener("mouseup", CheckClick);
    if(InGame==true)
    {
            document.onkeydown=function(e){
                player.Move(e);
            };
            document.onkeyup=function(e){
                player.CurrentFrameW=0;
            }
    }
    
}

function SetImages()
{
    PlayButton=new Imagine("/resurse/img/Play.png"); 
    OptionsButton=new Imagine("/resurse/img/Settings.png"); 
    LevelsButton=new Imagine("/resurse/img/Levels.png");
    BackButton=new Imagine("/resurse/img/Back.png");
    ArrowIndicator=new Imagine("/resurse/img/arrow.png");
    SettingsBackground=new Imagine("/resurse/img/SettingsBackground.png");
    MainCh1=new Imagine("/resurse/img/Characters/Character1.png");
    MainCh2=new Imagine("/resurse/img/Characters/Character2.png");
    MainCh3=new Imagine("/resurse/img/Characters/Character3.png");
    Walls=new GameObject("/resurse/img/Level1/Walls.png");
    Bed=new GameObject("/resurse/img/Level1/Bed.png");
    Floor=new GameObject("/resurse/img/Level1/Floor.png");
    Chest=new GameObject("/resurse/img/Level1/Chest.png");
    Door1=new Door("/resurse/img/Level1/Door.png");
    Door2=new Door("/resurse/img/Level1/Door.png");
    letter=new Letter("/resurse/img/Level1/Level1Items/Letter/LetterOnFloor.png","/resurse/img/Level1/Level1Items/Letter/letter.png");
    TheDog=new Dog("/resurse/img/Characters/TheDog.png");
    key2=new Key("/resurse/img/Level1/key.png");
    FirePlace=new GameObject("/resurse/img/Level1/Fireplace.png");
    StaticL1Doors=new Door("/resurse/img/Level1/StaticDoor.png");
    Grass=new GameObject("/resurse/img/Level2/Grass.png");
    Tree=new GameObject("/resurse/img/Level2/Tree.png");
    Gate=new Door("/resurse/img/Level2/Gate.png");
    Fence=new GameObject("/resurse/img/Level2/Fence.png");
    Fence2=new GameObject("/resurse/img/Level2/Fence2.png");
    Car1=new GameObject("/resurse/img/Level2/Car.png");
    Car2=new GameObject("/resurse/img/Level2/car2.png");
}
function DrawLevel2()
{
    Level2ObjectsStatus();
    var PositionImgY=0;
        for(let i=0;i<Level2Map.length;i++)
         {
            var PositionImgX=0;
            for(let j=0;j<Level2Map[i].length;j++)
                {
                    context.drawImage(Grass.Img,PositionImgX,PositionImgY,Grass.w,Grass.h);
                    if(Level2Map[i][j]==Tree.NrInMap)
                    {
                        context.drawImage(Tree.Img,PositionImgX,PositionImgY,Grass.w,Grass.h);
                    }
                    if(Level2Map[i][j]==Gate.NrInMap)
                    {
                        
                        context.drawImage(Gate.Img,Gate.PosInImgX,Gate.PosInImgY,Gate.FrameWidth,Gate.FrameHeigth,PositionImgX,PositionImgY,Gate.w,Gate.h);
                    }
                    if(Level2Map[i][j]==Fence.NrInMap)
                    {
                        context.drawImage(Fence.Img,PositionImgX,PositionImgY,Fence.w,Fence.h);
                    }
                    if(Level2Map[i][j]==Fence2.NrInMap)
                    {
                        context.drawImage(Fence2.Img,PositionImgX,PositionImgY,Fence2.w,Fence2.h);
                    }
                    if(Level2Map[i][j]==Car1.NrInMap)
                    {
                        
                        Car1.SetPositions(PositionImgX,PositionImgY);
                    }
                    if(Level2Map[i][j]==Car2.NrInMap)
                    {
                        Car2.SetPositions(PositionImgX,PositionImgY);
                        
                    }
                    PositionImgX+=Grass.w;
                }
            PositionImgY+=Grass.h;
         }
         context.drawImage(Car1.Img,Car1.x,Car1.y,Car1.w,Car1.h);
         context.drawImage(Car2.Img,Car2.x,Car2.y,Car2.w,Car2.h);
         context.drawImage(player.Img,player.CurrentFrameW,player.CurrentFrameH,player.FrameWidthDim,player.FrameHeightDim,player.x,player.y,player.w,player.h);
}
function Level2ObjectsStatus()
{
    Grass.SetNrInMap(0);
    Grass.SetFrameWH(1,1);
    Tree.SetNrInMap(1);
    Tree.SetFrameWH(1,1);
    Gate.SetNrInMap(2);
    Fence.SetNrInMap(3);
    Car1.SetNrInMap(4);
    Car2.SetNrInMap(5);
    Fence2.SetNrInMap(6);
    Gate.SetFrameWH(2,1);
    Fence.SetFrameWH(1,1);
    Fence2.SetFrameWH(1,1);
    Car1.SetFrameWH(1,1);
    Car2.SetFrameWH(1,1);
}
function ImgDimPosLevel2()
{
    Grass.SetDimensions(canvas.width/Level2Map[0].length,canvas.height/Level2Map.length);
    Tree.SetDimensions(canvas.width/Level2Map[0].length,canvas.height/Level2Map.length);
    Gate.SetDimensions(canvas.width/Level2Map[0].length,canvas.height/Level2Map.length);
    Fence.SetDimensions(canvas.width/Level2Map[0].length,canvas.height/Level2Map.length);
    Fence2.SetDimensions(canvas.width/Level2Map[0].length,canvas.height/Level2Map.length);
    Car1.SetDimensions(canvas.width/Level2Map[0].length+40,canvas.height/Level2Map.length);
    Car2.SetDimensions(canvas.width/Level2Map[0].length+80,canvas.height/Level2Map.length);
}
function ColisionLevel2(x,y,w,h)
{
    let RetType=false;
    var PositionImgY=0;
    /*if((x+w<0)||(x+w/4>canvas.width)||(y+h<0)||(y+h/4>canvas.height))
    {
        RetType=true;
    }*/
    for(let i=0;i<Level1Map.length;i++)
    {
        var PositionImgX=0
        for(let j=0;j<Level1Map[i].length;j++)
        {
            if(Level2Map[i][j]==Tree.NrInMap)
            RetType=CheckColision(x,y,w,h,PositionImgX,PositionImgY,Tree.w,Tree.h);
            if(RetType==true)
            {   
                break;
            }
            if(Level2Map[i][j]==Gate.NrInMap)
            RetType=CheckColision(x,y,w,h,PositionImgX,PositionImgY,Gate.w,Gate.h);
            if(RetType==true)
            {   
                break;
            }
            if(Level2Map[i][j]==Fence.NrInMap)
            RetType=CheckColision(x,y,w,h,PositionImgX,PositionImgY,Fence.w,Fence.h);
            if(RetType==true)
            {   
                break;
            }
            if(Level2Map[i][j]==Fence2.NrInMap)
            RetType=CheckColision(x,y,w,h,PositionImgX,PositionImgY,Fence2.w,Fence2.h);
            if(RetType==true)
            {   
                break;
            }
            if(Level2Map[i][j]==Car1.NrInMap)
            RetType=CheckColision(x,y,w,h,PositionImgX,PositionImgY,Car1.w,Car1.h);
            if(RetType==true)
            {   
                break;
            }
            if(Level2Map[i][j]==Car2.NrInMap)
            RetType=CheckColision(x,y,w,h,PositionImgX,PositionImgY,Car2.w,Car2.h);
            if(RetType==true)
            {   
                break;
            }
            PositionImgX+=Tree.w;
        }
        if(RetType==true)
            {   
                break;
            }
        PositionImgY+=Tree.h
    }
    return RetType;
}
function ImgDimPos()
{
    ImgDimPosMenu();
    ImgDimPosSettings();
    ImgDimPosLevel1();
    ImgDimPosLevel2();
}
function ImgDimPosMenu()
{
    PlayButton.SetPositions(canvas.width/2-150,20);
    PlayButton.SetDimensions(300,200); 
    LevelsButton.SetPositions(canvas.width/2-115,100); 
    LevelsButton.SetDimensions(300,200);
    OptionsButton.SetPositions(canvas.width/2-115,180);
    OptionsButton.SetDimensions(300,200); 
    ArrowIndicator.SetPositions(LevelsButton.x-20,PlayButton.h);
    ArrowIndicator.SetDimensions(80,50);
}
function ImgDimPosSettings()
{
    SettingsBackground.SetPositions(0,0);
    SettingsBackground.SetDimensions(canvas.width,canvas.height);
    MainCh1.SetPositions(400,425);
    MainCh1.SetDimensions(80,80);
    MainCh2.SetPositions(600,425);
    MainCh2.SetDimensions(80,80);
    MainCh3.SetPositions(800,430);
    MainCh3.SetDimensions(80,80);
    BackButton.SetPositions(0,0)
    BackButton.SetDimensions(120,60);
}
function ImgDimPosLevel1()
{
    Walls.SetDimensions(canvas.width/Level1Map[0].length,canvas.height/Level1Map.length);
    Bed.SetDimensions(canvas.width/Level1Map[0].length,canvas.height/Level1Map.length+10);
    Floor.SetDimensions(canvas.width/Level1Map[0].length,canvas.height/Level1Map.length);
    Chest.SetDimensions(canvas.width/Level1Map[0].length,canvas.height/Level1Map.length);
    Door1.SetDimensions(canvas.width/Level1Map[0].length,canvas.height/Level1Map.length);
    Door2.SetDimensions(canvas.width/Level1Map[0].length,canvas.height/Level1Map.length);
    letter.SetDimensions(canvas.width/Level1Map[0].length,canvas.height/Level1Map.length);
    TheDog.SetDimensions(canvas.width/Level1Map[0].length,canvas.height/Level1Map.length);
    key2.SetDimensions(canvas.width/Level1Map[0].length,canvas.height/Level1Map.length);
    FirePlace.SetDimensions(canvas.width/Level1Map[0].length,canvas.height/Level1Map.length);
    StaticL1Doors.SetDimensions(canvas.width/Level1Map[0].length,canvas.height/Level1Map.length);
    
}
function SetVolume(RangeVolume)
{
    RangeVolume.style.marginLeft="700px";
    RangeVolume.style.marginTop="450px";
    RangeVolume.style.position='absolute';
    RangeVolume.style.zIndex ="100";
    RangeVolume.style.display="none";
    RangeVolume.style.width="500px";
    
}
function SetNamePos(InputName)
{
    InputName.style.marginLeft="700px";
    InputName.style.marginTop="270px";
    InputName.style.position='absolute';
    InputName.style.zIndex ="100";
    InputName.style.display="none";
    InputName.style.width="300px";
    InputName.style.height="30px";
    InputName.style.backgroundColor = "rgb(93, 49, 51)";
    InputName.style.borderColor =  "rgb(0,0,0)";
}
function SetInputRadio(InputRadio)
{
    InputRadio.style.marginLeft="700px";
    InputRadio.style.marginTop="620px";
    InputRadio.style.position='absolute';
    InputRadio.style.zIndex ="100";
    InputRadio.style.display="none";
}

function CheckCharacterSelected()
{
    if(InputRadio[0].checked)
    { 
        PlayerChMediaSource=MainCh1.Img.src;
    }
    else
    {
        if(InputRadio[1].checked)
        {   
            PlayerChMediaSource=MainCh2.Img.src;
        }
        else
        {
            if(InputRadio[2].checked)
            {
                PlayerChMediaSource=MainCh3.Img.src;
            }
        }
    }
   
}
function GameIntro()
{
    var Paragraph=document.createElement("P");
    InitialStoryDiv=document.getElementById("StoryBeginning");
    InitialStoryDiv.style.display="block";
    Paragraph.innerHTML="After sleeping for a long time, the little cat, "+ InputName.value + ", woke up and saw she received a strange letter.";
    Paragraph.style.color="white";
    Paragraph.style.marginLeft="80px"; 
    Paragraph.style.fontSize="40px";
    Paragraph.style.marginTop="200px";
    GameIntroEverPlayed=true;
    InitialStoryDiv.appendChild(Paragraph);  
}
function CheckPos(MouseEv)
{
    if(MouseEv.pageX || MouseEv.pageY == 0){
        MouseX = MouseEv.pageX - this.offsetLeft;
        MouseY = MouseEv.pageY - this.offsetTop;
    }else if(MouseEv.offsetX || MouseEv.offsetY == 0){
        MouseX = MouseEv.offsetX;
        MouseY = MouseEv.offsetY;
    }
    
    if(InMenu==true)
    {
        CheckOnButton(PlayButton);
        if(Fill==true)
        {
            InGame=true;
            setTimeout(function(){ InLevel1=true; /*InitialStoryDiv.style.display="none";*/GameIntroFinished=true; }, 10000);
            InLevels=false;
            InSettings=false;
        }
        if(Fill==false)
        {
            CheckOnButton(LevelsButton);
            if(Fill==true)
            {
                InLevels=true;
                InGame=false;
                InSettings=false;
            }
    }
   
        if(Fill==false)
        {
            CheckOnButton(OptionsButton);
            if(Fill==true)
            {
                InLevels=false;
                InGame=false;
                InSettings=true;
            }
        }
    }
    else
    {
        if(InSettings)
        {
            CheckOnButton(BackButton);              
        }
    }
   
}

function CheckOnButton(Button)
{
    
    
           if(InMenu)
            {
                if((MouseX>Button.x) && MouseX<(Button.x+Button.w)&&(MouseY>Button.y)&&(MouseY<Button.y+Button.h-120))
                {
                
                    Fill=true; 
                    FillX=Button.x; 
                    FillY=Button.y; 
                    FillW=Button.width; 
                    FillH=Button.height;
                
                }
                else
                {
                    Fill=false;   
                }
            }
            else
            {
                if(InSettings)
                {
                    if((MouseX>Button.x) && MouseX<(Button.x+Button.w)&&(MouseY>Button.y)&&(MouseY<Button.y+Button.h))
                    {
                
                        Fill=true; 
                        FillX=Button.x; 
                        FillY=Button.y; 
                        FillW=Button.width; 
                        FillH=Button.height;
                
                    }
                    else
                    {
                        Fill=false;   
                    }
                }
            }
        
    
}
function CheckColision(x,y,w,h,X,Y,W,H)
{
    y+=1/2*h;
    x+=1/3*w;
    let k=1/3*w;
    h-=1/2*h;
    w-=1/3*w;
    if((x<X+W)&&(x+w-k>X)&&(y < Y + H) && (y + h > Y))
        {
            return true; 
        }
    return false;
}
var fadeId=0;
var time=0;
function CheckClick(MouseEv)
{
    
    if((Fill==true)&&(InMenu==true))
    {
        fadeId = setInterval("fadeOut()", 1000);
        InMenu=false;  
        if(InGame==true)
        {
            GameIntro();
        }

    }
    else
    {
        if((Fill==true)&&(InSettings==true))
        {
        fadeId = setInterval("fadeOut()", 1000);
        InSettings=false;  
        InMenu=true;
        }
    }
}
function fadeOut(){
    context.fillStyle = "rgb(20,255,255)";
    context.fillRect (0, 0, canvas.width, canvas.height);
    time += 0.1;
    if(time >= 2){
        clearInterval(fadeId);
        time = 0;
    }
}
function DrawMenu()
{
    context.drawImage(video,0,0,canvas.width,canvas.height);   //pun fiecare imagine a video-ului pe rand cu drawImage
        context.drawImage(PlayButton.Img,PlayButton.x,PlayButton.y,PlayButton.w,PlayButton.h);
        context.drawImage(LevelsButton.Img,LevelsButton.x,LevelsButton.y,LevelsButton.w,LevelsButton.h);
        context.drawImage(OptionsButton.Img,OptionsButton.x,OptionsButton.y,OptionsButton.w,OptionsButton.h); 
        if(Fill==true)
        {
            ArrowIndicator.SetPositions(ArrowIndicator.x,FillY);
            context.drawImage(ArrowIndicator.Img,ArrowIndicator.x,ArrowIndicator.y+30,ArrowIndicator.w,ArrowIndicator.h);
        }
        player=new Player(PlayerChMediaSource);
        //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!DE MODIFICAT DUPA CE TERMIN LEVEL 2 POZITIILE /////////////////////////////////////////////
        player.SetPositions(90,70); 
        //player.SetPositions(0,0);
       // player.SetDimensions(80,80);
       player.SetDimensions(canvas.width/Level1Map[0].length,canvas.height/Level1Map.length);
}
function DrawSettings()
{
    RangeVolume.style.display="block";  
            InputName.style.display="block";  
            InputRadio.style.display="block";
            context.drawImage(SettingsBackground.Img,SettingsBackground.x,SettingsBackground.y,canvas.width,canvas.height); 
            context.drawImage(MainCh1.Img,0,0,45,60,MainCh1.x,MainCh1.y,MainCh1.w,MainCh1.h);
            context.drawImage(MainCh2.Img,0,0,45,60,MainCh2.x,MainCh2.y,MainCh2.w,MainCh2.h);
            context.drawImage(MainCh3.Img,0,0,45,60,MainCh3.x,MainCh3.y,MainCh3.w,MainCh3.h);  
            CheckCharacterSelected();
            player=new Player(PlayerChMediaSource);
            player.SetPositions(80,70); 
            //player.SetDimensions(80,80);
            player.SetDimensions(canvas.width/Level1Map[0].length,canvas.height/Level1Map.length);
            context.drawImage(BackButton.Img,BackButton.x,BackButton.y,BackButton.w,BackButton.h);
}
function DrawLevel1()
{
                    Level1ObjectsStatus();
                    var PositionImgY=0;
                    for(let i=0;i<Level1Map.length;i++)
                    {
                        var PositionImgX=0;
                        for(let j=0;j<Level1Map[i].length;j++)
                        {
                           
                            
                            context.drawImage(Floor.Img,PositionImgX,PositionImgY,Walls.w,Walls.h);
                            if(Level1Map[i][j]==Walls.NrInMap)
                            {
                            context.drawImage(Walls.Img,PositionImgX,PositionImgY,Walls.w,Walls.h);
                            }
                            if(Level1Map[i][j]==Bed.NrInMap)
                            {
                            context.drawImage(Bed.Img,PositionImgX,PositionImgY,Bed.w,Bed.h);
                            }
                            if(Level1Map[i][j]==Chest.NrInMap)
                            {
                            context.drawImage(Chest.Img,PositionImgX,PositionImgY,Chest.w,Chest.h);
                            }
                            if(Level1Map[i][j]==Door1.NrInMap)
                            {
                                context.drawImage(Door1.Img,Door1.PosInImgX,Door1.PosInImgY,Door1.FrameWidth,Door1.FrameHeigth,PositionImgX,PositionImgY,Door1.w,Door1.h);
                                Door1.SetPositions(PositionImgX,PositionImgY);
                            }
                            if(Level1Map[i][j]==Door2.NrInMap)
                            {
                                context.drawImage(Door2.Img,Door2.PosInImgX,Door2.PosInImgY,Door2.FrameWidth,Door2.FrameHeigth,PositionImgX,PositionImgY,Door2.w,Door2.h);
                                Door2.SetPositions(PositionImgX,PositionImgY);
                            }
                            if(Level1Map[i][j]==FirePlace.NrInMap)
                            {
                                context.drawImage(FirePlace.Img,FirePlace.PosInImgX,FirePlace.PosInImgY,FirePlace.FrameWidth,FirePlace.FrameHeigth,PositionImgX,PositionImgY,FirePlace.w,FirePlace.h);
                                InGameFrameCount++;
                                if(InGameFrameCount>=70)
                                {
                                    if(FirePlace.PosInImgX+FirePlace.FrameWidth<FirePlace.Img.naturalWidth)
                                    {
                                        FirePlace.PosInImgX+=FirePlace.FrameWidth;
                                    }
                                    else
                                    {
                                        FirePlace.PosInImgX=0;
                                    }
                                    if(TheDog.JobDone==true)
                                    {
                                        InGameFrameCount=0;
                                    }
                                
                                }
                               
                            }
                            if(Level1Map[i][j]==StaticL1Doors.NrInMap)
                            {
                                context.drawImage(StaticL1Doors.Img,PositionImgX,PositionImgY,StaticL1Doors.w,StaticL1Doors.h);
                            }
                            if(Level1Map[i][j]==TheDog.NrInMap)
                            {
                            context.drawImage(TheDog.Img,TheDog.PosInImgX,TheDog.PosInImgY,TheDog.FrameWidth,TheDog.FrameHeigth,PositionImgX,PositionImgY,TheDog.w+5,TheDog.h);
                            TheDog.SetPositions(PositionImgX,PositionImgY);
                            if(TheDog.JobDone==false)
                            {
                                if(InGameFrameCount>=70)
                                {   
                                    if(TheDog.PosInImgX+TheDog.FrameWidth<TheDog.Img.naturalWidth)
                                    {
                                        TheDog.PosInImgX+=TheDog.FrameWidth;
                                    }
                                    else
                                    {
                                        TheDog.PosInImgX=0;
                                    }
                                        InGameFrameCount=0;
                                }
                            }
                                else
                                {
                                TheDog.PosInImgX=5*TheDog.FrameWidth;
                                }
                                
                            }
                            if((Level1Map[i][j]==key2.NrInMap)&&(key2.taken==false))
                            {
                                context.drawImage(key2.Img,PositionImgX,PositionImgY,key2.w,key2.h);
                                key2.SetPositions(PositionImgX,PositionImgY);
                            }
                            if(Level1Map[i][j]==letter.NrInMap)
                            {
                                if((letter.read==false)&&(letter.show==true))
                                {
                                    context.drawImage(letter.Img,PositionImgX,PositionImgY,letter.w,letter.h);
                                    letter.SetPositions(PositionImgX,PositionImgY);
                                }
                            }
                            if((letter.read==true)&&(letter.show==true))
                            {
                                context.drawImage(letter.ActualLetter,letter.ActualLetterX,letter.ActualLetterY,letter.ActualLetterWidth,letter.ActualLetterHeight);
                            }
                            PositionImgX+=Walls.w;
                           
                        }
                        PositionImgY+=Walls.h;
                    }
                    
                    context.drawImage(player.Img,player.CurrentFrameW,player.CurrentFrameH,player.FrameWidthDim,player.FrameHeightDim,player.x,player.y,player.w,player.h);
}
function Level1ObjectsStatus()
{
    Floor.SetNrInMap(0);
    Walls.SetNrInMap(1);
    Bed.SetNrInMap(2);
    Chest.SetNrInMap(3);
    Door1.SetNrInMap(4);
    Door2.SetNrInMap(6);
    TheDog.SetNrInMap(7);
    key2.SetNrInMap(8);
    FirePlace.SetNrInMap(9);
    StaticL1Doors.SetNrInMap(10);
    
    Door1.SetFrameWH(2,1);
    Door2.SetFrameWH(2,1);
    StaticL1Doors.SetFrameWH(1,1);
    TheDog.SetFrameWH(6,1);
    key2.SetFrameWH(1,1);
    FirePlace.SetFrameWH(3,1);
    Walls.SetFrameWH(1,1);
    Bed.SetFrameWH(1,1);
    Floor.SetFrameWH(1,1);
    Chest.SetFrameWH(1,1);
    letter.SetActualLetterWH();
}
function ProgressStatusLevel1()
{
    if((letter.read==false)&&(letter.show==true))
            {
                if(CheckColision(player.x,player.y,player.w,player.h,letter.x,letter.y,letter.w,letter.h)==true)
                {
                    letter.read=true;
                    Door1.locked=false;
                    Door1.PosInImgX+=Door1.FrameWidth;
                    player.CanMove=false;
                }
                document.addEventListener("keydown",function(e){
                    if(e.keyCode==27)//esc to close letter
                    {
                        letter.read=false;
                        player.CanMove=true;
                        letter.show=false;
                        InDialogue=true;
                    }
                });
            }
         if((CheckColision(player.x,player.y,player.w,player.h,TheDog.x,TheDog.y,TheDog.w+5,TheDog.h)==true)&&(TheDog.JobDone==false))
         {
             InDialogue=true;
             TheDog.JobDone=true;
         }
         if(CheckColision(player.x,player.y,player.w,player.h,key2.x,key2.y,key2.w,key2.h)==true)
         {
            key2.taken=true;
         }
         if(key2.taken==true)
         {
            
            if(CheckColision(player.x,player.y,player.w,player.h,Door2.x,Door2.y-Door2.h,Door2.w,Door2.h)==true)
            {
              
                if(Door2.locked==true)
                Door2.PosInImgX+=Door2.FrameWidth;  
                Door2.locked=false;
            }
         }
         if(CheckColision(player.x,player.y,player.w,player.h,Door2.x,Door2.y+Door2.h/1.5,Door2.w,Door2.h)==true)
         {
             InLevel1=false;
             player.SetPositions(10,10);
             Inlevel2=true;
         }
}
function ColisionLevel1(x,y,w,h)
{
    let RetType=false;
    var PositionImgY=0;
    for(let i=0;i<Level1Map.length;i++)
    {
        var PositionImgX=0
        for(let j=0;j<Level1Map[i].length;j++)
        {
            if(Level1Map[i][j]==Walls.NrInMap)
            RetType=CheckColision(x,y,w,h,PositionImgX,PositionImgY,Walls.w,Walls.h);
            if(RetType==true)
            {   
                break;
            }
            if(Level1Map[i][j]==Bed.NrInMap)
            RetType=CheckColision(x,y,w,h,PositionImgX,PositionImgY,Bed.w,Bed.h);
            if(RetType==true)
            {   
                break;
            }
            if(Level1Map[i][j]==Chest.NrInMap)
            RetType=CheckColision(x,y,w,h,PositionImgX,PositionImgY,Chest.w,Chest.h);
            if(RetType==true)
            {   
                break;
            }
            if((Level1Map[i][j]==Door1.NrInMap)&&(Door1.locked==true))
            RetType=CheckColision(x,y,w,h,PositionImgX,PositionImgY,Door1.w,Door1.h);
            if(RetType==true)
            {   
                break;
            }
            if((Level1Map[i][j]==Door2.NrInMap)&&(Door2.locked==true))
            {
                RetType=CheckColision(x,y,w,h,PositionImgX,PositionImgY,Door2.w,Door2.h);
            }
            if(RetType==true)
            {   
                break;
            }
            if((Level1Map[i][j]==StaticL1Doors.NrInMap)&&(Door2.locked==true))
            {
                RetType=CheckColision(x,y,w,h,PositionImgX,PositionImgY,Door2.w,Door2.h);
            }
            if(RetType==true)
            {   
                break;
            }
            PositionImgX+=Walls.w;
            
        }
        if(RetType==true)
            {   
                break;
            }
        PositionImgY+=Walls.h
    }
    return RetType;
}