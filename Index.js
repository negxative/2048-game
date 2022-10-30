
let  grid=[
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0]
]
let score=0;
let movesL,movesR,movesU,movesD;
movesL=movesR=movesU=movesD=1;
const createTile=()=>{
    let x=[];
    document.querySelectorAll(".x0").forEach(e=>{
        x.push(e);
    })
    let index=Math.floor(Math.random()*x.length)  
    console.log(x[index])
    x[index].innerHTML=2;
    x[index].classList.remove("x0");
    x[index].classList.add("x2");
    let cell=x[index].id.split("box")
    console.log(cell)
    let i=cell[1][0];
    let j=cell[1][1];
    grid[i][j]=2;

}


let i=0;
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

   if(movesD==1 || movesL==1 || movesU==1 ||movesR==1){
     
    if(e.keyCode==37)
        {
        try{
            leftShift();
            movesD=movesL=movesR=movesU=1;
        }
        catch(err){
            console.log("err")
            movesL=0;
        }
        }
    else if(e.keyCode==38){
         try{
            upShift();
            movesD=movesL=movesR=movesU=1;
        }
        catch(err){
            console.log("err")
            movesU=0;
        }
        
    }
    else if(e.keyCode==39){
        try{
            rightShift();
            movesD=movesL=movesR=movesU=1;
        }
        catch(err){
            console.log("err")
            movesR=0;
        }
        }    
    else if(e.keyCode==40){
        try{
            downShift();
            movesD=movesL=movesR=movesU=1;
        }
        catch(err){
            movesD=0;
            console.log("err")
        }
        }
   }
   else{
     document.querySelector(".GameOver").style.display="block";
     document.querySelector(".Container").style.display="none";
   }
})


const merge=(a)=>{
    for(let i=0;i<4;i++){
        for(let j=0;j<a[i].length-1;j++){
            if(a[i][j]==a[i][j+1]){
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
let a=grid;
        for(let i=0;i<4;i++){
               a[i]= a[i].filter(index=>index!==0)
        }

    a=merge(a);
    for(let i=0;i<4;i++){
        for(let j=0;j<4;j++){
            if(j>=a[i].length)
              a[i].push(0);
        }
     }
     grid =a;
     updateGrid(grid);
     createTile();
}


const rightShift=()=>{

let a=grid;
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

    let a=[];
    for(let j=0;j<4;j++){
        let b=[];
        for(let i=0;i<4;i++){
                if(grid[i][j]!=0)
                    b.push(grid[i][j]);
        }
        a.push(b);
    }
   console.log(a)
  
   a=merge(a);
    
    for(let i=0;i<a.length;i++){
        for(let j=0;j<4;j++){
            if(j>=a[i].length)
            a[i].push(0);
        }
   }
   for(let i=0;i<4;i++){
    for(let j=0;j<4;j++){
        grid[i][j]=a[j][i];
    }
   }

   updateGrid(grid);
   createTile();
}

const downShift=()=>{

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