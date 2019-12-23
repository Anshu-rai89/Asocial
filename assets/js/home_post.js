{   
    // method to submit the form data for new post using AJAX
    let createPost = function(){
        let newPostForm = $('#post-form');

        newPostForm.submit(function(e){
            e.preventDefault();

            $.ajax({
                type: 'post',
                url: '/post/create',
                data: newPostForm.serialize(),
                success: function(data){
                    //console.log(data.data);
                    let newPost = newPostDom(data.data.post);
                    // populating delete button

                  
                    $('#post-container>ul').prepend(newPost);
                    deletepost($(' .delete-post-button',newPost));

                    new PostComments(data.data.post._id);

                    new Noty({
                        theme: 'relax',
                        text: "Post published!",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();
                }, error: function(error){
                    console.log(error.responseText);
                }
            });
        });
    }


    // method to create a post in DOM
    let newPostDom = function(post){
        return $(`<li id="post-${post._id}">
                    <p>
                        
                        <small>
                            <a class="delete-post-button"  href="/post/destroy/${ post._id }">X</a>
                        </small>
                       
                        ${ post.content }
                        <br>
                        <small>
                        ${ post.user.name }
                        </small>

                        </small>
                        <br>
                        <small>
                            
                                <a class="toggle-like-button" data-likes="0" href="/likes/toggle/?id=${post._id}&type=Post">
                                    0 Likes
                                </a>
                            
                        </small>
                    </p>
                    <div class="post-comments">
                        
                            <form action="/comment/create" method="POST">
                                <input type="text" name="content" placeholder="Type Here to add comment..." required>
                                <input type="hidden" name="post" value="${ post._id }" >
                                <input type="submit" value="Add Comment">
                            </form>
               
                
                        <div class="post-comments-list">
                            <ul id="post-comments-${ post._id }">
                                
                            </ul>
                        </div>
                    </div>
                    
                </li>`)
    }


    let deletepost=function(deletelink)
    { $(deletelink).click(
        function(e)
        {
            e.preventDefault();
            
        
            $.ajax(
            {
                type:'get',
                url:$(deletelink).prop('href'),
                success:function(data)
                {   console.log(data);
                      $(`#post-${data.data.post_id}`).remove();
                      new Noty({
                        theme: 'relax',
                        text: "Post Deleted",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();
                },error:function(error)
                {
                    console.log(error.responseText);
                }
            }
            );
        }
    );
    }

   // conert all post to ajex
    // loop over all the existing posts on the page (when the window loads for the first time) and call the delete post method on delete link of each, also add AJAX (using the class we've created) to the delete button of each
    let convertPostsToAjax = function(){
        $('#post-container>ul>li').each(function(){
            let self = $(this);
            let deleteButton = $(' .delete-post-button', self);
            deletepost(deleteButton);

            // get the post's id by splitting the id attribute
            let postId = self.prop('id').split("-")[1]
            new PostComments(postId);
        });
    }



    createPost();
    convertPostsToAjax();
}