let promise = new Promise((resolve,reject) =>{
    setTimeout(()=>{
        const val = false
        if(val){
            resolve("successful");
        }
        else{
            reject("failure1");
        }
    },2000);
})
let promise2 = new Promise((resolve,reject) =>{
    setTimeout(()=>{
        const val = true
        if(val){
            resolve("successful");
        }
        else{
            reject("failure2");
        }
    },5000);
})

// console.log("comenzar");
async function promiseHandler(){
    // console.log("Hola")
    let res = 'ey'
    try{
    //    res = await promise

       let promiseAll= await Promise.race([promise2,promise])
       console.log(promiseAll);

    }
    catch(error){
        console.log(error);

    }
    // console.log(res);
    // .then((trueData) => {
    //     console.log('gracias',trueData)
    //     res = trueData
    // })
    // .catch((falseData)=>{
    //     console.log("Lo siento",falseData)
    //     res = falseData
    // });
    // console.log('fin',res)
}
// console.log("adiós");
promiseHandler()