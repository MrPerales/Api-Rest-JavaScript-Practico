window.addEventListener('DOMContentLoaded',navigator,false);
window.addEventListener('hashchange',navigator,false);

searchBtn.addEventListener('click',()=>{
    location.hash='#search=';
})

headerArrow.addEventListener('click',()=>{
    location.hash='#home';
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

    headerSection.classList.remove('header-container--long');
    headerSection.style.background='';
    headerArrow.classList.add('inactive');
    headerArrow.classList.remove('header-arrow--white');


    headerTitle.classList.remove('inactive')
    headerTitleCategoryViewer.classList.add('inactive');
    searchForm.classList.remove('inactive');

    trendingPreviewSection.classList.remove('inactive');
    categoriesPreviewSection.classList.remove('inactive');

    genericListSection.classList.add('inactive');
    movieDetailSection.classList.add('inactive');

    getTrendingMoviesPreview();
    getCategoriesPreview();
    getRandomMoviesPreview();




}

function categoriesPage(){
    console.log('categories');

    headerSection.classList.remove('header-container--long');
    headerSection.style.background='';
    headerArrow.classList.remove('inactive');
    headerArrow.classList.remove('header-arrow--white');


    headerTitle.classList.add('inactive')
    headerTitleCategoryViewer.classList.remove('inactive');
    searchForm.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');

    genericListSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');
}

function searchPage(){
    console.log('search');
    
    headerSection.classList.remove('header-container--long');
    headerSection.style.background='';
    headerArrow.classList.remove('inactive');
    headerArrow.classList.remove('header-arrow--white');

    headerTitle.classList.add('inactive')
    headerTitleCategoryViewer.classList.remove('inactive');
    searchForm.classList.remove('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');

    genericListSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');


}
function movieDetailPage(){
    console.log('Movie');

    headerSection.classList.add('header-container--long');
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
}
// function trendsPage(){  
//     console.log('trends');
// }