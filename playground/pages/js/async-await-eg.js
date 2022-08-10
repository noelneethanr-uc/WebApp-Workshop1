// async function asyncPromise() {
//     return "I am JS";
// } 

// console.log(asyncPromise())

// asyncPromise().then(function(data){
//     console.log(data)
// });

async function returnPromises() {
    return  new Promise((resolve) => {
      setTimeout(() => {
        console.log("Promise Executed...");
        resolve("Sample Data");
      }, 3000);
    });
  }
  
async function ExecuteFunction() {
    var newData = "UniCourt";
    var getPromise = await returnPromises();
    console.log(newData);
    console.log(getPromise);

  }
  
ExecuteFunction()