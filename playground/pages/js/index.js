async function asyncPromise() {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res("Done")
    }, 3000);
  });
}

async function main() {
  console.log("Start . . ");

//   const res = await asyncPromise();
    asyncPromise().then((data)=> {console.log(data)})
//   console.log(res);

  console.log("End . . ");
}

main();
