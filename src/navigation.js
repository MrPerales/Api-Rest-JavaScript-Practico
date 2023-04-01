let maxPage;
let page=1;
let infiniteScroll;
window.addEventListener('DOMContentLoaded',navigator,false);
window.addEventListener('hashchange',navigator,false);
window.addEventListener('scroll',infiniteScroll,false);

searchBtn.addEventListener('click',()=>{
    location.hash=`#search=${searchInput.value}`;
})

headerArrow.addEventListener('click',()=>{
    window.history.back();
});


function navigator(){
    console.log([location]);

    if(infiniteScroll){
        window.removeEventListener('scroll',infiniteScroll,{passive:false});
        infiniteScroll=undefined;
    }

    if(location.hash.startsWith('#trends')){
        trendsPage();
    }else if(location.hash.startsWith('#search=')){
        searchPage();
    }else if(location.hash.startsWith('#movie=')){
        movieDetailPage();
    }else if(location.hash.startsWith('#category=')){
        categoriesPage();
    }else{
        homePage();
    }

    if(infiniteScroll){
        window.addEventListener('scroll',infiniteScroll,{passive:false});

    }

}

function homePage(){
    console.log('home');

    posterPath.classList.remove('poster');
    // headerSection.style.background='';
    headerArrow.classList.add('inactive');
    headerArrow.classList.remove('header-arrow--white');
    trendingMoviesPreviewListTitle.classList.remove('inactive')

    headerTitle.classList.remove('inactive')
    headerTitleCategoryViewer.classList.add('inactive');
    searchForm.classList.remove('inactive');

    trendingPreviewSection.classList.remove('inactive');
    categoriesPreviewSection.classList.remove('inactive');

    genericListSection.classList.add('inactive');
    movieDetailSection.classList.add('inactive');

    likedMoviesArticle.classList.remove('inactive');
    likedTitle.classList.remove('inactive');
    favoriteMoviesContainer.classList.remove('inactive');



    footer.classList.remove('inactive')

    


    getCategoriesPreview();
    getTrendingMoviesPreview();
    getRandomMoviesPreview();

    infiniteScroll=getPaginatedRandomMovies;

    getLikedMovies()

}

function categoriesPage(){
    console.log('categories');

    window.scroll(0,0);
    // headerSection.classList.remove('header-container--long');
    // headerSection.style.background='';
    posterPath.classList.remove('poster');

    headerArrow.classList.remove('inactive');
    headerArrow.classList.remove('header-arrow--white');
    trendingMoviesPreviewListTitle.classList.add('inactive')


    headerTitle.classList.add('inactive')
    headerTitleCategoryViewer.classList.remove('inactive');
    searchForm.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');

    genericListSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');

    likedMoviesArticle.classList.add('inactive');
    likedTitle.classList.add('inactive');
    favoriteMoviesContainer.classList.add('inactive');


    footer.classList.remove('inactive')

    
    const [_,categoryData]=location.hash.split('=') //change the hash to array   ['#category' ,'id-name']
    
    const [categoryId,categoryName]=categoryData.split('-');//['id','categoryName'];
    
    headerTitleCategoryViewer.innerText=categoryName;
    getMoviesByCategory(categoryId);
    page=1;
    //se le agrega el argumento ya que para aprovechar el closures 
    //ya que se ejecuta la primera fucnion y ya hasta que se active el evento 
    //se ejecutara la funcion que esta dentro 
    infiniteScroll=getPaginatedCategoryMovies(categoryId);


}

function searchPage(){
    console.log('search');
    window.scroll(0,0);

    
    // headerSection.classList.remove('header-container--long');
    // headerSection.style.background='';
    posterPath.classList.remove('poster');
    trendingMoviesPreviewListTitle.classList.add('inactive')

    headerArrow.classList.remove('inactive');
    headerArrow.classList.remove('header-arrow--white');

    headerTitle.classList.add('inactive')
    headerTitleCategoryViewer.classList.add('inactive');
    searchForm.classList.remove('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');

    genericListSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');
    
    likedMoviesArticle.classList.add('inactive');
    likedTitle.classList.add('inactive');
    favoriteMoviesContainer.classList.add('inactive');


    footer.classList.remove('inactive')

    // ['#search' ,'query']
    let [_,query]=location.hash.split('=') //change the hash to array   
    query =query.replaceAll('%20',' ');
    getMoviesBySearch(query);
    // console.log('query =',query);
    page=1;
    //se le agrega el argumento ya que para aprovechar el closures 
    //ya que se ejecuta la primera fucnion y ya hasta que se active el evento 
    //se ejecutara la funcion que esta dentro 
    infiniteScroll= getPaginatedSearchMovies(query);
}
function movieDetailPage(){
    console.log('Movie');
    window.scroll(0,0);


    posterPath.classList.add('poster');
    // headerSection.style.background='';
    headerArrow.classList.remove('inactive');
    headerArrow.classList.add('header-arrow--white');
    trendingMoviesPreviewListTitle.classList.add('inactive')


    headerTitle.classList.add('inactive')
    headerTitleCategoryViewer.classList.add('inactive');
    searchForm.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');

    genericListSection.classList.add('inactive');
    movieDetailSection.classList.remove('inactive');

    likedMoviesArticle.classList.add('inactive');
    likedTitle.classList.add('inactive');
    favoriteMoviesContainer.classList.add('inactive');

    footer.classList.add('inactive')
    //get ID 
    
    const [_,movieId]=location.hash.split('=') //change the hash to array   ['#category' ,'id-name']
    
    const [id,movieName]=movieId.split('-');//['id','categoryName'];

    // console.log(id)

    getMovieById(id);

}

// function trendsPage(){  
//     console.log('trends');
// }