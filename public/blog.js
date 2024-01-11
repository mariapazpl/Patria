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
        id: 1,
        content:
          "My last trip was to Chile and one local dish that I loved was Completos (Chilean hot dogs) so I'm gonna share with you all the recipe! You will need: Hot dog buns, hot dogs, diced tomatoes, smashed avocados (both dressed with salt and olive oil only), mayo, keychup and mustard. The first thing you’ll want to do is boil the hot dogs, While the hot dogs are cooking, you want to chop your tomatoes, as well as mash up your avocado. When you’re building your completo it’s all about layering in the proper order. First, you put the hot dog in the bun, then add the diced tomatoes, then lastly spread the avocado on top. This will “seal” the tomatoes against the hot dog so they’ll stay put while you’re eating it. Then top everything off with mayo, ketchup and mustard (optional) and you’re all done and ready to enjoy them!",
        createdAt: "1 month ago",
        //score: 12,
        user: {
          image: {
            png: "/images/avatars/completos.png",
            webp: "/images/avatars/completos.webp",
          },
          username: "amyrobson",
        },
        replies: [],
      },
      {
        parent: 0,
        id: 2,
        content:
          "My wife loves when I make Japanese pancakes, so here I am. You will need eggs, sugar, milk, flour, baking powder, and cream of tartar. Mix the egg yolk and sugar until frothy, then mix in the milk. Sift in the flour and baking powder, making a smooth batter. Set aside. Make the meringue by beating together sugar, egg whites, and cream of tartar. When the egg whites hold their shape and are stiff and glossy, they’re ready. Fold the egg yolk batter into the whites, being careful not to deflate. Heat up a pan (or a crepe maker) on very, very low heat. Lightly oil the pan then scoop out a large dollop of batter, cover and cook for 4-5 minutes. Remove the lid then pile some more batter on and add a couple drops of water. Cover and cook. When the bottoms are golden, very carefully flip, add a couple more drops of water, then cover and cook. Remove from the pan and enjoy immediately with butter, syrup, and powdered sugar. The pancakes will deflate as they cool down, and that's it! Hope you guys enjoy!",
        createdAt: "2 weeks ago",
        //score: 5,
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
              "This style of pancakes is one of my favorite! thanks for sharing this easy recipe.",
            createdAt: "1 week ago",
            //score: 4,
            replyingTo: "maxblagun",
            user: {
              image: {
                png: "/images/avatars/pizza.png",
                webp: "/images/avatars/pizza.webp",
              },
              username: "ramsesmiron",
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
        
      });
      return commentNode;*/
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