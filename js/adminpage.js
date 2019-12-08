document.addEventListener("DOMContentLoaded", function () {
    let allNews = [];

    document.getElementById("send-news").addEventListener("click", sendNews);
    document.getElementById("send-img").addEventListener("click", addImg);
    window.addEventListener("online", function (event) {
        provider.get("news", (news) => {
            if (news) {
                allNews = news;
            }
            sendNewsToServer(allNews);
            provider.remove("news");
            allNews = [];
        });
    });


    provider.get("news", (news) => {
        if (news) {
            allNews = news;
        }
    });

    function addImg() {
        let img = document.getElementById("news-img").getAttribute("src");
        return img;
    }

    function sendNews() {
        let title = document.getElementById("news-title").value;
        let titletext = title.replace(/ /g, '');
        let body = document.getElementById("news-body").value;
        let bodytext = body.replace(/ /g, '');
        let uploadedimg = addImg();
        if (bodytext !== '' && titletext !== '') {
            if (isOnline()) {
                alert("Successfully sent to Asgore's server!");
            } else {
                allNews.push({img: uploadedimg, title: title, body: body });
                provider.add("news", allNews);
                alert("Saved to underground's storage");
            }
        } else {
            alert("Shenanigans corrupted input!");
        }
        clean();
    }

    function clean() {
        document.getElementById("news-title").placeholder = "Title";
        document.getElementById("news-title").value = '';
        document.getElementById("news-body").placeholder = "Body";
        document.getElementById("news-body").value = '';
    }  

    function isOnline() {
        return window.navigator.onLine;
    }

    function sendNewsToServer(allNews) {
        if (allNews.length) {
            alert("Successfully set to underground server!")
        }
    }
});


