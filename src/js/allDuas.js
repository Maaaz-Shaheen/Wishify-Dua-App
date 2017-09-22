ifLoggedOut();

var database = firebase.database().ref();
var renderDiv = document.getElementById("render-div");
var userID = window.localStorage.getItem("UID");
var userInfo = JSON.parse(window.localStorage.getItem("User Info"));




database.child("duaPosts").on("child_added", function(snapshot){
    var duaObj = snapshot.val();
    duaObj.id = snapshot.key;
    render(duaObj);
})

database.child("comments").on("child_added", function(snapshot){
    var commentObj = snapshot.val();
    renderComment(commentObj);
})







function render(duaObj){


    var duaFor = duaObj.duaFor;
    var duaText = duaObj.duaContent;

    var duaColumn = document.createElement("DIV");
    duaColumn.setAttribute("class", "col-md-9 d-block my-3");

    var duaCard = document.createElement("DIV");
    duaCard.setAttribute("class", "card card-primary card-form ");
    duaCard.setAttribute("id", duaObj.id);
 

    var duaCardHead = document.createElement("DIV");
    duaCardHead.setAttribute("class", "card-header");


    var duaCardHeadText = document.createElement("H3");
    duaCardHeadText.setAttribute("class", "display-6");
    var duaCardHeadTextName = document.createTextNode("For : " + duaFor);


    var duaCardBlock = document.createElement("DIV");
    duaCardBlock.setAttribute("class", "card-block");


    var duaContent = document.createElement("P");
    duaContent.setAttribute("class", "lead text-center");
    var duaContentText = document.createTextNode(duaText);


    var duaBy = document.createElement("P");
    duaBy.setAttribute("class", "lead text-right");
    var duaByText = document.createTextNode("By : " + duaObj.duaBy);


    var likes = document.createElement("SMALL");
    likes.setAttribute("class", "lead text-left");
    likes.setAttribute("id", "like" + duaObj.id);
    var likesCounter = document.createTextNode(duaObj.likes + " likes");


    var commentDiv = document.createElement("DIV");
    commentDiv.setAttribute("class", "form-group");
    var commentInput = document.createElement("INPUT");
    commentInput.setAttribute("id", "comment" + duaObj.id);
    commentInput.setAttribute("type", "text");
    commentInput.setAttribute("placeholder", "Comment");
    commentInput.setAttribute("class", "form-control my-3");
    

    
    

    var likeBtn = document.createElement("DIV");
    likeBtn.setAttribute("class", "btn btn-success d-inline-block");
    var likeBtnText = document.createTextNode("Like");
    likeBtn.onclick = function(){
        likeComment(duaObj);
    }

    var unlikeBtn = document.createElement("DIV");
    var unlikeBtnText = document.createTextNode("Unlike");
    unlikeBtn.setAttribute("class", "d-none");
    unlikeBtn.onclick = function(){
        unlikeComment(duaObj);
    }
  
    var commentBtn = document.createElement("DIV");
    commentBtn.setAttribute("class", "btn btn-danger ml-2");
    var commentBtnText = document.createTextNode("Comment");
    commentBtn.onclick = function(){
        submitComment(duaObj.id);
    }

    var cardFooter = document.createElement("DIV");
    cardFooter.setAttribute("class", "card-footer my-2");
 
    
    duaCardHeadText.appendChild(duaCardHeadTextName);
    duaCardHead.appendChild(duaCardHeadText);

    duaContent.appendChild(duaContentText);
    duaBy.appendChild(duaByText);

    commentDiv.appendChild(commentInput);
    likeBtn.appendChild(likeBtnText);
    unlikeBtn.appendChild(unlikeBtnText);
    commentBtn.appendChild(commentBtnText);
    likes.appendChild(likesCounter);
    

    duaCardBlock.appendChild(duaContent);
    duaCardBlock.appendChild(duaBy);
    duaCardBlock.appendChild(likes);
    duaCardBlock.appendChild(commentDiv);

    firebase.database().ref('/likeStatus/' + userID + "/" + duaObj.id).on('value', function(snapshot) {
        var obj = snapshot.val();    
        if(obj.likeStatus === true){
            likeBtn.setAttribute("class", "d-none");
            unlikeBtn.setAttribute("class", "btn btn-success d-inline-block");
        }
        else{
            likeBtn.setAttribute("class", "btn btn-success d-inline-block");
            unlikeBtn.setAttribute("class", "d-none");
        }
    });
    

    duaCardBlock.appendChild(likeBtn);
    duaCardBlock.appendChild(unlikeBtn);
    duaCardBlock.appendChild(commentBtn);

  
    duaCard.appendChild(duaCardHead);
    duaCard.appendChild(duaCardBlock);
    duaCard.appendChild(cardFooter);
    

    duaColumn.appendChild(duaCard);
    renderDiv.appendChild(duaColumn);

}

function submitComment(duaId){
    var commentInput = document.getElementById("comment" + duaId);
    var commentObj = {
        by: userInfo.name,
        comment: commentInput.value,
        duaId: duaId,
    }
    database.child("comments").push(commentObj);
    commentInput.value = '';
}

function likeComment(duaObj){
    duaObj.likes = ++duaObj.likes;
    database.child("duaPosts/" + duaObj.id).update(duaObj);
    database.child("likeStatus").child(userID).child(duaObj.id).set({
        likeStatus: true,
    });
}

function unlikeComment(duaObj){
    duaObj.likes = --duaObj.likes;
    database.child("duaPosts/" + duaObj.id).update(duaObj);
    database.child("likeStatus").child(userID).child(duaObj.id).set({
        likeStatus: false,
    });
}

database.child("duaPosts").on("child_changed", function(data){    // updating at ui
    var likedPost = document.getElementById(data.key);
    var likeUpdate = document.getElementById("like" + data.key);
    likeUpdate.innerHTML = data.val().likes  + " Likes";  

})


function renderComment(commentObj){
    var duaDivFooter = document.getElementById(commentObj.duaId);
    var footer = duaDivFooter.lastElementChild;
 
    var cardFooterComments = document.createElement("DIV");
    cardFooterComments.setAttribute("class", "my-2");

    var cardFooterCommentsBy = document.createElement("H6");
    var cardFooterCommentsByText = document.createTextNode(" - " + commentObj.by);
  
    var cardFooterCommentsContent = document.createElement("DIV");
    var cardFooterCommentsContentText = document.createTextNode(commentObj.comment);
   
    var hr = document.createElement("HR");

    cardFooterCommentsContent.appendChild(cardFooterCommentsContentText);
    cardFooterCommentsBy.appendChild(cardFooterCommentsByText);
    cardFooterCommentsBy.setAttribute("class", " text-right");

    // cardFooterComments.appendChild(cardFooterCommentsBy);
    cardFooterComments.appendChild(cardFooterCommentsContent);
    cardFooterComments.appendChild(cardFooterCommentsBy);

    cardFooterComments.appendChild(hr);
  

    footer.appendChild(cardFooterComments);

}