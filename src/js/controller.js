import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/results.view.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarkView.js';
import addRecipeView from './views/addRecipeView.js';
// import previewView from './previewView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';



const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;

    recipeView.renderSpinner();

    resultsView.update(model.getSearchResultPage());

    await model.loadRecipe(id);

    recipeView.render(model.state.recipe);


    bookmarksView.update(model.state.bookmarks);

  } catch (er) {
    recipeView.renderError();
    console.error(er);
  }




};


const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();

    const query = searchView.getQuery();
    if (!query) return;

    await model.loadSearchResults(query);

    resultsView.render(model.getSearchResultPage());

    paginationView.render(model.state.search);
  } catch (er) {
    console.log(er);
  }
};
const controlPagination = function (goToPage) {
  resultsView.render(model.getSearchResultPage(goToPage));

  paginationView.render(model.state.search);
  console.log(model.state.search);
  console.log(goToPage);
};

const controlServings = function (newServings) {
  model.updateServings(newServings);

  recipeView.update(model.state.recipe);

};

const controlAddBookmark = function(){
  if(!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else
    model.deleteBookmark(model.state.recipe.id);


  recipeView.update(model.state.recipe);

  bookmarksView.render(model.state.bookmarks);
}


const controlBookmarks = function(){
  bookmarksView.render(model.state.bookmarks);
}

const controlAddRecipe = async function(newRecipe){
  try{

    addRecipeView.renderSpinner();


    await model.uploadRecipe(newRecipe);

    recipeView.render(model.state.recipe);

  addRecipeView.renderMessage();

  bookmarksView.render(model.state.bookmarks);

    window.history.pushState(null, '', `#${model.state.recipe.id}`);
    setTimeout(function(){
      addRecipeView.toggleWindow()
    }, 2500)

  }catch(er){
    console.error('🎃',er);
    addRecipeView.renderError(er.message);
  }

}



const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe)
};

init();


