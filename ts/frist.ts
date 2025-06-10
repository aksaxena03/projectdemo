// function sum(a:number,b:number) {
//     return (a+b)
// }
// let a=sum(1,2)

// console.log(a)


// // function am(){
// // hlo("hey bro")
// // }

// function hlo (){
// console.log(`hello `)
// return 1
// }



// function timeout(hey:()=>number){
//     setInterval(hey,1000)
// }
// timeout(hlo)



// interface user{
// name:string,age:number,id:number,specilization:string
// }

// interface admin{
// name:string,permission:string
// }
// type  ceo=user|admin                  // |=>union(conmman)   &->intersection(all,single)  

// function greet(par:ceo){
//     console.log("hello" +par.name)
// } 

// //other
// function greet2(par:user&admin){
//     console.log('helo'+ par.name)
// }

// let ceo=()=>{
// ceo.name
// }


// interface user{
//     name:string,
//     age:number
// }



// function islegal(lists:user[]){
//     let ans=[]
//     for (let i=0;i<lists.length;i++){
        
//         if(lists[i].age >=18){
//             ans.push(lists[i])          
//         }
        
//     }
//     console.log(ans)
//     return(ans)
// }


// let users=([{name:'akhil',age:12},{name:'naman',age:27}])
// let have=islegal(users)


// interface def{
//     name:string,age:number
// }
// let h1:def={name:"akhil",age:25}
// let h3:def={name:'anan',age:45}
// function sum(a:def,b:def){
//     console.log(a.age+b.age)
// }
// sum(h1,h3)


// interface def{
//     name :string,age:number,
// }
// let h1: Pick<def, 'name'>={      //|'age'  =>it is called pick used to pick from defind interface
//     name:"akhil",//age:12
// };

// console.log(h1);

   //exclude 
// type Props = keyof def;  // gets 'name' | 'age'
// type ExcludeAge = Exclude<Props, 'age'>;  // excludes 'age', keeps 'name'

// let h3: Record<ExcludeAge, string> = {
//     name: "rahul"
// };

// //


// import express  from "express";
// import {z} from "Zod";
// const app=express();

// let userSchema=z.object({
// name:z.string().min(3),
// age:z.number().min(1)
// })

// app.put('/hey',(req,res)=>{
//     const {success}=userSchema.safeParse(req.body)
//     if(!success){
//         res.status(401).json({})
//         console.log(res.json)
//         return
//     }res.json({message:'done'})

// })
// app.listen(3000)
