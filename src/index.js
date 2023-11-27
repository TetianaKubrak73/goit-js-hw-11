import { fetchResult } from "./fetchResult";
import { renderImages, createInfoItem } from "./galleryMarkup";
import Notiflix, { Notify } from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const refs = {
    searchForm: document.querySelector(".search-form"),
    loadMoreButton: document.querySelector(".load-more"),
    gallery: document.querySelector(".gallery"),
};

const lightbox = new SimpleLightbox('.gallery a');
let currentPage = 1;
let searchQuery = "";
let totalHits = hits.data.totalHits;

refs.searchForm.addEventListener("submit", handleSubmit);
refs.loadMoreButton.addEventListener("click", handleLoadMore);


// // Функция обработки отправки формы
function handleSubmit(event) {
    event.preventDefault();
    searchQuery = event.currentTarget.elements.searchQuery.value.trim();
    Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
    if (searchQuery === "") {
        Notiflix.Notify.failure('Please enter a search query');
        return;
        
    }
    
    // Очищаем галерею перед новым запросом
    refs.gallery.innerHTML = "";
    currentPage = 1; // Сбрасываем страницу на 1

    performSearch();
    
}
// // Функция обработки клика по кнопке "Load More"
function handleLoadMore() {
    currentPage += 1;
    performSearch();
    
}
// Вызываем функцию для загрузки следующей порции изображений
function performSearch() {
    fetchResult(searchQuery, currentPage)
        .then(images => {
            if (images.length === 0) {
                showLoadMoreButton(false);
                Notiflix.Notify.info("Sorry, there are no images matching your search query. Please try again.");
            } else {
                renderImages(images, lightbox, refs);
                showLoadMoreButton();
            }
        })
        .catch(error => {
            console.error("Error handling load more:", error);
            Notiflix.Notify.failure('Oops! Something went wrong while loading more images. Please try again.');
            showLoadMoreButton(false);
        });
}
// Функция отображения/скрытия кнопки "Load More"
function showLoadMoreButton(totalHits, per_page) {
    const loadMoreButton = refs.loadMoreButton;

    if (totalHits < currentPage * per_page) {
        loadMoreButton.style.display = 'block';
    } else {
        loadMoreButton.style.display = 'none';
        Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
    }
}
