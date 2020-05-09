((window)=>{
    var byespeaker={};
    byespeaker.speakWord="Good Bye";
    byespeaker.speak=(name)=>{
        console.log(byespeaker.speakWord +" "+name);
    }
    window.byespeaker=byespeaker;
})(window);