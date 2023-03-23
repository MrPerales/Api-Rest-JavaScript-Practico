window.addEventListener('DOMContentLoaded',navigator,false);
window.addEventListener('hashchange',navigator,false);


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
    getTrendingMoviesPreview();
    getCategoriesPreview();
    getRandomMoviesPreview();




}
function trendsPage(){  
    console.log('trends');
}

function searchPage(){
    console.log('search');
}
function movieDetailPage(){
    console.log('Movie');
}
function categoriesPage(){
    console.log('categories');
}