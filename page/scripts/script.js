//Borrowed script from codepen ;)
// The tabs or small thumbnails of the images.
const tabs = document.querySelectorAll(".GalleryTab");
const tabOpacity = 0.7;
// The images that will be changed.
const galleryImage = document.querySelectorAll(".GalleryImage");
// First image to show.
let currentImage = 0;
// Pause time on image user has clicked.
const imagePauseTime = 10000;
// Normal pause time for automatic change.
const nextImageTime = 4000;

let imageTimer = 0;
let timerTimeOut = 0;

function ImageChanger() {
    // set the opacity for each tab back to semi-opacity. Set the main images to be hidden.
    tabs.forEach(function (value, i, arr) {
        tabs[i].style.opacity = tabOpacity;
        tabs[i].style.filter = "grayscale(1)";
        tabs[i].style.filter = "gray";
        tabs[i].style.filter = "blur(0.6px)";
        galleryImage[i].style.display = "none";
    });

    // Now set the current tab to be solid.
    tabs[currentImage].style.opacity = "1";
    tabs[currentImage].style.filter = "grayscale(0)";
    tabs[currentImage].style.filter = "none";

    // unhide the main image that should be shown
    galleryImage[currentImage].style.display = "flex";

    // Check if the current banner is more than the total of the amount in the array, if it is then go back to 0.
    currentImage >= galleryImage.length - 1 ? (currentImage = 0) : currentImage++;
}

function ImagePause() {
    // clear the auto banner changer timer.
    clearInterval(imageTimer);
    // In case the user has clicked a tab multiple times, make sure we're only running the latest timeout to stop multiple instances of the interval timer being created.
    clearTimeout(timerTimeOut);
    timerTimeOut = setTimeout(function () {
        // Manually fire off the banner change function since we've come to the end of the pause period.
        ImageChanger();
        // Start the bannerTimer interval to take over firing the bannerChange function automatically.
        imageTimer = setInterval(ImageChanger, nextImageTime);
    }, imagePauseTime);
}

// ie polyfill for .forEach()
(function () {
    if (typeof NodeList.prototype.forEach === "function") return false;
    NodeList.prototype.forEach = Array.prototype.forEach;
})();

// Setup and start an interval to go through the banners automatically.
imageTimer = setInterval(ImageChanger, nextImageTime);

// For each of the tabs, set up a click event handler to change the banner image.
tabs.forEach(function (value, i, arr) {
    arr[i].addEventListener("click", function () {
        currentImage = i;
        ImageChanger();
        // Run a timeout to 'pause' the banner changes, on completion set up a new interval timer.
        ImagePause();
    });
});
// Run the banner changer to display the first banner since the document is now loaded but the timer hasn't yet fired.
ImageChanger();

