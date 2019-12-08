document.addEventListener("DOMContentLoaded", function () {
    let allNews = [];

    window.addEventListener("online", function (event) {
        provider.get("news", (news) => {
            if (news) {
                allNews = news;
            }
            sendNews(allNews);
            getNews(allNews);
            provider.remove("news");
            allNews = [];
        });
    });

    provider.get("news", (news) => {
        if(news) {
            allNews = news;
        }
    });

    if (isOnline()) {
        sendNews(allNews);
        getNews(allNews);
        provider.remove("news");
        allNews = [];
    }

    function addNews(img, title, body) {
        const newscard = document.createElement("p");
        newscard.className = "col-lg-4 col-md-6 col-sm-12"; 
        newscard.innerHTML = img + "<br><strong>" + title + "</strong></br>" + body;
        document.getElementById("news").appendChild(newscard);
    }

    function getNews(allNews) {
        allNews.forEach(function (news) {
            addNews(news.img, news.title, news.body);
        });
    }

    function sendNews(allNews) {
        if(allNews.length) {
            alert("Successfully sent to underground server!")
        }
    }
});