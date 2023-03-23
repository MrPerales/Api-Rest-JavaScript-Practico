const api=axios.create({
    baseURL:'https://api.themoviedb.org/3',
    headers:{
        'Content-Type':'application/json;charset=utf-8'
    },
    params:{
        'api_key':API_KEY,
    }
})


const URL='https://api.themoviedb.org/3';
const urlImages='https://image.tmdb.org/t/p/w300';

async function getTrendingMoviesPreview(){
    const {data,response} = await api('/trending/movie/day')
    const movies =data.results;
    // console.log('movies',movies);
    // console.log('data',data);
    const trendingPreviewContainer=document.querySelector('#trendingPreview');
    const trendingPreviewMovieList=document.querySelector(
        '.trendingPreview-movieList');
    // trendingPreviewContainer.innerHTML='';
    trendingPreviewMovieList.innerHTML="";
        movies.forEach(element => {
       

        const movieContainer=document.createElement('div');
        movieContainer.classList.add('movie-container');

        const movieImg=document.createElement('img');
        movieImg.classList.add('movie-img');
        movieImg.setAttribute('alt',element.title)
        movieImg.setAttribute('src',`${urlImages}/${element.poster_path}`);

        movieContainer.appendChild(movieImg);
        trendingPreviewMovieList.appendChild(movieContainer);
        trendingPreviewContainer.appendChild(trendingPreviewMovieList)

    });

}

async function getCategoriesPreview(){
    const {data,response}=await api('/genre/movie/list');
    // console.log(data);
    const categories=data.genres;

    const categoriesListContainer=document.querySelector('.categoriesList')
    categoriesListContainer.innerHTML='';

    categories.forEach(element => {

        const categoriesNameList=document.createElement('div');
        categoriesNameList.classList.add('categoriesNameList');

        const categoryName=document.createElement('h3');
        categoryName.classList.add('categoryName');
        categoryName.setAttribute('id',element.id);
        const categoryNameText=document.createTextNode(element.name);

        categoryName.appendChild(categoryNameText);
        categoriesNameList.appendChild(categoryName);
        categoriesListContainer.appendChild(categoriesNameList)
 
    });
}

async function getRandomMoviesPreview(){   //not random , is now_Playing

    const {data,response}=await api('/movie/now_playing');
    console.log(data);
    const nowPlaying = data.results;

    const categoriesMovieList=document.querySelector('.categoriesMovieList');
    categoriesMovieList.innerHTML="";

    nowPlaying.forEach(element => {
        const movieListContainer=document.createElement('div');
        movieListContainer.classList.add('movieList-container');

        const imgMovie=document.createElement('img');
        imgMovie.setAttribute('alt',element.title);
        imgMovie.setAttribute('src',`${urlImages}${element.poster_path}`)

        movieListContainer.appendChild(imgMovie);
        categoriesMovieList.appendChild(movieListContainer);

    });

}


// randomMoviesPreview();
// getTrendingMoviesPreview();
// getCategoriesPreview();