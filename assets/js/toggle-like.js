// create a class to toggle likes when a link is clicked, using AJAX
class ToggleLike{
    constructor(toggleElement){
        this.toggler = toggleElement;
        this.toggleLike();
    }


    toggleLike(){
        $(this.toggler).click(function(e){
            e.preventDefault();
            let self = this;

           /// console.log("SEnding ajax request for ");
            $.ajax({
                type: 'POST',
                url: $(self).attr('href'),
            })
            .done(function(data) {
                let likesCount = parseInt($(self).attr('data-likes'));
               
                if (data.data.delete_var== true){
                    likesCount -= 1;
                    
                }else{
                    likesCount += 1;
                }


                $(self).attr('data-likes', likesCount);
                $(self).html(` <i id='like'class="fas fa-thumbs-up"></i> ${likesCount} `);

            })
            .fail(function(errData) {
                console.log('error in completing the request');
            });
            

        });
    }
}