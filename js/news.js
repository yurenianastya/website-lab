document.addEventListener("DOMContentLoaded", function () {
    let allNews = [];

    window.addEventListener("online", function (event) {
        provider.get("news", (news) => {
            if (news) {
                allNews = news;
            }
            sendAllNews(allNews);
            getNews(allNews);
            provider.remove("news");
            allNews = [];
        });
    });

    provider.get("news", (news) => {
        if (news) {
            allNews = news;
        }
    });

    if (isOnline()) {
        sendAllNews(allNews);
        provider.remove("news");
        allNews = [];

        let req = new XMLHttpRequest();
        req.open("GET", "/news", true);
        req.send();
        req.onreadystatechange = function () {
            if (req.readyState === XMLHttpRequest.DONE) {
                if (req.status != 200) {
                    console.log("REQUEST FAILED!");
                }
                else {
                    let data = JSON.parse(req.responseText);
                    getNews(data);
                }
            }
        };
    }

    function addNews(img, title, body) {
        const newscard = document.createElement("p");
        newscard.className = "col-lg-4 col-md-6 col-sm-12";
        newscard.innerHTML = img + "<br><strong>" + title + "</strong></br>" + body;
        document.getElementById("news").appendChild(newscard);
    }

    function getNews(allNews) {
        for (let i = 0; i < allNews.length; i++) {
            addNews(allNews[i].img, allNews[i].title, allNews[i].body);
        }
    }

    function sendNewsToServer(img, title, body) {
        fetch("/news", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({ img: img, title: title, body: body }),
        })
            .catch(error => console.error("Cannot fetch data:", error));
    }

    function sendAllNews(allNews) {
        for (let i = 0; i < allNews.length; i++) {
            sendNewsToServer(allNews[i].imgSrc, allNews[i].title, allNews[i].body)
        }
    }
});