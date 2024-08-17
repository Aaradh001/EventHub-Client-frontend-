const promise1 = new Promise((resolve, reject)=>{
    setTimeout(()=>{
        const condition = true
        if(condition){
            resolve("successfull");
        }else{
            reject("rejected");
        }

    },1000)
});

// promise1.then((resolved_data)=>{
//     console.log("promise comleted !!!", resolved_data);
// })
// .catch((rejected_data)=>{
//     console.log("promiser rejected !!!", rejected_data);

// })


console.log("hello");
async function func1(){
    console.log("1234");
    let res = "start"
    console.log(res);
    await promise1.then((resolved_data)=>{
        console.log("promise comleted !!!", resolved_data);
        res= resolved_data
    })
    .catch((rejected_data)=>{
        console.log("promiser rejected !!!", rejected_data);
        res= rejected_data
    
    })
    console.log("5678", res);
}
console.log("hiiiii");

func1();


// hello    ok
// hiiiiii   ok
// 1234
// 5678
// promise comlpeted....