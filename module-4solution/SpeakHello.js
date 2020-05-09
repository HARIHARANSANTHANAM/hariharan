((window)=>{
    var hellospeaker={};
    hellospeaker.speakWord="Hello";
    hellospeaker.speak=(name)=>{
        console.log(hellospeaker.speakWord +" "+name);
    }
    window.hellospeaker=hellospeaker;
})(window);