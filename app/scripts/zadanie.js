function onClickFailure(){
    document.querySelector(".status-input").value = "FAILURE";
}

function onClickSuccess(){
    document.querySelector(".status-input").value = "SUCCESS";
}

function addFriend(elem){
    document.querySelector(".scroll-list").appendChild(elem.parentNode);
    elem.classList.add('red');
    elem.classList.remove('green');
    elem.textContent = "Usuń";
    elem.addEventListener("click", function(){removeFriend(elem)})
}

function removeFriend(elem){
    document.querySelectorAll(".scroll-list")[1].appendChild(elem.parentNode);
    elem.classList.add('green');
    elem.classList.remove('red');
    elem.textContent = "Dodaj";
    elem.addEventListener("click", function(){addFriend(elem)})
}

function onSubmit(event){
    event.preventDefault()
    friends = '['

    list = Array.from(document.querySelectorAll(".friends > .scroll-list > .friend-elem > .friend-nick")).map(e => e.textContent)
    for(var nick of list){
        friends += `"${nick}",`
    }
    friends = friends.substring(0, friends.length - 1);
    friends += ']'

    document.querySelector(".friends-input").value = friends
    document.querySelector("form").submit();
}