console.log("Start ...");

function timeOut(cb) {
    setTimeout(function(){
        console.log("Hello I am Javascript...")
        cb()
    }, 2000);
}

function printEnd() {
    console.log("End ...")
}

timeOut(printEnd)


const arr = [1,2, 3,4,5]

const newArr = arr.map(elem =>{
return elem*elem
})

console.log(newArr)