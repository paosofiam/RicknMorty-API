const templateCard = document.querySelector(".card");
const fragment = document.createDocumentFragment();
const cards = document.querySelector("#card-dinamica")
var characterx=6;
var docPage=1;

function nPage(){
    docPage++;
    showAll(docPage);
    var hideShow = document.getElementById("prevP");
    hideShow.style.display = "block";
    if (docPage==42){
        var hideShow = document.getElementById("nextP");
        hideShow.style.display = "none";
    }
    document.getElementById("countSpan").innerHTML = 'Page: '+ docPage;
}
function pPage(){
    docPage--;
    showAll(docPage);
    var hideShow = document.getElementById("nextP");
    hideShow.style.display = "block";
    if (docPage==1){
        var hideShow = document.getElementById("prevP");
        hideShow.style.display = "none";
    }
    document.getElementById("countSpan").innerHTML = 'Page: '+ docPage;
}

function showOne(character){
    fetch('https://rickandmortyapi.com/api/character/'+ character)
    .then(response => response.json())   
    .then(function (item) {
        document.getElementById("demo").innerHTML ='<div class="card"><span class="characterId">'+item.id+'</span><figure class="cardFigure"><img src="'+item.image+'" alt="" class="profilePicture"><figcaption class="textCard name">'+item.name+'</figcaption></figure><div class="cardFooter"><span class="textCard specie">'+item.species+'</span><span class="textCard gender">'+item.gender+'</span></div></div>';
    })
    document.getElementById("card-dinamica").innerHTML = '';
}
function showAll(page){
    fetch('https://rickandmortyapi.com/api/character/?page='+page)
    .then(response => response.json())
      .then(function (data) {
        stringx = "";
          data.results.forEach(function(item) {
            stringx += '<div class="card"><span class="characterId">'+item.id+'</span><figure class="cardFigure"><img src="'+item.image+'" alt="" class="profilePicture"><figcaption class="textCard name">'+item.name+'</figcaption></figure><div class="cardFooter"><span class="textCard specie">'+item.species+'</span><span class="textCard gender">'+item.gender+'</span></div></div>';
      });
      document.getElementById("card-dinamica").innerHTML = stringx;
      })
      var hideShow = document.getElementById("pagesNav");
        hideShow.style.display = "flex";
        document.getElementById("countSpan").innerHTML = 'Page: '+ docPage;
        document.getElementById("demo").innerHTML = '';
        document.getElementById("validation").innerHTML = '';
}

    function searCharacter(){
        var idValue = document.getElementById("idInput").value;
        if(idValue==''){
            document.getElementById("validation").innerHTML = 'This field cant be empty';
        }
        else if(idValue<1 || idValue>826){
            document.getElementById("demo").innerHTML = '<div id="demox" class="card"><span id="cardT">whoops!</span><span id="cardS">No character found with such id :c</span></div>';
            document.getElementById("card-dinamica").innerHTML = '';
            document.getElementById("validation").innerHTML = '';
            var hideShow = document.getElementById("pagesNav");
            hideShow.style.display = "none";
        }
        else{
            fetch('https://rickandmortyapi.com/api/character/'+ idValue)
            .then(response => response.json())   
            .then(function (data) {
            showOne(idValue);
            document.getElementById("validation").innerHTML = '';
            var hideShow = document.getElementById("pagesNav");
            hideShow.style.display = "none";
        })
        }
    }