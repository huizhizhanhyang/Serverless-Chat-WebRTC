//SET UP CODE ------------------------------------------------------------
console.log("hi");
  //HTML BUTTON THINGS 
  
  //CALLEE
  var Callee = document.getElementById('Callee');
  Callee.onclick = CalleeF; //go to function start 
  Callee.disabled = false;

  //CALLER
  var Call = document.getElementById('Call');
  Call.onclick = createLocalOffer; //go to function call
  Call.disabled = false;


  
  var hangUpButton =   document.getElementById('hangupButton');
  hangUpButton.disabled = true;
  

  
  


  hangUpButton.onclick = hangup; //go to function hangup

  var pc2submit = document.getElementById('pc2submit');
  pc2submit.onclick = handleAnswerFromPC2;

  var pc1submit = document.getElementById('pc1submit');
  pc1submit.onclick = handleofferFromPC1;

  //WEBRTC STUFF
  navigator.getMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
  vendorUrl = window.URL || window.webkitURL;

  //SERVER INFORMATIONS 
        var cfg = {'iceServers': [{'url': 'stun:23.21.150.121'}]};
        var con = { 'optional': [{'DtlsSrtpKeyAgreement': true}] };

        var sdpConstraints = {
        "offerToReceiveAudio":true,
        "offerToReceiveVideo":true
        }
//-------------------------------------------------------------------------


//Trace of whats happening

//PART 1
  //caller clicks call. creates a peerconnection objects pc1
  //sets local description to its self and plays video in box
  //then when ice server responds it prints out the local description


//now callee must take the local description and set some stuff up 

//PART 3
  //Caller now must take the remote answer(callees local description)
  //caller sets their remote description to RTCSessionDescription(JSON.parse(answer.val))




//CALLER STUFF--------------------------------------------------------------
      var pc1 = new RTCPeerConnection(cfg, con);//caller
  
      function createLocalOffer () {
          console.log('video1');

          navigator.getUserMedia({video: true, audio: true}, function (stream) {

            var video = document.getElementById('localVideo');
            video.src = vendorUrl.createObjectURL(stream);
            video.play();//PLAYS ON LOCAL VIDEO
            pc1.addStream(stream);//ADDS THE STREAM
            console.log(stream);//LOGS THE STREAM
            console.log('adding stream to pc1');//ADDS THE STREAM
            pc1.createOffer(function (desc) { //CREATES LOCAL OFFER. 
              pc1.setLocalDescription(desc, function () {}, function () {})
              console.log('created local offer', desc);
            },
            function () { console.warn("Couldn't create offer") },
            sdpConstraints)
          }, function (error) {
            console.log('Error adding stream to pc1: ' + error)
          })
    }

    //WHEN ICE SERVER REPLIES, IT GIVES INFORMATION FOR SOMEONE TO ACESS
    pc1.onicecandidate = function (e) {
      console.log('ICE candidate (pc1)', e)
      if (e.candidate == null) {
        var x = document.getElementById('pc1LocalOffer');
        x.value = JSON.stringify(pc1.localDescription);
      }
    }


    function handleAnswerFromPC2 () {
      
      var x = document.getElementById('pc2LocalOffer').value;
      
      var answerDesc = new RTCSessionDescription(JSON.parse(x));

      console.log('Received remote answer: ', answerDesc);
      pc1.setRemoteDescription(answerDesc);
  }



pc1.onaddstream = handleOnaddstream

//CALLEE STUFF-----------------------------------------------------------------
var pc2 = new RTCPeerConnection(cfg, con);

 function CalleeF(){
  
  navigator.getUserMedia({video: true, audio: true}, function (stream) {
    var video = document.getElementById('localVideo');
    video.src = vendorUrl.createObjectURL(stream);
    video.play();
    pc2.addStream(stream);
  }, function (error) {
    console.log('Error adding stream to pc2: ' + error);
  })
 handleofferFromPC1;

 }


pc2.onicecandidate = function (e) {
  console.log('ICE candidate (pc2)', e)
  if (e.candidate == null) {
    


    var y = document.getElementById('pc2LocalOffer');
    y.value = JSON.stringify(pc2.localDescription);


   }
}

pc2.onaddstream = handleOnaddstream









//offer recieved
//get pc1 stuff 
//handle offer 


function handleofferFromPC1(){

  var x = document.getElementById('pc1LocalOffer').value;

  var offerDesc = new RTCSessionDescription(JSON.parse(x))

  pc2.setRemoteDescription(offerDesc)
  pc2.createAnswer(function (answerDesc) {
    
    console.log('Created local answer: ', answerDesc)

    pc2.setLocalDescription(answerDesc)
  },
  function () { console.warn("Couldn't create offer") },
  sdpConstraints)

}



function hangup(){
  Deep.disabled = true;
  hangupButton.disabled = true;
  Omer.disabled = false;
}

//------------------------------------------------------------
function handleOnaddstream (e) {
  console.log('Got remote stream', e.stream)
  var el = document.getElementById('remoteVideo')
  el.autoplay = true
  attachMediaStream(el, e.stream)
}




