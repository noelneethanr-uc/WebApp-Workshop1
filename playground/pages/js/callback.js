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
