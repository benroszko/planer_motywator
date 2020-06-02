hidden = []
var activeUserNick = '';

function formChanged(){
    const data = document.querySelector(".form-control").value;

    var filteredFriends = Array.from(document.querySelectorAll(".list-elem:not(.not-friend)"))
        .filter(el => !el.textContent.includes(data) && el.style.display == 'block');
    filteredFriends.forEach(item =>{
        item.style.display = "none";
        hidden.push(item);
     });

     // display and remove from hidden 
    for(var i = hidden.length - 1; i >= 0; i--) {
        if(hidden[i].textContent.includes(data)) {
            hidden[i].style.display = "block";
            hidden.splice(i, 1);
        }
    }
    
    var filteredFriendsCount = Array.from(document.querySelectorAll(".list-elem"))
        .filter(el => el.style.display == "block").length;
    if(filteredFriendsCount < 3){
        var filteredUsers = Array.from(document.querySelectorAll(".list-elem.not-friend"))
            .filter(el => el.textContent.includes(data));
        filteredUsers.forEach(item =>{
            item.style.display = "block";
        });
    }
    else{
        var filteredUsers = Array.from(document.querySelectorAll(".list-elem.not-friend"))
            .filter(el => el.style.display == 'block');
        filteredUsers.forEach(item =>{
            item.style.display = "none";
        });
    }

    var filteredNotFriends = Array.from(document.querySelectorAll(".list-elem.not-friend"))
        .filter(el => el.style.display == "block");

    if(filteredNotFriends.length == 1){
        activeUserNick = filteredNotFriends[0].querySelector(".list-elem-nick").textContent;
        document.querySelector(".add-btn").style.opacity = 1.0;
    }else{
        document.querySelector(".add-btn").style.opacity = 0.6;
    }
}

function onClick(){
    if(document.querySelector(".add-btn").style.opacity == 1.0){
        document.querySelector(".form-control").value = activeUserNick
        document.querySelector("form").submit();
    }
}