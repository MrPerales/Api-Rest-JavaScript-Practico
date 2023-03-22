const URL='https://api.themoviedb.org/3';
const urlImages='https://image.tmdb.org/t/p/w300';

async function getTrendingMoviesPreview(){
    const response = await fetch(`${URL}/trending/movie/day?api_key=${API_KEY}`)
    const data = await response.json();

    const movies =data.results;
    console.log('movies',movies);
    // console.log('data',data);
    movies.forEach(element => {

        const trendingPreviewContainer=document.querySelector('#trendingPreview');
        const trendingPreviewMovieList=document.querySelector(
            '.trendingPreview-movieList');

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
getTrendingMoviesPreview();