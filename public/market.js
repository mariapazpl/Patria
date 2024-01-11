const data = {
    currentUser: {
        image: {
            png: "/images/avatars/kawai.png",
            webp: "/images/avatars/kawai.webp",
        },
        username: "",
    },
    comments: [
        {
            parent: 0,
            id: 2,
            content:
            "Dear Friends!! We're back with our Singaporean desserts. Next sunday from 12:00 pm to 4:00pm we will be selling the pack of 16 pieces. For only $10! you can find us at Spadina Station, Toronto. Please send a e-transfer at 'dessert.singapore@gmail.com' with a note containing quantity of packs, your name, desired pickup time, email. When you send the e-transfer please comment below to confirm your order. See you next Sunday!",
            createdAt: "5 days ago",
            //score: 20,
            user: {
            image: {
                png: "/images/avatars/bubble.png",
                webp: "/images/avatars/bubble.webp",
            },
            username: "maxblagun",
            },
            replies: [
                {
                    parent: 2,
                    id: 1,
                    content:
                    "Done. Can't wait to eat this!!",
                    createdAt: "5 days ago",
                    //score: 1,
                    replyingTo: "maxblagun",
                    user: {
                    image: {
                        png: "/images/avatars/pizza.png",
                        webp: "/images/avatars/pizza.webp",
                    },
                    username: "ramsesmiron",
                    },
                },
                {
                    parent: 2,
                    id: 1,
                    content:
                    "Sent!!!",
                    createdAt: "3 days ago",
                    //score: 1,
                    replyingTo: "ramsesmiron",
                    user: {
                    image: {
                        png: "/images/avatars/completos.png",
                        webp: "/images/avatars/completos.webp",
                    },
                    username: "amyrobson",
                    },
                },
            ],
        },
    ],
};
  
function appendFrag(frag, parent) {
    var children = [].slice.call(frag.childNodes, 0);
    parent.appendChild(frag);
    //console.log(children);
    return children[1];
}
  
const addComment = (body, parentId, replyTo = undefined) => {
    let commentParent =
      parentId === 0
        ? data.comments
        : data.comments.filter((c) => c.id == parentId)[0].replies;
    let newComment = {
      parent: parentId,
      id:
        commentParent.length == 0
          ? 1
          : commentParent[commentParent.length - 1].id + 1,
      content: body,
      createdAt: new Date().toLocaleString(),
      replyingTo: replyTo,
      //score: 0,
      replies: parent == 0 ? [] : undefined,
      user: data.currentUser,
    };
    commentParent.push(newComment);
    initComments();
};
const deleteComment = (commentObject) => {
    if (commentObject.parent == 0) {
      data.comments = data.comments.filter((e) => e != commentObject);
    } else {
      data.comments.filter((e) => e.id === commentObject.parent)[0].replies =
        data.comments
          .filter((e) => e.id === commentObject.parent)[0]
          .replies.filter((e) => e != commentObject);
    }
    initComments();
};
  
const promptDel = (commentObject) => {
    const modalWrp = document.querySelector(".modal-wrp");
    modalWrp.classList.remove("invisible");
    modalWrp.querySelector(".yes").addEventListener("click", () => {
      deleteComment(commentObject);
      modalWrp.classList.add("invisible");
    });
    modalWrp.querySelector(".no").addEventListener("click", () => {
      modalWrp.classList.add("invisible");
    });
};
  
const spawnReplyInput = (parent, parentId, replyTo = undefined) => {
    if (parent.querySelectorAll(".reply-input")) {
      parent.querySelectorAll(".reply-input").forEach((e) => {
        e.remove();
      });
    }
    const inputTemplate = document.querySelector(".reply-input-template");
    const inputNode = inputTemplate.content.cloneNode(true);
    const addedInput = appendFrag(inputNode, parent);
    addedInput.querySelector(".bu-primary").addEventListener("click", () => {
      let commentBody = addedInput.querySelector(".cmnt-input").value;
      if (commentBody.length == 0) return;
      addComment(commentBody, parentId, replyTo);
    });
};
  
const createCommentNode = (commentObject) => {
    const commentTemplate = document.querySelector(".comment-template");
    var commentNode = commentTemplate.content.cloneNode(true);
    commentNode.querySelector(".usr-name").textContent =
      commentObject.user.username;
    commentNode.querySelector(".usr-img").src = commentObject.user.image.webp;
    //commentNode.querySelector(".score-number").textContent = commentObject.score;
    commentNode.querySelector(".cmnt-at").textContent = commentObject.createdAt;
    commentNode.querySelector(".c-body").textContent = commentObject.content;
    if (commentObject.replyingTo)
      commentNode.querySelector(".reply-to").textContent =
        "@" + commentObject.replyingTo;
  
    /*commentNode.querySelector(".score-plus").addEventListener("click", () => {
      commentObject.score++;
      initComments();
    });
  
    commentNode.querySelector(".score-minus").addEventListener("click", () => {
      commentObject.score--;
      if (commentObject.score < 0) commentObject.score = 0;
      initComments();
    });*/
    if (commentObject.user.username == data.currentUser.username) {
      commentNode.querySelector(".comment").classList.add("this-user");
      commentNode.querySelector(".delete").addEventListener("click", () => {
        promptDel(commentObject);
      });
      /*commentNode.querySelector(".edit").addEventListener("click", (e) => {
        const path = e.path[3].querySelector(".c-body");
        if (
          path.getAttribute("contenteditable") == false ||
          path.getAttribute("contenteditable") == null
        ) {
          path.setAttribute("contenteditable", true);
          path.focus()
        } else {
          path.removeAttribute("contenteditable");
        }
        
      });*/
      //return commentNode;
    }
    return commentNode;
};
  
const appendComment = (parentNode, commentNode, parentId) => {
    const bu_reply = commentNode.querySelector(".reply");
    // parentNode.appendChild(commentNode);
    const appendedCmnt = appendFrag(commentNode, parentNode);
    const replyTo = appendedCmnt.querySelector(".usr-name").textContent;
    bu_reply.addEventListener("click", () => {
      if (parentNode.classList.contains("replies")) {
        spawnReplyInput(parentNode, parentId, replyTo);
      } else {
        //console.log(appendedCmnt.querySelector(".replies"));
        spawnReplyInput(
          appendedCmnt.querySelector(".replies"),
          parentId,
          replyTo
        );
      }
    });
};
  
function initComments(
    commentList = data.comments,
    parent = document.querySelector(".comments-wrp")
) {
    parent.innerHTML = "";
    commentList.forEach((element) => {
      var parentId = element.parent == 0 ? element.id : element.parent;
      const comment_node = createCommentNode(element);
      if (element.replies && element.replies.length > 0) {
        initComments(element.replies, comment_node.querySelector(".replies"));
      }
      appendComment(parent, comment_node, parentId);
    });
}
  
initComments();
  const cmntInput = document.querySelector(".reply-input");
  cmntInput.querySelector(".bu-primary").addEventListener("click", () => {
    let commentBody = cmntInput.querySelector(".cmnt-input").value;
    if (commentBody.length == 0) return;
    addComment(commentBody, 0);
    cmntInput.querySelector(".cmnt-input").value = "";
});
  
  // addComment("Hello ! It works !!",0);