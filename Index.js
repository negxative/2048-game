let  grid=[
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0]
]
let score=0; 
let i=0;
let movesL,movesR,movesU,movesD; //TO KEEP TRACK OF MOVES LEFT OR NOT
movesL=movesR=movesU=movesD=1;


//FUNCTION TPO CREATE A NEW TILE ON EVERY MOVE AND TO INITIALIZE ON PAGE LOAD
const createTile=()=>{
    let x=[];
    //SELECTING ALL THE TILES WITH VALUE 0 AND PUSHING THEM INTO AN ARRAY
    document.querySelectorAll(".x0").forEach(e=>{
        x.push(e);
    })
    // SELECTING RANDOM INDEX TO GENERATE NEW TILE AT 
    let index=Math.floor(Math.random()*x.length)  
    x[index].innerHTML=2;
    x[index].classList.remove("x0");
    x[index].classList.add("x2");
    let cell=x[index].id.split("box")
    console.log(cell)
    let i=cell[1][0];
    let j=cell[1][1];
    grid[i][j]=2;

}


//TO GENERATE GRID ON PAGE LOAD WITH VALUE 0
window.onload=()=>{
    for(let i=0 ; i<4;i++){
        for(let j=0;j<4;j++){
                let p=document.createElement("div");
                p.classList.add("box","x0");
                p.id=`box${i}${j}`;
                if(grid[i][j])
                p.innerHTML=grid[i][j];
                document.querySelector(".Container").appendChild(p);
        }
    }
    createTile();
}


document.addEventListener("keyup",(e)=>{
    
    if(movesD==1 || movesL==1 || movesU==1 ||movesR==1){   //TO CHECK GAMEOVER CONDITION
     
    if(e.keyCode==37)
        {
        try{                  
            leftShift();                  //TO SHIFT TOWARDS LEFT
            movesD=movesL=movesR=movesU=1;
        }
        catch(err){
            movesL=0;
        }
        }
    else if(e.keyCode==38){
         try{
            upShift();                     //TO SHIFT  TILES UPWARDS
            movesD=movesL=movesR=movesU=1;
        }
        catch(err){
            movesU=0;
        }
        
    }
    else if(e.keyCode==39){
        try{
            rightShift();                    //TO SHIFT TOWARDS RIGHT
            movesD=movesL=movesR=movesU=1;
        }
        catch(err){
            movesR=0;
        }
        }    
    else if(e.keyCode==40){
        try{
            downShift();                      //TO SHIFT  DOWNWARDS
            movesD=movesL=movesR=movesU=1;
        }
        catch(err){
            movesD=0;
        }
        }
   }
   else{  //IF GAMEOVER CONDITION FAILS
     document.querySelector(".GameOver").style.display="block";
     document.querySelector(".Container").style.display="none";
   }
})


const merge=(a)=>{  // TO MERGE TILES WITH SAME VALUES
    for(let i=0;i<4;i++){
        for(let j=0;j<a[i].length-1;j++){
            if(a[i][j]==a[i][j+1]){ //IF TWO TILES WITH SAME VALUES ARE MET
                a[i][j]*=2;
                score+=a[i][j];
                document.querySelector(".scoreCount").innerHTML=score;
                a[i][j+1]=0;
            }
            if(a[i][j]==0){
            a[i][j]=a[i][j+1];
            a[i][j+1]=0;
        }
        if(a[i][j]==2048){
            document.querySelector(".GameWon").style.display="block";
            document.querySelector(".Container").style.display="none";
        }
     }
 }
 return a;
}

//FUNCTION TO UPDATE THE GRID AFTER MERGING
const updateGrid=(grid)=>{
    for(let i=0;i<4;i++){
        for(let j=0;j<4;j++){
                let x=`box${i}${j}`;
                let curBox=document.getElementById(x);
                curBox.innerHTML=grid[i][j]!=0?grid[i][j]:"";
                let colorClass=`x${grid[i][j]}`

                curBox.classList.remove(curBox.classList[1])
                curBox.classList.add(colorClass);
        }

    }
}


const leftShift=()=>{
let a=grid; //COPY OF CURRENT GRID TO WORK WITH AND MANIPULATE
        for(let i=0;i<4;i++){
               a[i]= a[i].filter(index=>index!==0) //REMOVING ZEROES FROM HORIZONTAL ARRAYS
        }

    a=merge(a);  //CALLING MERGE TO UPDATE ARRAY BY JOINING TILES WITH SAME VALUES
    
    for(let i=0;i<4;i++){   // ADDING ZEROES TO THE END
        for(let j=0;j<4;j++){
            if(j>=a[i].length)
              a[i].push(0);
        }
     }
     grid =a;   
     updateGrid(grid); //UPDATING GRID AND MAKE THE CHANGES VISIBLE
     createTile();    //CREATING NEW TILE 
}


const rightShift=()=>{

let a=grid;   //SAME PROCEDURE AS LEFT SHIFT BUT WE REVERSE HORIZONTAL ARRAY MANIPULATE IT AND REVERSE IT BACK
    for(let i=0;i<4;i++){
           a[i]= a[i].filter(index=>index!==0)
           a[i]=a[i].reverse()
    }
    a=merge(a);
 for(let i=0;i<4;i++){
    for(let j=0;j<4;j++){
        if(j>=a[i].length)
          a[i].push(0);
    }
    a[i]=a[i].reverse();
 }
 grid =a;
 updateGrid(grid);
 createTile();
}

const upShift=()=>{

    let a=[];// CREATING A SECONDARY GRID TO WORK WITH WITHOUT ZEROES IN A TRANSPOSED STATE
    for(let j=0;j<4;j++){  
        let b=[];
        for(let i=0;i<4;i++){
                if(grid[i][j]!=0)
                    b.push(grid[i][j]); //PUSHING NON ZERO ELEMENTS INTO ARRAY
        }
        a.push(b);
    }
// NOW WE HAVE TRANSPOSED GRID WITHOUT ZEROES  AND HENCE WE APPLY OPERATIONS SIMILIAR TO leftShift()


   a=merge(a);  //merging
    
    for(let i=0;i<a.length;i++){
        for(let j=0;j<4;j++){
            if(j>=a[i].length)
            a[i].push(0);  //adding trailing zeroes
        }
   }
   for(let i=0;i<4;i++){
    for(let j=0;j<4;j++){
        grid[i][j]=a[j][i];  //TRANSPOSING AGAIN TO GET ORIGINAL MATRIX
    }
   }

   updateGrid(grid);
   createTile();
}

const downShift=()=>{       
        //SIMILIAR OPERATIONS TO  upShift() but WITH REVERSING COLUUMN VALUES
    let a=[];  
    for(let j=0;j<4;j++){
        let b=[];
        for(let i=0;i<4;i++){
                if(grid[i][j]!=0)
                    b.push(grid[i][j]);
        }
        b=b.reverse()
        a.push(b);
    }
  
   a=merge(a);
    
   console.log(a)
    for(let i=0;i<a.length;i++){
        for(let j=0;j<4;j++){
            if(j>=a[i].length)
            a[i].push(0);
        }
        a[i]=a[i].reverse();
   }
   for(let i=0;i<4;i++){
    for(let j=0;j<4;j++){
        grid[i][j]=a[j][i];
    }
   }
   updateGrid(grid);
   createTile();
}