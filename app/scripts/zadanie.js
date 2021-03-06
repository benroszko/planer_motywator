function changeStatusColor(elem){
    document.querySelector(".status-input").value = elem.value;
    switch(elem.value){
        case "PROGRESS":
            elem.classList= 'status-select yellow';
            break;
        case "FAILURE":
            elem.classList= 'status-select red';
            break;
        case "SUCCESS":
            elem.classList= 'status-select green';
            break;
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
    if(taskNameElem.value.length === 0){
        taskNameElem.style.backgroundColor = "#EF476F";
        await new Promise(r => setTimeout(r, 500));
        taskNameElem.style.backgroundColor = "#073B4C";
    }
    else{
        const xhr = new XMLHttpRequest();
        xhr.open("POST", window.location.href, true);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        const id = document.querySelector("input[name='id']").value;
        const priority = document.querySelector("select[name='priority']").value;
        const hour = document.querySelector("input[name='hour']").value;
        const status = document.querySelector("input[name='status']").value;
        const friends = document.querySelector("input[name='friends']").value;

        xhr.onreadystatechange = function () {
            if(xhr.readyState === XMLHttpRequest.DONE) {
                location.replace(document.referrer);
            }
        };
        
        xhr.send(`id=${id}&priority=${priority}&hour=${hour}&status=${status}&friends=${friends}`);
        //document.querySelector("form").submit();
    }
}