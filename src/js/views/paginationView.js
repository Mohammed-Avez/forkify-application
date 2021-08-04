import View from './View.js';
import icons from 'url:../../img/icons.svg';


class PaginationView extends View{
    _parentElement = document.querySelector('.pagination');

    addHandlerClick(handler){
        this._parentElement.addEventListener('click', function(e){
            const btn = e.target.closest('.btn--inline');
            console.log(btn);
            const goToPage = +btn.dataset.goto;
            handler(goToPage);

            
        });
    }

    _generateMarkup(){
        const curPage = this._data.page;
        const numPages = Math.ceil(this._data.results.length / this._data.resultsPerPage);

        if(curPage === 1 && numPages > 1){

            return this._generateMarkupButtonRight(curPage);
         
        }

        if(curPage === numPages && numPages > 1){
                     console.log(`Current page = ${curPage}, totlNumPages = ${numPages}`);
                return this._generateMarkupButtonLeft(curPage);
            ;
        }

        if(curPage < numPages){
               console.log(`Current page = ${curPage}, totlNumPages = ${numPages}`);
      
            return `
                ${this._generateMarkupButtonLeft(curPage)} ${this._generateMarkupButtonRight(curPage)}
            `
        }

        return '';

    }

    _generateMarkupButtonLeft(curPage){
        return `
            <button data-goto="${curPage - 1}" class="btn--inline pagination__btn--prev">
                <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
                </svg>
                <span>Page ${curPage - 1}</span>
            </button>
            `
    }
    _generateMarkupButtonRight(curPage){
           return `
                <button data-goto="${curPage + 1}" class="btn--inline pagination__btn--next">
                    <span>Page ${curPage + 1}</span>
                    <svg class="search__icon">
                    <use href="${icons}#icon-arrow-right"></use>
                        </svg>
                </button>
            
            `
    }



}

export default new PaginationView();