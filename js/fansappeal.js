document.addEventListener("DOMContentLoaded", function () {
    let allComments = [];

    document.getElementById("send").addEventListener("click", addComment);
    window.addEventListener("online", function (event) {
        provider.get("comments", (comments) => {
            if (comments) {
                allComments = comments;
            }
            sendAllComments(allComments);
            getAllComments(allComments);
            provider.remove("comments")
            allComments = [];
        });
    });

    provider.get("comments", (comments) => {
        if (comments) {
            allComments = comments;
        }
    });
    if (isOnline()) {
        sendAllComments(allComments);
        provider.remove("comments");
        allComments = [];

        let req = new XMLHttpRequest();
        req.open("GET", "/comments", true);
        req.send();
        req.onreadystatechange = function () {
            if (req.readyState === XMLHttpRequest.DONE) {
                if (req.status != 200) {
                    console.log("bad request");
                } else {
                    let data = JSON.parse(req.responseText);
                    getAllComments(data);
                }
            }
        };
    }

    function addComment() {
        let text = document.getElementById("input-area").value;
        let username = getUsername();
        const time = new Date();
        let usertext = document.getElementById("input-area").value;
        let checktext = usertext.replace(/ /g, '');
        if (checktext === '') {
            alert("well, that's bad, it's empty!");
            clean();
            return false;
        }
        if (isOnline()) {
            sendComment(username, time, text);
            getComment(username, time, text);
            alert("Successfully sent to Asgore's server");
        } else {
            allComments.push({user: username, time: time, comment: text});
            provider.add("comments", allComments);
            alert("Saved to underground storage");
        }
        clean();
    }

    function getComment(name, time, text) {
        let divRow = document.createElement("div");
        divRow.className = "row d-flex justify-content-center";

        let commentInfo = document.createElement("p");
        commentInfo.className = "lead border border-white col-3";
        commentInfo.style.cssText = "margin-bottom:0; background-color:rgb(31, 31, 31)";
        commentInfo.innerHTML = name + "<br>" + time.getHours() + ":" + time.getMinutes() + "<br>" + time.getDate() + "/" + (time.getMonth() + 1) + "/" + time.getFullYear() + "<hr>";
        
        let commentText = document.createElement("div");
        commentText.className = "lead border border-white col-6";
        commentText.style.cssText = "background-color:rgb(31, 31, 31)";
        commentText.innerHTML = text;

        divRow.appendChild(commentInfo);
        divRow.appendChild(commentText);
        let block = document.getElementById("comments-section");
        block.appendChild(divRow);
    }

    function clean() {
        document.getElementById("input-area").placeholder = "hyeh hyeh hyeh?";
        document.getElementById("input-area").value = '';
    }

    function getUsername() {
        let name = prompt("Howdy! What's your username?", "Fallen child");
        check = name.replace(/ /g, '');
        if (check === '') {
            return "eh, you need to username yourself."
        } else {
            return name;
        }
    }

    function sendComment(name, time, text) {
        fetch("/comments", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({name: name, time: time, text: text}),
        })
            .catch(error => console.error("Cannot fetch data:", error));
    }

    function getAllComments(allAppeals) {
        for (let i = 0; i < allAppeals.length; i++) {
            getComment(allAppeals[i].name, new Date(allAppeals[i].time), allAppeals[i].text)
        }
    }

    function sendAllComments(allComments) {
        for (let i = 0; i < allComments.length; i++) {
            sendComment(allComments[i].name, new Date(allComments[i].time), allComments[i].text)
        }
    }
});