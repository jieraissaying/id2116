// // Botte Object
let bottle = {
  state: "placed"
}

// //let vid1;
function videoLoaded() {

}

// // Experience Object
let experience = {
  state: "placed",
  imagefile: 'video/image.jpg',
  vid1: "",
  vid2: "",
  vid3: "",
  currentflavour:this.vid1,
  startImg:"",

  loadVideo: function() {
    print("loading video");
    this.startImg = loadImage ("video/image.jpg"); 
    this.vid1 = createVideo("video/lift-2.mov", videoLoaded);
    this.vid2 = createVideo("video/lift-2.mov", videoLoaded);
    this.vid3 = createVideo("video/lift-2.mov", videoLoaded);
  },

  state1: "lifted1",
  //vid1: 'video/lift.mov', 

  state2: "lifted2",
  // vid2: 'videos/shake.mov', 

  state3: "lifted3",
  //vid3: '___________.webm', 

  video: "",
 
  draw: function() {
   // print("draw"+this.state)

    if (this.state === "placed" ) {
      image(this.startImg,0,0)
    }else if(this.state === "lifted3") {
      image(this.vid1,0,0)
      // image(this.vid2,0,0)
      // image(this.vid3,0,0)
    }
  },
  
  
  start: function() {
    this.state = "placed";
    imagefile.play();
  },
  flavour1: function() {
    this.state = "lifted1";
     this.currentflavour = this.vid1;
     this.currentflavour.play();
  
  },
  flavour2: function() {
    this.state = "lifted2";
    this.currentflavour = this.vid2;
    this.currentflavour.play();
  },
  flavour3: function() {
    this.state = "lifted3";
    this.currentflavour = this.vid3;
    this.currentflavour.play();
  }
}

function preload() {
  // specify multiple formats for different browsers
  experience.loadVideo();
}

// Button to connect/disconnect to microbit
let connectBtn;
let disconnectBtn;

function setup() {
  //createCanvas(800, 600);
  createCanvas(700, 1230);

  // add connect button
  connectBtn = createButton("Connect");
  connectBtn.mousePressed(connect);

  disconnectButton = createButton("Disconnect");
  disconnectButton.mousePressed(disconnect);
   
  experience.vid1.hide();
    experience.vid2.hide();
    experience.vid3.hide();
  

}
// connect to micro:bit
function connect() {
  uBitConnectDevice(uBitEventHandler);

}

// disconnect to micro:it
function disconnect() {
  // connectedDevice.close()
  uBitDisconnect(connectedDevice)

}



function draw() {
  background(0);

  //draw the experience object
  experience.draw();
}

function handleData(recvdata) {
   let status = recvdata.data;

  if (experience.state !== status) { //check if status is different from previous
    print("status changed");
    print(status);

    if (status === "placed") {
      experience.end();
    } else if (status ===  "lifted1") {
      print("calling lifted1");
      experience.flavour1();
    } else if (status === "lifted2") {
      print("calling lifted2");
      experience.flavour2();
    } else if (status === "lifted3") {
      print("calling lifted3");
      experience.flavour3();
    }

    

    experience.state = status; //update the status
  }

}

function keyPressed() {
  if (keyCode === 32) { //press SPACE BAR to turn on fullscreen.
    toggleFullScreen();
  }
}

function toggleFullScreen() {
  let fs = fullscreen();
  fullscreen(!fs);
}