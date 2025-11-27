import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
    // Create a container for the product info
    const container = document.createElement('div');
    container.className = 'product-info-container';

    [...block.children].forEach((row) => {
        const productItem = document.createElement('div');
        productItem.className = 'product-item';

        // Expecting 5 columns: Image, Alt, Name, Description, Price
        if (row.children.length >= 5) {
            const imageDiv = row.children[0];
            const altDiv = row.children[1];
            const nameDiv = row.children[2];
            const descDiv = row.children[3];
            const priceDiv = row.children[4];

            // Image
            imageDiv.className = 'product-image';
            const img = imageDiv.querySelector('img');
            if (img) {
                const altText = altDiv.textContent.trim() || img.alt;
                const optimizedPic = createOptimizedPicture(img.src, altText, false, [{ width: '300' }]);
                imageDiv.innerHTML = '';
                imageDiv.append(optimizedPic);
            }

            // Content Container
            const contentDiv = document.createElement('div');
            contentDiv.className = 'product-content';

            // Name
            nameDiv.className = 'product-name';
            const name = document.createElement('h3');
            name.innerHTML = nameDiv.innerHTML;
            contentDiv.append(name);

            // Description
            descDiv.className = 'product-description';
            contentDiv.append(descDiv);

            // Price
            priceDiv.className = 'product-price';
            contentDiv.append(priceDiv);

            productItem.append(imageDiv);
            productItem.append(contentDiv);
        }

        container.append(productItem);
    });

    block.textContent = '';
    block.append(container);
}
