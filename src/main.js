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

//function build DOM 

function createMovies(movieList,container){
    container.innerHTML='';

    movieList.forEach(element => {
        const movieContainer=document.createElement('div');
        movieContainer.classList.add('movie-container');

        const movieImg=document.createElement('img');
        movieImg.classList.add('movie-img');
        movieImg.setAttribute('alt',element.title)
        movieImg.setAttribute('src',`${urlImages}/${element.poster_path}`);

        movieContainer.appendChild(movieImg);
        container.appendChild(movieContainer);
    });
}

function createCategories(categoryList,container){
    container.innerHTML='';

    categoryList.forEach(element => {

        const categoriesNameList=document.createElement('div');
        categoriesNameList.classList.add('categoriesNameList');

        const categoryName=document.createElement('h3');
        categoryName.classList.add('categoryName');
        categoryName.setAttribute('id',element.id);
        
        const categoryNameText=document.createTextNode(element.name);
        categoryName.addEventListener('click',()=>{
            location.hash=`#category=${element.id}-${element.name}`;
        })

        categoryName.appendChild(categoryNameText);
        categoriesNameList.appendChild(categoryName);
        container.appendChild(categoriesNameList)
 
    });
}


// API calls
async function getTrendingMoviesPreview(){
    const {data,status} = await api('/trending/movie/day')
    const movies =data.results;
   
    createMovies(movies,trendingPreviewMovieList);
}

async function getCategoriesPreview(){
    const {data,status}=await api('/genre/movie/list');
    // console.log(data);
    const categories=data.genres;
    createCategories(categories,categoriesListContainer);
    
}

async function getRandomMoviesPreview(){   //not random , is now_Playing

    const {data,status}=await api('/movie/now_playing');
    // console.log(data);
    const nowPlaying = data.results;

    createMovies(nowPlaying,categoriesMovieList);
}


async function getMoviesByCategory(id){
    const {data,status}= await api(`/discover/movie`, {
        params:{
            with_genres:id
        }
    });
    const category=data.results;

    createMovies(category,genericListSection);

}

async function getMoviesBySearch(query){
    const {data,status} = await api('/search/multi',{
        params:{
            query:query,
        }
    });
    const movies=data.results
    createMovies(movies,genericListSection);
}  
