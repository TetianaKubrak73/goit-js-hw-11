
    // Функция рендеринга изображений в галерее
    export function renderImages(images, lightbox, refs) {
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

    export function createInfoItem(label, value) {
        const infoItem = document.createElement("p");
        infoItem.classList.add("info-item");
        infoItem.innerHTML = `<b>${label}:</b> ${value}`;
        return infoItem;
    }

