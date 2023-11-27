
    // Функция рендеринга изображений в галерее
    export function renderImages(images, lightbox, refs) {
        // refs.gallery.innerHTML = "";

        const imagesMarkup = images.map(image => {
        const { webformatURL, largeImageURL, tags, likes, views, comments, downloads } = image;

        return `
            <a href="${largeImageURL}" class="photo-card">
                <img src="${webformatURL}" alt="${tags}" loading="lazy">
                <div class="info">
                    <p class="info-item"><b>Likes:</b> ${likes}</p>
                    <p class="info-item"><b>Views:</b> ${views}</p>
                    <p class="info-item"><b>Comments:</b> ${comments}</p>
                    <p class="info-item"><b>Downloads:</b> ${downloads}</p>
                </div>
            </a>
        `;
    }).join("");

    refs.gallery.insertAdjacentHTML("beforeend", imagesMarkup);

    lightbox.refresh(); // Обновляем галерею Lightbox
}

    // Функция создания информационного элемента

    export function createInfoItem(label, value) {
        const infoItem = document.createElement("p");
        infoItem.classList.add("info-item");
        infoItem.innerHTML = `<b>${label}:</b> ${value}`;
        return infoItem;
    }

