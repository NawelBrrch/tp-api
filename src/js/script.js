const endpoint = "https://newsapi.org/v2";
const API_key = "519203cf48914461a65a6d8908306907";
const proxyUrl = 'https://cors-anywhere.herokuapp.com/'

const $searchButton = document.getElementById('searchButton');

const $search_form1 = document.querySelector('.search-form1')
const $language = document.getElementById('language');
const $pageSize = document.getElementById('pageSize');
const $sortBy = document.getElementById('sortBy');



const $search_form2 = document.querySelector('.search-form2')
const $country = document.getElementById('country');
const $category = document.getElementById('category');


let $articlesContainer = document.getElementById('articlesContainer');


let keywords;
let language;
let pageSize;
let sortBy;

let country;
let category;
let targetUrl;

// FORM 1
$search_form1.addEventListener('submit', (e) => {
  e.preventDefault();
  getArticles();
  });

// FORM 2
$search_form2.addEventListener('submit', (e) => {
  e.preventDefault();
  getArticles2();
  });

// Fetch articles from API from Form 1
function getArticles() {
  createElement({type: 'h2', text: 'Is Loading', parent: $articlesContainer});

  fetch(proxyUrl + getArticlesUrlForm1())
      .then(res => res.json())
      .then(data => {
        let articles = data.articles;
        showArticles(articles);
      });
}

// Fetch articles from API from Form 2
function getArticles2() {
  createElement({type: 'h2', text: 'Is Loading', parent: $articlesContainer});

  fetch(proxyUrl + getArticlesUrlForm2())
      .then(res => res.json())
      .then(data => {
        let articles = data.articles;
        showArticles(articles);
      });
}

// include params inside API URL for Form 1
function getArticlesUrlForm1() {
  keywords = document.querySelector('.search').value;
  if((!keywords)) {
    alert(" Merci de renseigner un mot clé ou une catégorie");
  }else{
    let queryKeywords = `q=${keywords}`;
    return `${endpoint}/everything?${queryKeywords}${getLanguage()}${getPageSize()}${getSortBy()}&apiKey=${API_key}`;
  }
}

// include params inside API URL for Form 2
function getArticlesUrlForm2() {
  country = document.getElementById('country').value;
  if((!country)) {
    alert(" Merci de renseigner un pays");
  }else{
    let queryCountry = `country=${country}`;
    return `${endpoint}/top-headlines?${queryCountry}${getCategory()}&apiKey=${API_key}`;
  }
}


// Get Values of selected options
function getLanguage(){
  language = $language.value;
  return language ? `&language=${language}` : '';
}
function getPageSize(){
  pageSize = $pageSize.value;
  return pageSize ? `&pageSize=${pageSize}` : '';
}
function getSortBy(){
  sortBy = $sortBy.value;
  return sortBy ? `&sortBy=${sortBy}` : '';
}

function getCategory(){
  category = $category.value;
  return category ? `&category=${category}` : '';

}


// Display articles
function showArticles(articles) {
  $articlesContainer.textContent = '';
  
  const $fragment = document.createDocumentFragment();
  
  articles.forEach(article => $fragment.appendChild(getArticleElement(article)));
  
  $articlesContainer.appendChild($fragment);
}

// Create articles from article object
function getArticleElement(article) {
  const $article = createElement({type: 'article'});

  createElement({type: 'h3', text: article.title, parent: $article});

  createElement({type: 'img', url: article.urlToImage, parent: $article});

  createElement({type: 'p', text: article.description, parent: $article});

  createElement({type: 'a', url: article.url, text: "Lire l'article", parent: $article});

  const publishedAt = new Date(article.publishedAt).toLocaleString();
  const $publishedAt = createElement({
    type: 'time',
    text: publishedAt,
    parent: $article
  });

  $publishedAt.setAttribute('datetime', article.publishedAt);

  return $article;
}

// Create element and append it to the given parent
function createElement(options) {

  const $element = document.createElement(options.type);
  //console.log(typeof(options.type));

  if (options.type === 'img') {
    $element.src = options.url;
  }

  if (options.type === 'a') {
    $element.href = options.url;

  }

  if (options.text) {
    $element.textContent = options.text;  
  }
  
  if (options.parent) {
    options.parent.appendChild($element);
  }
  
  return $element;
}


