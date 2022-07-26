function changeImage() {

    console.log('Button Clicked . . .')

    const image = document.getElementById('myImage');
    const statusText = document.getElementById('bulb-status');

    const waitSeconds = 2.5;
    const miliSeconds = waitSeconds * 1000;

    const myPromise = new Promise(function(resolve, reject) {
        setTimeout(function() {
            resolve();
        }, miliSeconds);
    });

    if (image.src.match("bulbon")) {

        console.log("Turning off . . .")
        myPromise.then(function(){
            statusText.innerHTML = "Off";
            image.src = "assets/pic_bulboff.gif"; 
            console.log("Turn Off! Complete. . .")
        });

        console.log("End of block...")

    } else {

        console.log("Turning on . . .")
        myPromise.then(function(){
            statusText.innerHTML = "On";
            image.src = "assets/pic_bulbon.gif"; 
            console.log("Turn On! Complete. . .")
        });

        
    }
}

