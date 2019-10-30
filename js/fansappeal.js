document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("send").addEventListener("click", addComment);
    document.getElementById("send").addEventListener("click", clean);
});

function addComment () {
    let input = (document.getElementById("input-area")).value;
    let text = input.replace(/ /g, '');
    if (text === '') {
        alert('This one is FULL OF NOTHING');
        return false;
    }
    let new_comment_section = document.createElement('div');
    let new_comment_text= document.createElement('p');
    let new_comment_author= document.createElement('p');

    new_comment_section.className = 'text-center text-light row d-flex justify-content-center';
    new_comment_text.className = 'lead border border-white col-6';
    new_comment_author.className = 'lead border border-white col-3';

    new_comment_text.style.cssText = 'background-color:rgb(31, 31, 31)';
    new_comment_author.style.cssText = 'background-color:rgb(31, 31, 31)';

    
    let pName = document.createElement('p');
    pName.innerHTML = currentName();
    let pTime = document.createElement('p');
    pTime.innerHTML = currentTime();
    let pDate = document.createElement('p');
    pDate.innerHTML = currentDate();

    let pText = document.createElement('p');
    pText.textContent = input;
    let hr = document.createElement('hr');

    let comments = document.getElementById('comments-section');
    comments.appendChild(new_comment_section);
    new_comment_section.appendChild(new_comment_author);
    new_comment_section.appendChild(new_comment_text);
    new_comment_text.appendChild(pText);
    new_comment_author.appendChild(pName);
    new_comment_author.appendChild(pTime);
    new_comment_author.appendChild(pDate); 
    comments.appendChild(hr);

}

function clean() {
    document.getElementsByClassName("form-control").placeholder = "Dare to write an appeal...?";
    document.getElementsByClassName("form-control").value = '';
}

function currentTime() {
    let now = new Date();
    return now.getHours() + ":" + now.getMinutes();
}

function currentDate() {
    let now = new Date();
    let month = 1 + now.getMonth();
    return now.getDate() + "/" + month + "/" + now.getFullYear();
}

function currentName() {
    return prompt("You there! Name yourself!", "");
}