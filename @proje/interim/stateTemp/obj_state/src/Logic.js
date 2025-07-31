function genRandom(){
            
    return(Math.floor(Math.random()*10))
}
function genThreeNum(n=3){
    let arr=[];
    for(let i=0;i<=n-1;i++){
        arr[i]=genRandom();
    }
    return arr;
}
function sum(arr){
    return(arr.reduce((sum,curr)=>sum+curr,0));
}

export {genRandom,sum,genThreeNum};