function onClickFailure(elem){
    document.querySelector(".status-input").value = "FAILURE";

    var button = Array.from(document.querySelectorAll(".status-button")).filter(b => b != elem)[0]
    elem.classList.remove('red');

    if(button.textContent == "W trakcie"){
        elem.textContent = "Zakończone";
        elem.classList.add('green');
        elem.addEventListener("click", function(){onClickSuccess(elem)})
    }
    else{
        elem.textContent = "W trakcie";
        elem.classList.add('yellow');
        elem.addEventListener("click", function(){onClickProgress(elem)})
    }
}

function onClickSuccess(elem){
    document.querySelector(".status-input").value = "SUCCESS";

    var button = Array.from(document.querySelectorAll(".status-button")).filter(b => b != elem)[0]
    elem.classList.remove('green');

    if(button.textContent == "W trakcie"){
        elem.textContent = "Nieudane";
        elem.classList.add('red');
        elem.addEventListener("click", function(){onClickFailure(elem)})
    }
    else{
        elem.textContent = "W trakcie";
        elem.classList.add('yellow');
        elem.addEventListener("click", function(){onClickProgress(elem)})
    }
}

function onClickProgress(elem){
    document.querySelector(".status-input").value = "PROGRESS";
    
    var button = Array.from(document.querySelectorAll(".status-button")).filter(b => b != elem)[0]
    elem.classList.remove('yellow');

    if(button.textContent == "Nieudane"){
        elem.textContent = "Zakończone";
        elem.classList.add('green');
        elem.addEventListener("click", function(){onClickSuccess(elem)})
    }
    else{
        elem.textContent = "Nieudane";
        elem.classList.add('red');
        elem.addEventListener("click", function(){onClickFailure(elem)})
    }
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

async function onSubmit(event){
    event.preventDefault()
    list = Array.from(document.querySelectorAll(".friends > .scroll-list > .friend-elem > .friend-nick")).map(e => e.textContent)
    
    if(list.length > 0){
        friends = '['
        for(var nick of list){
            friends += `"${nick}",`
        }
        friends = friends.substring(0, friends.length - 1);
        friends += ']'
        document.querySelector(".friends-input").value = friends
    }
    else{
        document.querySelector(".friends-input").value = "[]"
    }

    var taskNameElem = document.querySelector(".task-header");
    if(taskNameElem.value.length == 0){
        taskNameElem.style.backgroundColor = "#EF476F";
        await new Promise(r => setTimeout(r, 500));
        taskNameElem.style.backgroundColor = "#073B4C";
    }
    else{
        document.querySelector("form").submit();
    }
}