/* Default bavaues */
let category = "general";
let key = "be742a137e37651f23d6b8b82293d6b7";
let country = "any";
let keyword = "none";
let categories = ["All", "world", "nation", "business", "technology", "entertainment", "sports", "science", "health",];


const newsContainer = document.querySelector(".news-container");
const categoriesContainer = document.querySelector('.news-categories');

// creating news card

const cardFectching = (data) => {
    newsContainer.innerHTML = "";
    data.forEach(news => {
        const isoDate = `${news.publishedAt}`;
        const normalDate = new Date(isoDate);

        const formattedDate = `${normalDate.toLocaleDateString()} ${normalDate.toLocaleTimeString()}`;
        console.log(news.description);
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
    <div class="title">
                <h3>${news.title}</h3>
            </div>
            <div class="image"><img src=${news.image} alt="helllo hello test 1.."></div>
            <div class="about">
                <h3>${news.description}</h3>
            </div>
            <div style="display: flex; justify-content: space-between;">
                <a href=${news.url} style="color: tan; font-size: 1.2em; padding: 10px; margin-left: 20px; ">Read more</a>
                <h4>${formattedDate}</h4>
            </div>

    `;
        newsContainer.appendChild(card);

    });

};

//

// fecting api data


const loadWindow = () => {
    let reqUrl = `https://gnews.io/api/v4/top-headlines?lang=en&country=${country}&category=${category}&q=${keyword}&apikey=${key}`;

    fetch(reqUrl)
        .then(function (response) {
            return response.json();
        }).then((data) => {
            cardFectching(data.articles);
        });

};


loadWindow();
// categories loader
const catergoryLoader = () => {
    categoriesContainer.innerHTML = "";
    categories.forEach(lcategory => {
        const div = document.createElement("h2");
        div.addEventListener("click", () => {
            category = lcategory;
            loadWindow();
        });
        div.innerHTML = `<a>${lcategory}</a>`;
        categoriesContainer.appendChild(div);

    })
};

catergoryLoader();


// Country chnage feture

const selectedCountry = document.querySelector("#selectCountry");

selectedCountry.addEventListener("click", () => {
    country = selectedCountry.value;
    category = "general";
    loadWindow();

});

// Seach keyword function 

const searchBtn = document.querySelector(".sicon");
const kword = document.querySelector("#kword");
searchBtn.addEventListener("click", () => {
    keyword = kword.value;
    category = "general";
    loadWindow();
});