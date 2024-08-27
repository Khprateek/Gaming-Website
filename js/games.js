document.addEventListener('DOMContentLoaded', () => {
    function scrollLeft() {
        document.querySelector('.row').scrollBy({
            left: -200,
            behavior: 'smooth'
        });
    }

    function scrollRight() {
        document.querySelector('.row').scrollBy({
            left: 200,
            behavior: 'smooth'
        });
    }

    document.querySelector('.scroll-button.left').addEventListener('click', scrollLeft);
    document.querySelector('.scroll-button.right').addEventListener('click', scrollRight);
});
