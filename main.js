img="";
Status="";
objects = [];

function preload() {
    img = loadImage('minime.jpeg');
}

function setup() {
    canvas = createCanvas(840, 620);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects"
}

function draw() {
    image(video, 0, 0, 840, 620);
    if(Status !="")
    {
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video, gotResult);
        for(i=0 ; i <objects.length; i++)
        {
        document.getElementById("status").innerHTML = "Status: Objeto Detectado";
        document.getElementById("numberOfObjects").innerHTML = "Quantidade de Objetos Detectados"+ objects.length;

        fill("r,g,b");        
        percent = floor(objects[i].confidence * 100);
        text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
        noFill();
        stroke("r,g,b");
        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}

function modelLoaded() {
    console.log("Model Loaded!");
    Status = true;
    objectDetector.detect(video, gotResult);
}

function gotResult(error, results) {
    if(error) {
        console.error(error);
    }
    console.log(results);
    objects = results;
}