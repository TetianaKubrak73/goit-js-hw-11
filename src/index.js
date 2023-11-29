import { fetchResult } from "./fetchResult";
import { renderImages,} from "./galleryMarkup";
import Notiflix from 'notiflix';
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


refs.searchForm.addEventListener("submit", handleSubmit);
refs.loadMoreButton.addEventListener("click", handleLoadMore);

function handleSubmit(event) {
    event.preventDefault();
    searchQuery = event.currentTarget.elements.searchQuery.value.trim();
    currentPage = 1; 
            if (searchQuery === "") {
            Notiflix.Notify.failure('Please enter a search query');
            
            return;
                }
    performSearch(searchQuery, currentPage);
    event.target.reset();
    refs.gallery.innerHTML = "";

}

function handleLoadMore() {
    currentPage += 1;
    performSearch(searchQuery, currentPage);
}

function performSearch(query, page) {
    fetchResult(query, page,)
        .then(response => {
    const { hits, totalHits } = response; 
            if (hits.length === 0) {
                showLoadMoreButton(false);
                Notiflix.Notify.info("We're sorry. No more images to load.");
            } else {
                renderImages(hits, lightbox, refs);
                showLoadMoreButton(hits.length <= 40);
                Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
            }
        })
        .catch(error => {
            const errorMessage = page === 1 ? "form submit" : "load more";
            console.error(`Error handling ${errorMessage}:`, error);
            const errorNotification = page === 1
                ? 'Oops! Something went wrong. Please try again.'
                : 'Oops! Something went wrong while loading more images. Please try again.';
            Notiflix.Notify.failure(errorNotification);
        });
}

function showLoadMoreButton(show) {
    refs.loadMoreButton.style.display = show ? 'block' : 'none';
}
