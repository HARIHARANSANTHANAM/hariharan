const moviename=document.querySelector("#moviename");
const search=document.querySelector("#search");
const images=document.querySelector(".images");
const row=document.querySelector(".row");
const idrow=document.querySelector("#popular");
const upcoming=document.querySelector("#upcoming");
const section=document.querySelector(".video");
const swipercontainer=document.querySelector(".swiper-container");
const api="https://api.themoviedb.org/3/search/movie?api_key=4a4ab5d493f67ee51f0786446dfc4554";
const swiperwrapper=document.querySelector("#swiper-wrapper");
const trending=document.querySelector("#trending");


//see the trailer
function trailer(movieid){
    location.href="https://www.google.com";
    var movievideourl="https://api.themoviedb.org/3/movie/"+movieid+"/videos?api_key=4a4ab5d493f67ee51f0786446dfc4554&movie_id="+movieid;
    fetch(movievideourl)
    .then((res) => res.json())
    .then((data) => {
        const img=`${data.results.map((movie)=>{
            if(movie.type=="Trailer"){
return `<iframe width="560" height="315" src="https://www.youtube.com/embed/${movie.key}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
`;}
}
)
        }`;
     section.innerHTML=img;
   console.log("Data:",data);
   }).catch((error)=>{
   console.log(error);
})    
}

//when the page is loaded 
window.onload=function popularmovies(e){
    e.preventDefault();
const api="https://api.themoviedb.org/3/movie/popular?api_key=4a4ab5d493f67ee51f0786446dfc4554";
    var imagenull="&include_image_language=null";
    var query="&query="+moviename.value+imagenull;
    var newquery=api+query;
    const image="https://image.tmdb.org/t/p/w500";
    console.log(newquery);
    fetch(newquery)
         .then((res) => res.json())
         .then((data) => {
             const container=`${data.results.map((movie)=>{
                if(movie.poster_path){
return `<div class="swiper-slide">
<img src=${image+movie.poster_path}>
<div class="card-body">
  <h5 class="card-title">${movie.original_title}</h5>
  <p class="card-text">${movie.original_language}  U/A(2D)</p>
  <p class="card-text"><small class="text-muted">Release Date:${movie.release_date}</small></p>
  <button value="${movie.id}" onclick="trailer(${movie.id})" class="btn btn-info"><i class="fa fa-video-camera" aria-hidden="true"></i>WATCH TRAILER</button>
</div>
</div>
`;}})
            }`;
            idrow.innerHTML=container;
        console.log("Data:",data);
        }).catch((error)=>{
        console.log(error);
    })
    moviename.value="";
    
const upcomingurl="https://api.themoviedb.org/3/movie/upcoming?api_key=4a4ab5d493f67ee51f0786446dfc4554";
var query="&query="+moviename.value+imagenull;
var newquery=upcomingurl+query;
console.log(newquery);
fetch(newquery)
     .then((res) => res.json())
     .then((data) => {
         const container=`${data.results.map((movie)=>{
            if(movie.poster_path){
return `<div class="swiper-slide">
<img src=${image+movie.poster_path}>
<div class="card-body">
  <h5 class="card-title">${movie.original_title}</h5>
  <p class="card-text">${movie.original_language}  U/A(2D)</p>
  <p class="card-text"><small class="text-muted">Release Date:${movie.release_date}</small></p>
  <button value="${movie.id}" onclick="trailer(${movie.id})" class="btn btn-info"><i class="fa fa-video-camera" aria-hidden="true"></i>WATCH TRAILER</button>
</div>
</div>
`;}})
        }`;
        upcoming.innerHTML=container;
    console.log("Data:",data);
    }).catch((error)=>{
    console.log(error);
}) 
const trendingurl="https://api.themoviedb.org/3/trending/movie/day?api_key=4a4ab5d493f67ee51f0786446dfc4554";
var query="&query="+moviename.value+imagenull;
var newquery=trendingurl+query;
console.log(newquery);
fetch(trendingurl)
     .then((res) => res.json())
     .then((data) => {
         const container=`${data.results.map((movie)=>{
            if(movie.poster_path){
return `<div class="swiper-slide">
<img src=${image+movie.poster_path}>
<div class="card-body">
  <h5 class="card-title">${movie.original_title}</h5>
  <p class="card-text">${movie.original_language}  U/A(2D)</p>
  <p class="card-text"><small class="text-muted">Release Date:${movie.release_date}</small></p>
  <button value="${movie.id}" onclick="trailer(${movie.id})" class="btn btn-info"><i class="fa fa-video-camera" aria-hidden="true"></i>WATCH TRAILER</button>
</div>
</div>
`;}})
        }`;
        trending.innerHTML=container;
    console.log("Data:",data);
    }).catch((error)=>{
    console.log(error);
})    
}



//search the movie
search.onclick= function searchmovie(e){
    e.preventDefault();
    swipercontainer.style.display="block";
    var imagenull="&include_image_language=null";
    swiperwrapper.innerHTML="";
    var query="&query="+moviename.value+imagenull;
    var newquery=api+query;
    const image="https://image.tmdb.org/t/p/w500";
    console.log(newquery);
    fetch(newquery)
         .then((res) => res.json())
         .then((data) => {
             const img=`${data.results.map((movie)=>{
                 if(movie.poster_path){
return `
  <div class="swiper-slide" style="background-image:url(${image+movie.poster_path})"></div>`;}})
             }`;
             
           swiperwrapper.innerHTML=img;
        console.log("Data:",data);
        }).catch((error)=>{
        console.log(error);
    })
    moviename.value="";
}

window.addEventListener("resize",function(){
    if(window.innerWidth<=670)
  {console.log("less than 670px");
  console.log(window.swiper.slidesPerGroup);
        swiper.slidesPerGroup=1;
        swiper.slidesPerView=1;
  }
  });
 