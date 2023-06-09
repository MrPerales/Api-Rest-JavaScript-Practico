// let lang = navigator.language; 
const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    },
    params: {
        'api_key': API_KEY,
        'language':getLang() //lang,
    }
})


const URL = 'https://api.themoviedb.org/3';
const urlImages = 'https://image.tmdb.org/t/p/w300';


//  lazy loading
// ...... new IntersectionObserver(callback)
const lazyLoader = new IntersectionObserver((entries, observer) => {

    entries.forEach((element) => {
        // console.log(element.target.setAttribute); para saber si tiene el atributo 
        if (element.isIntersecting) {
            const url = element.target.getAttribute('data-img');
            element.target.setAttribute('src', url);
        }
    });

});
// local storage
function likedMoviesList(){
    //json.parse para asegurar que sea un obj
    const item =JSON.parse(localStorage.getItem('liked_movies'));
    let movies;
    //si item es cualquier cosa se guarda en la variable movies
    if(item){
        movies=item
    }else{
        movies={}
    }
    return movies; 
}
function likeMovie(movie){
    const likedMovies=likedMoviesList()
    if(likedMovies[movie.id]){
        likedMovies[movie.id]=undefined;
        // console.log('la pelicula ya estaba en localStorage eliminala');
    }else{
        likedMovies[movie.id]=movie;
        // console.log('la pelicula no esta en localStorage agregala');
    }
    // JSON.stringify para convertir a string el contenido 
    localStorage.setItem('liked_movies',JSON.stringify(likedMovies));
}

//function build DOM 

function createMovies(movieList, container, { lazyLoad = false, clean = true } = {}) {
    if (clean) {
        container.innerHTML = '';

    }

    movieList.forEach(element => {
        const movieContainer = document.createElement('div');
        movieContainer.classList.add('movie-container');


        const movieImg = document.createElement('img');
        movieImg.classList.add('movie-img');
        movieImg.setAttribute('alt', element.name || element.title)
        movieImg.setAttribute(
            lazyLoad ? 'data-img'
                : 'src'
            , `${urlImages}/${element.poster_path}`);
        
            movieImg.addEventListener('click', () => {
            location.hash = `#movie=${element.id}-${element.title}`;
        });
        // movieImg.addEventListener('error', () => {
        //     const spanMovieImg = document.createElement('span');
        //     spanMovieImg.classList.add('spanMovieImg')
        //     spanMovieImg.textContent = element.title;
        //     movieContainer.appendChild(spanMovieImg);
        //     // spanMovieImg.innerHTML='';
        // });

        // like button 
        const likeBtn=document.createElement('button');
        likeBtn.classList.add('like-btn');
        if(likedMoviesList()[element.id]){
            likeBtn.classList.add('like');
        }

        likeBtn.addEventListener('click',()=>{
            likeBtn.classList.toggle('like');

            likeMovie(element);
            //para agregarla a favoritos sin tener que recargar la pag 
            getLikedMovies();
        })


        // por si no hay poster
        if (element.poster_path == null) {
            const spanMovieTitle = document.createTextNode(element.name || element.title);
            const spanMovieImg = document.createElement('span');
            spanMovieImg.classList.add('spanMovieImg');
            spanMovieImg.appendChild(spanMovieTitle);
            movieContainer.appendChild(spanMovieImg);
        }

        if (lazyLoad) {
            lazyLoader.observe(movieImg);
        }

        movieContainer.appendChild(likeBtn);
        movieContainer.appendChild(movieImg);
        container.appendChild(movieContainer);
    });
}

function createCategories(categoryList, container) {
    container.innerHTML = '';

    categoryList.forEach(element => {

        const categoriesNameList = document.createElement('div');
        categoriesNameList.classList.add('categoriesNameList');

        const categoryName = document.createElement('h3');
        categoryName.classList.add('categoryName');
        categoryName.setAttribute('id', element.id);

        const categoryNameText = document.createTextNode(element.name);
        categoryName.addEventListener('click', () => {
            location.hash = `#category=${element.id}-${element.name}`;
        })

        categoryName.appendChild(categoryNameText);
        categoriesNameList.appendChild(categoryName);
        container.appendChild(categoriesNameList)

    });
}


// API calls
async function getTrendingMoviesPreview() {
    const { data, status } = await api('/trending/movie/day')
    const movies = data.results;

    createMovies(movies, trendingPreviewMovieList, true);
}

async function getCategoriesPreview() {
    const { data, status } = await api('/genre/movie/list');
    // console.log(data);
    const categories = data.genres;
    createCategories(categories, categoriesListContainer);

}

async function getRandomMoviesPreview() {   //not random , is now_Playing

    const { data, status } = await api('/movie/now_playing');
    // console.log(data);
    const nowPlaying = data.results;
    maxPage = data.total_pages;

    createMovies(nowPlaying, categoriesMovieList, { lazyLoad: false, clean: true });

    // const btnSeeMore = document.createElement('button');
    // btnSeeMore.innerHTML = 'See More'
    // btnSeeMore.addEventListener('click', getPaginatedRandomMovies);
    // categoriesMovieList.appendChild(btnSeeMore);
}

// window.addEventListener('scroll',getPaginatedRandomMovies);

//function scroll of getRandomMoviesPreview (home);
async function getPaginatedRandomMovies() { //scroll

    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    //condition to know if you are on viewport bottom 
    //(-15 para restarle pixeles ya que no es tan exacta la medicion )
    const isScrollBottom = (scrollTop + clientHeight) >= (scrollHeight - 15);

    const pageIsNotMax = page < maxPage;

    if (isScrollBottom && pageIsNotMax) {
        page++;
        const { data } = await api(`/movie/now_playing`, {
            params: {
                page,
            }
        });
        const nowPlaying = data.results;

        createMovies(nowPlaying, categoriesMovieList, { lazyLoad: false, clean: false });
    }


    // const btnSeeMore=document.createElement('button');
    // btnSeeMore.innerHTML='See More'
    // btnSeeMore.classList.add('btnSeeMore')
    // btnSeeMore.addEventListener('click',getPaginatedRandomMovies);
    // // btnSeeMore.remove();  
    // categoriesMovieList.appendChild(btnSeeMore);
}


async function getMoviesByCategory(id) {

    const { data, status } = await api(`/discover/movie`, {
        params: {
            with_genres: id
        }
    });
    const category = data.results;
    // console.log(category);
    maxPage = data.total_pages;

    createMovies(category, genericListSection, true);

}
//function scroll of getMoviesByCategory   (categories);
function getPaginatedCategoryMovies(categoryID) {
    return async function () {

        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

        //condition to know if you are on viewport bottom 
        //(-15 para restarle pixeles ya que no es tan exacta la medicion )
        const isScrollBottom = (scrollTop + clientHeight) >= (scrollHeight - 15);
        if (isScrollBottom) {
            page++;
            const { data, status } = await api(`/discover/movie`, {
                params: {
                    with_genres: categoryID,
                    page,
                }
            });
            const category = data.results;
            console.log(category)
            createMovies(category, genericListSection, { lazyLoad: false, clean: false });

        }
    }
}

async function getMoviesBySearch(query) {
    const { data, status } = await api('/search/multi', {
        params: {
            query: query,
        }
    });
    const movies = data.results;
    maxPage = data.total_pages;

    createMovies(movies, genericListSection, true);
}

//function scroll of  getMoviesBySearch   (search);
function getPaginatedSearchMovies(query) {
    return async function () {

        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
        const isScrollBottom = (scrollTop + clientHeight) >= (scrollHeight - 15);

        if (isScrollBottom) {
            page++
            const { data, status } = await api('/search/multi', {
                params: {
                    query: query,
                    page
                }
            });
            const movies = data.results
            createMovies(movies, genericListSection, { lazyLoad: false, clean: false });
        }
    }

}

async function getMovieById(id) {
    const { data, status } = await api(`/movie/${id}`)


    movieDetailTitle.textContent = data.title;
    movieDetailScore.textContent = data.vote_average;
    movieDetailDescription.textContent = data.overview;
    // const urlImagesW500='https://image.tmdb.org/t/p/w500';

    const movieImgUrl = `https://image.tmdb.org/t/p/w500${data.poster_path}`

    // const posterPathImg=document.createElement('img');
    // posterPathImg.setAttribute('src',movieImgUrl);

    // posterPath.appendChild(posterPathImg);

    posterPath.style.background = `
    linear-gradient(180deg,rgba(0,0,0,0.35)19.27%, rgba(0, 0, 0, 0) 29.17%),
    url(${movieImgUrl})`

    createCategories(data.genres, movieDetailCategoriesList, true);

    getRelatedMoviesById(id);
}

async function getRelatedMoviesById(id) {
    const { data } = await api(`/movie/${id}/similar`);
    const relatedMovies = data.results;

    createMovies(relatedMovies, relatedMoviesScrollContainer, true);
}

function getLikedMovies(){
    const likedMovies=likedMoviesList();

    const arrayMovies =Object.values(likedMovies);
    // console.log('array=',arrayMovies);
    // console.log(likedMovies);
    
    createMovies(arrayMovies,likedMoviesArticle,{ lazyLoad: true, clean: true});
}

function getLang(){
    let lang = language.value;
    return lang;
}

languageOpcEs.addEventListener('click',()=> location.reload())

languageOpcEn.addEventListener('click',()=>location.reload())
    // const language=document.querySelector('.lang');
