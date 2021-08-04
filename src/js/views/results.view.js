import View from './View.js';
// import previewView from './previewView.js';
import previewView from './previewView.js';

import icons from 'url:../../img/icons.svg';


class ResultsView extends View{
    _parentElement = document.querySelector('.results');
    _errorMessage = `There's no recipes, which you have searched!...Try other recipe:)) `;
    _message = '';

      _generateMarkup(){

        return this._data.map( bookmark => previewView.render(bookmark, false)).join('');
    }
};

export default new ResultsView();