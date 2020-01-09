function checkUpload(event, target) {
    clearAll(target)
    var i;
    if(event.target.files && event.target.files[0]) {
        for( i = 0; i < event.target.files.length; i++){
            var reader = new FileReader();
            reader.onload = function(e){
                appendElement(target, e.target.result);
            }
    
            reader.readAsDataURL(event.target.files[i]);
        }
    }
    console.log(event.target.files)
}

function appendElement(targetParent, imgSrc){
    var parent = document.getElementById(targetParent);
    var img = '<img class="upload-thumbnail" src="' +  imgSrc +'"></img>';
    parent.innerHTML += img;
}

function clearAll(targetParent){
    var parent = document.getElementById(targetParent);
    parent.innerHTML = ''; 
}