window.onload = function() {

  //Video
  var video = document.getElementById("video");

  //Buttons
  var playButton = document.getElementById("playpause");
  var volumeUpButton = document.getElementById("volinc");
  var volumeDownButton = document.getElementById("voldec");
  var muteButton = document.getElementById("mute");
  var fullScreenButton = document.getElementById("fullscreen");

  //Progress bars
  var seekBar = document.getElementById("seek");
  var bufferedBar = document.getElementById("buffered");

  //Transcript
  var textTranscript = document.getElementById("transcript");

  //JSON for cue start/end times and text
  var syncData = [
      {"start": "0.01","end": "7.535","text": "Now that we've looked at the architecture of the internet, let's see how you might connect your personal devices to the internet inside your house."},
      {"start": "7.536","end": "13.960","text": "Well there are many ways to connect to the internet, and most often people connect wirelessly."},
      {"start": "13.961","end": "17.940","text": "Let's look at an example of how you can connect to the internet."},
      {"start": "17.941","end": "30.920","text": "If you live in a city or a town, you probably have a coaxial cable for cable Internet, or a phone line if you have DSL, running to the outside of your house, that connects you to the Internet Service Provider, or ISP."},
      {"start": "32.100","end": "41.190","text": "If you live far out in the country, you'll more likely have a dish outside your house, connecting you wirelessly to your closest ISP, or you might also use the telephone system."},
      {"start": "42.350","end": "53.760","text": "Whether a wire comes straight from the ISP hookup outside your house, or it travels over radio waves from your roof, the first stop a wire will make once inside your house, is at your modem."},
      {"start": "53.761","end": "57.780","text": "A modem is what connects the internet to your network at home."},
      {"start": "57.781","end": "59.000","text": "A few common residential modems are DSL or..."}
    ];

    //Call function to create transcript on page
    createTranscript();


    //Functions

      //creates the transcript content on the page using JSON
      function createTranscript() {
        var element;
        for (var i = 0; i < syncData.length; i++) {
          element = document.createElement('span');
          element.cue = syncData[i];
          element.innerText = syncData[i].text + " ";
          textTranscript.appendChild(element);
        }
      }

      //Playpause
      function playVideo() {
        if (video.paused === true) {
          video.play();
          document.getElementById("playpause-icon").src = "icons/pause-icon.png";
        } else {
          video.pause();
          document.getElementById("playpause-icon").src = "icons/play-icon.png";
        }
      }

      //Mute
      function muteVideo() {
        if (video.muted === false) {
          video.muted = true;
          document.getElementById("mute-icon").src = "icons/volume-off-icon.png";
        } else {
          video.muted = false;
          document.getElementById("mute-icon").src = "icons/volume-on-icon.png";
        }
      }

      // Full Screen
      function fullScreen() {
        if (video.requestFullScreen) {
            video.requestFullScreen();
        } else if (video.mozRequestFullScreen) {
          video.mozRequestFullScreen();
        } else if (video.webkitRequestFullScreen) {
          video.webkitRequestFullScreen();
        }
      }

      //Current Time
      function currentTime() {
        var video = document.getElementById("video");
        var minutes = parseInt(video.currentTime / 60, 10);
        var seconds = parseInt(video.currentTime % 60, 10);
        if (seconds < 10) {
          seconds = "0" + parseInt(video.currentTime % 60, 10);
        }
        return minutes + ":" + seconds;
      }
        //Update Video Timer
        video.ontimeupdate = function() {
          document.getElementById("current-time").innerHTML = currentTime();
        }

      //Duration
      function duration() {
        var video = document.getElementById("video");
        var minutes = parseInt(video.duration / 60, 10);
        var seconds = parseInt(video.duration % 60);
        return minutes + ":" + seconds;
      }

      //Seek Bar
      function seekProgress() {
        var value = (100/video.duration) * video.currentTime;
        seekBar.value = value;
      }

      //Buffered Bar
      function bufferProgress() {
        var value = (100/video.duration) * vide.buffered.end(0);
        bufferedBar.value = value;
      }

      //Increase Volume
      function volumeUp() {
        video.volume+=0.1;
      }

      //Decrease Volume
      function volumeDown() {
        video.volume-=0.1;
      }

      //Match text with video
      function textJump(e) {
        video.currentTime = e.target.cue.start;
        video.play();
      }


      //Event Handling

        //Loaded video content
        video.addEventListener('loadedmetadata', function() {
          duration();
          document.getElementById("duration").innerHTML = duration();
        });

        //Playpause
        playButton.addEventListener("click", playVideo);
        //Mute
        muteButton.addEventListener("click", muteVideo);
        //Full Screen
        fullScreenButton.addEventListener("click", fullScreen);
        //SeekBar
        video.addEventListener("timeupdate", seekProgress);
        //BufferBar
        video.addEventListener("timeupdate", bufferProgress);
        //SeekBar Update Click
        seekBar.addEventListener("click", function(event){
          var barClick = event.offsetX / this.offsetWidth;
          video.currentTime = barClick * video.duration;
          seekBar.value = barClick / 100;
        });
        //End of the video to set back to start
        video.addEventListener("timeupdate", function(event) {
          if (video.currentTime == video.duration) {
            video.pause();
            video.currentTime = 0;
          }
        });

        //Volume Up
        volumeUpButton.addEventListener("click", volumeUp);
        //Volume Down
        volumeDownButton.addEventListener("click", volumeDown);
        //Text Transcript highlight
        video.addEventListener("timeupdate", function(e) {
              syncData.forEach(function(element, index, array){
                  if( video.currentTime >= element.start && video.currentTime <= element.end )
                      textTranscript.children[index].classList.remove("inactive-cue");
                      textTranscript.children[index].classList.add("active-cue");
                      if (video.currentTime < element.start || video.currentTime > element.end) {
                          textTranscript.children[index].classList.remove("active-cue");
                          textTranscript.children[index].classList.add("inactive-cue");
                      }
              });
        });

        //Span is clicked
          var sentences = transcript.getElementsByTagName('span');
          for (var i = 0; i < sentences.length; i++) {
            sentences[i].addEventListener("click", textJump);
          }
};
