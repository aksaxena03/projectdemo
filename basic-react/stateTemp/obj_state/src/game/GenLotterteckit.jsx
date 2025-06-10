export default function GenLotterteckit(n){
    let teckit=[];
    for(let i=0;i<n;i++){
        teckit[i]=Math.floor(Math.random()*10);
    }
    return teckit;
    
}