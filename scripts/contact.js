// data for review section.
var reviewers = ["Ava", "Noah", "Mia"];
var reviewDates = ["4/1/2026", "4/5/2026", "4/7/2026"];
var reviewRatings = [5, 4, 5];
var reviewTitles = [
    "Neon Nights Made Easy",
    "Sleek, Smooth Service",
    "City Escape Perfection"
];
var reviewTexts = [
    "The room pulsed with color and the city views were incredible. The tech-forward amenities made it feel like a futuristic hideaway.",
    "The staff were efficient, welcoming, and full of local recommendations. I loved the rooftop lounge and the glowing atmosphere.",
    "A perfect urban retreat with comfy bedding, immersive lighting, and a delicious neon breakfast spread. Highly recommend for stylish travelers."
];

function starText(rating) {
    var stars = "";
    for (var i = 1; i <= rating; i++) {
        stars = stars + "★";
    }
    return stars;
}

function showReviews() {
    var reviewSection = document.getElementById('review-list');
    var reviewCode = "";

    for (var i = 0; i < reviewers.length; i++) {
        reviewCode = reviewCode + '<div class="review-card">';
        reviewCode = reviewCode + '<h4>' + reviewTitles[i] + '</h4>';
        reviewCode = reviewCode + '<p><strong>' + reviewers[i] + '</strong> - ' + reviewDates[i] + '</p>';
        reviewCode = reviewCode + '<p>' + starText(reviewRatings[i]) + '</p>';
        reviewCode = reviewCode + '<p>"' + reviewTexts[i] + '"</p>';
        reviewCode = reviewCode + '</div>';
    }

    reviewSection.innerHTML = reviewCode;
}

window.onload = function() {
    showReviews();
};
