// async function asyncPromise() {
//     return "I am JS";
// } 

// asyncPromise().then(function(data){
//     console.log(data)
// });

async function returnPromises() {
    var data =  new Promise((resolve) => {
      setTimeout(() => {
        console.log("Promise Executed...");
        resolve("Sample Data");
      }, 3000);
    });
  }
  
function ExecuteFunction() {
    var newData = "UniCourt";
    var getPromise = returnPromises();
    console.log(newData);
    console.log(getPromise);

  }
  
ExecuteFunction()