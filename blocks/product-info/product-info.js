import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
    // Create a container for the product info
    const container = document.createElement('div');
    container.className = 'product-info-container';

    [...block.children].forEach((row) => {
        const productItem = document.createElement('div');
        productItem.className = 'product-item';

        // Determine column mapping based on available columns
        let imageDiv, altDiv, nameDiv, descDiv, priceDiv;

        if (row.children.length >= 5) {
            // 5 columns: Image, Alt, Name, Description, Price
            [imageDiv, altDiv, nameDiv, descDiv, priceDiv] = row.children;
        } else if (row.children.length >= 4) {
            // 4 columns (Legacy): Image, Name, Description, Price
            [imageDiv, nameDiv, descDiv, priceDiv] = row.children;
            // altDiv is undefined, will be handled below
        }

        if (imageDiv && nameDiv && descDiv && priceDiv) {
            // Image
            imageDiv.className = 'product-image';
            const img = imageDiv.querySelector('img');
            if (img) {
                let altText = img.alt;
                if (altDiv && altDiv.textContent.trim()) {
                    altText = altDiv.textContent.trim();
                }
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
