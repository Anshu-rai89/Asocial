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
                },error:function(error)
                {
                    console.log(error.responseText);
                }
            }
            );
        }
    );
    }


    createPost();
}