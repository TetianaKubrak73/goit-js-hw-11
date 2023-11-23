import { fetchResult } from "./fetchResult";
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

refs.searchForm.addEventListener("submit", handleSubmit);
refs.loadMoreButton.addEventListener("click", handleLoadMore);

// Функция обработки отправки формы
function handleSubmit(event) {
    event.preventDefault();
    const searchQuery = event.currentTarget.elements.searchQuery.value.trim();

    if (searchQuery === "") {
        Notiflix.Notify.failure('Please enter a search query');
        return;
    }

    // Вызываем функцию fetchResult для загрузки изображений
    fetchResult(searchQuery, currentPage)
        .then(images => {
            
            if (images.length === 0) {
                showLoadMoreButton(false);
                Notiflix.Notify.info("We're sorry. No more images to load.");
            } else {
                renderImages(images);
                showLoadMoreButton(images.length <= 40);
            }
        })
        .catch(error => {
            console.error("Error handling form submit:", error);
            Notiflix.Notify.failure('Oops! Something went wrong. Please try again.');
        });
}

// Функция обработки клика по кнопке "Load More"
function handleLoadMore() {
    
    currentPage += 1;

    const searchQuery = refs.searchForm.elements.searchQuery.value.trim();

    // Вызываем функцию fetchResult для загрузки следующей порции изображений
    fetchResult(searchQuery, currentPage)
        .then(images => {
            
            if (images.length === 0) {
                showLoadMoreButton(false);
                Notiflix.Notify.info("We're sorry. No more images to load.");
            } else {
                renderImages(images);
                showLoadMoreButton(images.length <= 40);
            }
        })
        .catch(error => {
            console.error("Error handling load more:", error);
            Notiflix.Notify.failure('Oops! Something went wrong while loading more images. Please try again.');
        });
}

// Функция рендеринга изображений в галерее
function renderImages(images) {
    refs.gallery.innerHTML = ""; 

    images.forEach(image => {
        const { webformatURL, largeImageURL, tags, likes, views, comments, downloads } = image;

        const photoCard = document.createElement("a"); 
        photoCard.href = largeImageURL;
        photoCard.classList.add("photo-card");

        const imageElement = document.createElement("img");
        imageElement.src = webformatURL;
        imageElement.alt = tags;
        imageElement.loading = "lazy";

        const infoContainer = document.createElement("div");
        infoContainer.classList.add("info");

        const likesInfo = createInfoItem("Likes", likes);
        const viewsInfo = createInfoItem("Views", views);
        const commentsInfo = createInfoItem("Comments", comments);
        const downloadsInfo = createInfoItem("Downloads", downloads);

        infoContainer.append(likesInfo, viewsInfo, commentsInfo, downloadsInfo);

        photoCard.append(imageElement, infoContainer);
        refs.gallery.appendChild(photoCard);
    });

    
    lightbox.refresh();
}

// Функция создания информационного элемента
function createInfoItem(label, value) {
    const infoItem = document.createElement("p");
    infoItem.classList.add("info-item");
    infoItem.innerHTML = `<b>${label}:</b> ${value}`;
    return infoItem;
}

// Функция отображения/скрытия кнопки "Load More"
function showLoadMoreButton(show) {
    refs.loadMoreButton.style.display = show ? 'block' : 'none';
}
