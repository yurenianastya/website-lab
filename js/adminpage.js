document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("send").addEventListener("click", validateInput);
});

function validateInput() {
    let newsTitle = document.getElementById("newsTitle").value;
    let newsTitleText = newsTitle.replace(/ /g, '');
    let newsBody = document.getElementById("newsBody").value;
    let newsBodyText = newsBody.replace(/ /g, '');
    if (newsBodyText !== '' && newsTitleText !== '') {
        alert('Task failed successfully');
        return true;
    }else {
        alert('No news for you today, HA');
        return false;
    }
}