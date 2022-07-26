const image = document.getElementById('myImage');
const statusText = document.getElementById('bulb-status');

const waitSeconds = 2;
const miliSeconds = waitSeconds * 1000;

const bulbOffPromise = new Promise(function(resolve, reject) {
    setTimeout(function() {
        image.src = "assets/pic_bulboff.gif"; 
        resolve();
    }, miliSeconds);
});


function changeImage() {

    if (image.src.match("bulbon")) {

        console.log("BUtton clicked")

        bulbOffPromise.then(function(){
            statusText.innerHTML = "Off";
        });

    } else {
        
    }
}

