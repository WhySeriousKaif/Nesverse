// variables
const generalBtn = document.getElementById("genral");
const businessBtn = document.getElementById("business");
const sportsBtn = document.getElementById("sport");
const entertainmentBtn = document.getElementById("entertainment");
const technologyBtn = document.getElementById("technology");
const searchBtn = document.getElementById("searchBtn");

const newsQuery = document.getElementById("newsQuery");
const newsType = document.getElementById("newsType");
const newsdetails = document.getElementById("newsdetails");

// Array
var newsDataArr = [];

// apis
const API_KEY = "fcc1a1cb2a6d4e0d8da433f81c876a8b";
const HEADLINES_NEWS =
  "https://newsapi.org/v2/top-headlines?country=us&apiKey=";
const GENERAL_NEWS =
  "https://newsapi.org/v2/top-headlines?country=us&category=general&apiKey=";
const BUSINESS_NEWS =
  "https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=";
const SPORTS_NEWS =
  "https://newsapi.org/v2/top-headlines?country=us&category=sports&apiKey=";
const ENTERTAINMENT_NEWS =
  "https://newsapi.org/v2/top-headlines?country=us&category=entertainment&apiKey=";
const TECHNOLOGY_NEWS =
  "https://newsapi.org/v2/top-headlines?country=us&category=technology&pageSize=8&apiKey=";
const SEARCH_NEWS = "https://newsapi.org/v2/everything?q=";

// Load headlines on page load
window.onload = function () {
  newsType.innerHTML = "<h4>Headlines</h4>";
  fetchHeadlines();
};

// Event listeners for buttons
generalBtn.addEventListener("click", function () {
  newsType.innerHTML = "<h4>General news</h4>";
  fetchGeneralNews();
});

businessBtn.addEventListener("click", function () {
  newsType.innerHTML = "<h4>Business</h4>";
  fetchBusinessNews();
});

sportsBtn.addEventListener("click", function () {
  newsType.innerHTML = "<h4>Sports</h4>";
  fetchSportsNews();
});

entertainmentBtn.addEventListener("click", function () {
  newsType.innerHTML = "<h4>Entertainment</h4>";
  fetchEntertainmentNews();
});

technologyBtn.addEventListener("click", function () {
  newsType.innerHTML = "<h4>Technology</h4>";
  fetchTechnologyNews();
});

searchBtn.addEventListener("click", function () {
  newsType.innerHTML = "<h4>Search: " + newsQuery.value + "</h4>";
  fetchQueryNews();
});

// Function to fetch headlines
const fetchHeadlines = async () => {
  try {
    console.log("Fetching headlines from:", HEADLINES_NEWS + API_KEY);
    const response = await fetch(HEADLINES_NEWS + API_KEY);

    // Log the response status
    console.log("Response status:", response.status);

    if (response.status >= 200 && response.status < 300) {
      const myJson = await response.json();
      console.log("API Response:", myJson); // Log the full response

      if (!myJson.articles || myJson.articles.length === 0) {
        console.log("No articles found in response");
        newsdetails.innerHTML =
          "<h5>No data found. Please check your API key.</h5>";
        return;
      }
      newsDataArr = myJson.articles;
    } else {
      // Log more detailed error information
      const errorText = await response.text();
      console.error(
        "API Error:",
        response.status,
        response.statusText,
        errorText
      );
      newsdetails.innerHTML = `<h5>Error ${response.status}: Unable to fetch news. Please check your API key.</h5>`;
      return;
    }

    displayNews();
  } catch (error) {
    console.error("Request Error:", error);
    newsdetails.innerHTML =
      "<h5>Unable to fetch news. Check your connection and API key.</h5>";
  }
};

// Function to fetch news of different categories (general, business, sports, etc.)
const fetchGeneralNews = async () => {
  fetchCategoryNews(GENERAL_NEWS);
};

const fetchBusinessNews = async () => {
  fetchCategoryNews(BUSINESS_NEWS);
};

const fetchSportsNews = async () => {
  fetchCategoryNews(SPORTS_NEWS);
};

const fetchEntertainmentNews = async () => {
  fetchCategoryNews(ENTERTAINMENT_NEWS);
};

const fetchTechnologyNews = async () => {
  fetchCategoryNews(TECHNOLOGY_NEWS);
};

// Common function to fetch category news
const fetchCategoryNews = async (url) => {
  try {
    console.log("Fetching news from:", url + API_KEY);
    const response = await fetch(url + API_KEY);

    console.log("Response status:", response.status);

    if (response.status >= 200 && response.status < 300) {
      const myJson = await response.json();
      console.log("API Response:", myJson);

      if (!myJson.articles || myJson.articles.length === 0) {
        console.log("No articles found in response");
        newsdetails.innerHTML =
          "<h5>No data found. Please check your API key.</h5>";
        return;
      }
      newsDataArr = myJson.articles;
    } else {
      const errorText = await response.text();
      console.error(
        "API Error:",
        response.status,
        response.statusText,
        errorText
      );
      newsdetails.innerHTML = `<h5>Error ${response.status}: Unable to fetch news. Please check your API key.</h5>`;
      return;
    }

    displayNews();
  } catch (error) {
    console.error("Request Error:", error);
    newsdetails.innerHTML =
      "<h5>Unable to fetch news. Check your connection and API key.</h5>";
  }
};

// Function to fetch search query news
const fetchQueryNews = async () => {
  if (newsQuery.value == null || newsQuery.value.trim() === "") return;

  try {
    const response = await fetch(
      SEARCH_NEWS + encodeURIComponent(newsQuery.value) + "&apiKey=" + API_KEY
    );

    if (response.status >= 200 && response.status < 300) {
      const myJson = await response.json();
      if (!myJson.articles || myJson.articles.length === 0) {
        console.log("No articles found.");
        newsdetails.innerHTML = "<h5>No data found.</h5>";
        return;
      }
      newsDataArr = myJson.articles;
    } else {
      console.error("API Error:", response.status, response.statusText);
      newsdetails.innerHTML =
        "<h5>Unable to fetch news. Please try again later.</h5>";
      return;
    }

    displayNews();
  } catch (error) {
    console.error("Request Error:", error);
    newsdetails.innerHTML =
      "<h5>Unable to fetch news. Check your connection or API key.</h5>";
  }
};

// Function to display news on the page
function displayNews() {
  newsdetails.innerHTML = "";

  if (newsDataArr.length === 0) {
    newsdetails.innerHTML = "<h5>No news articles available.</h5>";
    return;
  }

  newsDataArr.forEach((news) => {
    var date = news.publishedAt.split("T");

    var col = document.createElement("div");
    col.className = "col-sm-12 col-md-4 col-lg-3 p-2 card";

    var card = document.createElement("div");
    card.className = "p-2";

    var image = document.createElement("img");
    image.setAttribute("height", "matchparent");
    image.setAttribute("width", "100%");
    image.src =
      news.urlToImage || "https://via.placeholder.com/300x200?text=No+Image";

    var cardBody = document.createElement("div");

    var newsHeading = document.createElement("h5");
    newsHeading.className = "card-title";
    newsHeading.innerHTML = news.title;

    var dateHeading = document.createElement("h6");
    dateHeading.className = "text-primary";
    dateHeading.innerHTML = date[0];

    var discription = document.createElement("p");
    discription.className = "text-muted";
    discription.innerHTML = news.description;

    var link = document.createElement("a");
    link.className = "btn btn-dark";
    link.setAttribute("target", "_blank");
    link.href = news.url;
    link.innerHTML = "Read more";

    cardBody.appendChild(newsHeading);
    cardBody.appendChild(dateHeading);
    cardBody.appendChild(discription);
    cardBody.appendChild(link);

    card.appendChild(image);
    card.appendChild(cardBody);

    col.appendChild(card);

    newsdetails.appendChild(col);
  });
}
