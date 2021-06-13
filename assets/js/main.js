
particlesJS.load('home', 'assets/js/particles.json', function() {});
var flkty = new Flickity('.carousel');
var eventFlkty = new Flickity('.events-carousel');


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
    var cell = document.createElement('div');
    cell.style.display = "block";
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
       description.style.textAlign = "justify";
       description.style.padding = "4px"
       description.innerText = data.members[i].desc;
       description.classList.add("members-desc");

       var links = document.createElement('div');
       links.classList.add("w3-center");
       
       urls = ["github","linkedin","hackerrank","mail","web"];
       urlsclass = ["fa-github","fa-linkedin","fa-code","fa-envelope","fa-external-link"];

          for(j=0;j<urls.length;j++)
          {
            var anchor = document.createElement('a');
            anchor.href = data.members[i].url[urls[j]];
              var icon = document.createElement('i');
              icon.classList.add("fa",urlsclass[j],"w3-padding");
            anchor.appendChild(icon);
            links.appendChild(anchor);
            anchor = null;
            icon = null;
          }
      

    cell.appendChild(imgchild);
    cell.appendChild(name);
    cell.appendChild(caption);
    cell.appendChild(description);
    cell.appendChild(links)
    elements[i] = cell;
    cell = "";
  }

  flkty.append(elements);
  flkty.reloadCells()
  
}

const xmlhttp2 = new XMLHttpRequest();
xmlhttp2.onreadystatechange = function(){
if(this.readyState == 4 && this.status == 200)
{
    const obj = JSON.parse(this.responseText);      
    showProjects(obj);
}}

xmlhttp2.open("GET","content/Projects/config.json");
xmlhttp2.send();

function showProjects(data)
{
  const len = data.projects.length;
  element = document.getElementById("project-list");
  for(var i =0;i<len;i++)
  {
    var cell = document.createElement('div');
    cell.classList.add("w3-third","w3-section");
      var card = document.createElement('div');
      card.classList.add("w3-card");
          var row = document.createElement('div');
          row.classList.add("w3-row");
             var half1 = document.createElement('div');
             half1.classList.add("w3-half");
                 var img = document.createElement('img');
                 img.src = data.projects[i].imgurl;
                 img.style.width = "100%";
                 img.style.height = "150px";
             half1.appendChild(img);
             var half2 = document.createElement('div');
             half2.classList.add("w3-half");
             half2.style.height = "150px";
             half2.style.padding = "5px";
                 var title = document.createElement('div');
                 title.classList.add("w3-large");
                 title.innerText = data.projects[i].name;
                 var credit = document.createElement('div');
                 credit.classList.add("w3-small");
                 credit.innerText = "By " + data.projects[i].by;
                 var desc = document.createElement('p');
                 desc.classList.add("proj-desc");
                 desc.innerText =  data.projects[i].desc;
                 var link = document.createElement('a');
                 link.href = data.projects[i].url;
                     var span = document.createElement('span');
                     span.innerText = "Know More ";
                         var icon = document.createElement('i');
                         icon.classList.add("fa","fa-plus");
                     span.appendChild(icon);
                 link.appendChild(span);
             half2.appendChild(title);
             half2.appendChild(credit);
             half2.appendChild(desc);
             half2.appendChild(link);
          row.appendChild(half1);
          row.appendChild(half2);
      card.appendChild(row);
    cell.appendChild(card);             
    element.appendChild(cell);
    cell = "";
  }
}


const xmlhttp3 = new XMLHttpRequest();
xmlhttp3.onreadystatechange = function(){
if(this.readyState == 4 && this.status == 200)
{
    const obj = JSON.parse(this.responseText);      
    updateTimeline(obj);
}}

xmlhttp3.open("GET","content/student_count.json");
xmlhttp3.send();

function updateTimeline(data)
{
  const len = data.count.length;
  var element = document.getElementById("timeline");
  var max = data.count[len-1].count;
  document.getElementById("timeline-heading").innerText = "We are " + String(max) + " members strong . . .";
  for(var i=0;i<3 && i<len;i++)
  {
    var cell = document.createElement('div');
    cell.classList.add("w3-row");
    cell.style.paddingTop = "3px";
      var year = document.createElement('div');
      year.classList.add("w3-quarter");
      year.style.textAlign = "right";
      year.style.paddingRight = "15px";
      year.innerText = data.count[len-1-i].year;
      
      var bardiv = document.createElement('div');
      bardiv.classList.add("w3-round-xlarge","w3-rest");
         var bar = document.createElement('div');
         bar.classList.add("w3-container","w3-blue","w3-round");
         bar.style.display = "inline-block";
         bar.style.width = String((data.count[len-1-i].count/max)*100)+"%";
         bar.innerText = data.count[len-1-i].count;
      bardiv.appendChild(bar);
    cell.appendChild(year);
    cell.appendChild(bardiv);
    element.appendChild(cell);
    cell=null;
  }
}

const xmlhttp4 = new XMLHttpRequest();
xmlhttp4.onreadystatechange = function(){
if(this.readyState == 4 && this.status == 200)
{
    const obj = JSON.parse(this.responseText);      
    showEvents(obj);
}}

xmlhttp4.open("GET","content/Events/config.json");
xmlhttp4.send();

function showEvents(data)
{ 
  const len = data.events.length;
  var elements = [];
  for(var i =0;i<len;i++)
  {
    var cell = document.createElement('a');
    cell.classList.add("w3-padding");
    cell.style.width = "300px";
    cell.href = data.events[i].url;

      var card = document.createElement('div');
      card.classList.add("w3-card");
         
         var imgchild = document.createElement('img');
         imgchild.src = data.events[i].imgurl;
         imgchild.alt = "Events Image";
         imgchild.style.width = "100%";
         imgchild.style.height = "150px";

         var content = document.createElement('div');
         content.classList.add("w3-padding");
             
            var title = document.createElement('h3');
            title.innerText = data.events[i].name;

            var description = document.createElement('p');
            description.innerText = data.events[i].desc;
            description.classList.add("members-desc");
          
         content.appendChild(title);
         content.appendChild(description);
      
      card.appendChild(imgchild);
      card.appendChild(content);
      
    cell.appendChild(card);

    elements[i] = cell;
    cell = "";
  }

  eventFlkty.append(elements);
  eventFlkty.reloadCells()
  
}
