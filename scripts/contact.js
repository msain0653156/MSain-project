// data for review section.
var reviewers = ["Ava", "Noah", "Mia"];
var reviewDates = ["4/1/2026", "4/5/2026", "4/7/2026"];
var reviewRatings = [5, 4, 5];
var reviewTitles = [
    "Relaxing stay",
    "Friendly staff",
    "Peaceful weekend"
];
var reviewTexts = [
    "The stay was relaxing, and the room was clean and quiet. I loved the hiking recommendations!",
    "Great service and beautiful views. The staff was friendly and helpful.",
    "Perfect place for a weekend getaway. The breakfast was delicious and the bed was very comfortable."
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
