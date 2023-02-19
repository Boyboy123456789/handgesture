prediction="";
Webcam.set({
    width:350,
    height:310,
    image_format:"png",
    png_quality:90
});

camera=document.getElementById("camera");
Webcam.attach("#camera");

function take_snapshot() {
    Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML="<img id='captured_image' src='"+data_uri+"'/>"
    });
}

console.log("ml5 version",ml5.version);
classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/TI4W-FdWK/model.json",modelLoaded);

function modelLoaded() {
    console.log("modelLoaded");
}

function speak() {
    var synth=window.speechSynthesis;
    speak_data="The prediction is"+prediction;
    var utterThis=new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
}

function check() {
    img=document.getElementById("captured_image");
    classifier.classify(img, gotResult);
}

function gotResult(error,results) {
    if (error) {
        console.error(error);
    }
    else {
        console.log(results);
        document.getElementById("prediction_1").innerHTML=results[0].label;
        prediction=results[0].label;
        speak();
    }
    if (results[0].label=="Good") {
        document.getElementById("update_emoji").innerHTML="&#128077;";
    }
    if (results[0].label=="Superb") {
        document.getElementById("update_emoji").innerHTML="&#128076;";
    }
    if (results[0].label=="Yo!") {
        document.getElementById("update_emoji").innerHTML="&#128304;";
    }
    if (results[0].label=="Victory") {
        document.getElementById("update_emoji").innerHTML="&#9996;";
    }
}