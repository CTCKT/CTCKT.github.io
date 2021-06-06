
particlesJS.load('home', 'assets/js/particles.json', function() {});
var flkty = new Flickity('.carousel');


const xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function(){
if(this.readyState == 4 && this.status == 200)
{
    const obj = JSON.parse(this.responseText);      
    showMembers(obj);
}}

xmlhttp.open("GET","content/Members/members.json");
xmlhttp.send();


function showMembers(data)
{ 
  const len = data.members.length;
  var elements = [];
  for(var i =0;i<len;i++)
  {
    var cell = document.createElement('a');
    cell.style.display = "block";
    cell.href = data.members[i].url;
    cell.classList.add("w3-col","l3","m6","w3-margin-bottom","w3-padding");
    
       var imgchild = document.createElement('img');
       imgchild.src = "content/Members/profile_img/" + data.members[i].regno + ".png";
       imgchild.onerror = function(){this.src = "assets/images/default.png";}
       imgchild.alt = data.members[i].name;
       imgchild.classList.add("w3-image");
       imgchild.style.width = "100%";
       imgchild.style.height = "200px";

       var name = document.createElement('h3');
       name.innerText = data.members[i].name;

       var caption = document.createElement('p');
       caption.classList.add("w3-opacity")
       caption.innerText = data.members[i].caption;

       var description = document.createElement('p');
       description.innerText = data.members[i].desc;

    cell.appendChild(imgchild);
    cell.appendChild(name);
    cell.appendChild(caption);
    cell.appendChild(description);
    elements[i] = cell;
    cell = "";
  }

  flkty.append(elements);
  flkty.reloadCells()
  
}
