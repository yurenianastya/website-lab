document.addEventListener("DOMContentLoaded", function () {
    let allComments = [];

    document.getElementById("send").addEventListener("click", addComment);
    window.addEventListener("online", function (event) {
        provider.get("comments", (comments) => {
            if (comments) {
                allComments = comments;
            }
            sendComments(allComments);
            getComments(allComments);
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
        sendComments(allComments);
        getComments(allComments);
        provider.remove("comments");
        allComments = [];
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
            getComments(username, time, text);
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

    function getComments(allComments) {
        allComments.forEach(function (comment) {
            getComment(comment.user, new Date(comment.time), comment.comment)
        });
    }

    function sendComments(allComments) {
        if (allComments.length) {
            alert("Successfully sent!")
        }
    }
});