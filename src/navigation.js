window.addEventListener('DOMContentLoaded',navigator,false);
window.addEventListener('hashchange',navigator,false);

searchBtn.addEventListener('click',()=>{
    location.hash=`#search=${searchInput.value}`;
})

headerArrow.addEventListener('click',()=>{
    window.history.back();
});


function navigator(){
    console.log([location]);

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
}

function homePage(){
    console.log('home');

    posterPath.classList.remove('poster');
    // headerSection.style.background='';
    headerArrow.classList.add('inactive');
    headerArrow.classList.remove('header-arrow--white');


    headerTitle.classList.remove('inactive')
    headerTitleCategoryViewer.classList.add('inactive');
    searchForm.classList.remove('inactive');

    trendingPreviewSection.classList.remove('inactive');
    categoriesPreviewSection.classList.remove('inactive');

    genericListSection.classList.add('inactive');
    movieDetailSection.classList.add('inactive');

    footer.classList.remove('inactive')

    


    getCategoriesPreview();
    getTrendingMoviesPreview();
    getRandomMoviesPreview();




}

function categoriesPage(){
    console.log('categories');

    window.scroll(0,0);
    // headerSection.classList.remove('header-container--long');
    // headerSection.style.background='';
    posterPath.classList.remove('poster');

    headerArrow.classList.remove('inactive');
    headerArrow.classList.remove('header-arrow--white');


    headerTitle.classList.add('inactive')
    headerTitleCategoryViewer.classList.remove('inactive');
    searchForm.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');

    genericListSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');

    footer.classList.remove('inactive')

    
    const [_,categoryData]=location.hash.split('=') //change the hash to array   ['#category' ,'id-name']
    
    const [categoryId,categoryName]=categoryData.split('-');//['id','categoryName'];
    
    headerTitleCategoryViewer.innerText=categoryName;
    getMoviesByCategory(categoryId);

}

function searchPage(){
    console.log('search');
    window.scroll(0,0);

    
    // headerSection.classList.remove('header-container--long');
    // headerSection.style.background='';
    posterPath.classList.remove('poster');

    headerArrow.classList.remove('inactive');
    headerArrow.classList.remove('header-arrow--white');

    headerTitle.classList.add('inactive')
    headerTitleCategoryViewer.classList.add('inactive');
    searchForm.classList.remove('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');

    genericListSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');
    
    footer.classList.remove('inactive')

    // ['#search' ,'query']
    let [_,query]=location.hash.split('=') //change the hash to array   
    query =query.replaceAll('%20',' ');
    getMoviesBySearch(query);
}
function movieDetailPage(){
    console.log('Movie');
    window.scroll(0,0);


    posterPath.classList.add('poster');
    // headerSection.style.background='';
    headerArrow.classList.remove('inactive');
    headerArrow.classList.add('header-arrow--white');

    headerTitle.classList.add('inactive')
    headerTitleCategoryViewer.classList.add('inactive');
    searchForm.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');

    genericListSection.classList.add('inactive');
    movieDetailSection.classList.remove('inactive');

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