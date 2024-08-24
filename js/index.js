const hexContainer = document.getElementById('hex-container');
const hexSize = 85; // Size of each hexagon
const hexWidth = hexSize; // Width of each hexagon
const hexHeight = Math.sqrt(3) / 2 * hexSize; // Height of each hexagon
const bumpRadius = 100; // Radius for bump effect in pixels
const horizontalSpacing = 5; // Horizontal space between hexagons in pixels
const verticalSpacing = 0; // Vertical space between rows of hexagons in pixels

function createHexagons() {
    const containerWidth = window.innerWidth;
    const containerHeight = window.innerHeight;
    
    // Calculate the number of rows and columns based on the container size and spacing
    const numRows = Math.ceil(containerHeight / (hexHeight + verticalSpacing));
    const numCols = Math.ceil(containerWidth / (hexWidth + horizontalSpacing));

    for (let row = 0; row < numRows; row++) {
        for (let col = 0; col < numCols; col++) {
            const x = col * (hexWidth + horizontalSpacing);
            const y = row * (hexHeight + verticalSpacing);
            
            // Offset every second row
            const offsetX = (row % 2 === 0) ? 0 : hexWidth * 0.53;
            
            const hex = document.createElement('div');
            hex.className = 'hex';
            hex.style.left = `${x + offsetX}px`;
            hex.style.top = `${y}px`;
            hexContainer.appendChild(hex);
        }
    }
}

function getDistance(x1, y1, x2, y2) {
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}

function handleMouseMove(e) {
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    document.querySelectorAll('.hex').forEach(hex => {
        const rect = hex.getBoundingClientRect();
        const hexX = rect.left + rect.width / 2;
        const hexY = rect.top + rect.height / 2;
        const distance = getDistance(mouseX, mouseY, hexX, hexY);

        // Calculate the scaling factor based on distance
        const maxScale = 1.1; // Reduced maximum scale factor
        const maxDistance = bumpRadius; // Maximum distance for bump effect
        const scale = Math.max(1, 1 + (1 - distance / maxDistance) * (maxScale - 1)); // Scale decreases with distance

        if (distance < bumpRadius) {
            hex.style.transform = `scale(${scale})`; // Apply scaling
        } else {
            hex.style.transform = 'scale(1)'; // Reset scaling
        }
    });
}

window.addEventListener('resize', () => {
    hexContainer.innerHTML = ''; // Clear existing items
    createHexagons(); // Recreate hexagons based on new size
});

createHexagons(); // Initial grid creation
document.addEventListener('mousemove', handleMouseMove);


// -----------------Bg glow ----------------------

document.addEventListener('mousemove', (e) => {
    const glow = document.querySelector('.glow');
    
    // Update position
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    
    glow.style.left = `${mouseX}px`;
    glow.style.top = `${mouseY}px`;
    
    // Apply the expanded class on mouse move
    glow.classList.add('expanded');
});

// Optional: Remove the expanded class when the cursor leaves the viewport
document.addEventListener('mouseleave', () => {
    const glow = document.querySelector('.glow');
    glow.classList.remove('expanded');
});