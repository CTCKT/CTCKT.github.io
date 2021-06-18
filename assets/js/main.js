
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
    cell.style.width = "100%";
    cell.style.maxWidth = "220px";
    cell.classList.add("text-center");

       var imglink = document.createElement('a');
       imglink.href = data.members[i].url.web;

          var imgchild = document.createElement('img');  
          imgchild.classList.add("mb-3","rounded-full","mx-auto","h-32","w-32");
          imgchild.src = "/content/Members/profile_img/" + data.members[i].regno + ".png";
          imgchild.alt = data.members[i].name;      
          imgchild.onerror = function(){this.src = "assets/images/default.png";}

       imglink.appendChild(imgchild);

       var namediv = document.createElement('div');
       namediv.classList.add("font-semibold");  
       namediv.innerText = data.members[i].name;

       var caption = document.createElement('p');
       caption.classList.add("text-grey-500","text-sm");
       caption.innerText = data.members[i].caption;
       
       var links = document.createElement('div');
       links.classList.add("my-4","flex","justify-center","items-center");
       
       urls = ["github","linkedin","hackerrank"];
       urlsclass = ["fa-github","fa-linkedin","fa-code"];

          for(j=0;j<urls.length;j++)
          {
            urlhref =  data.members[i].url[urls[j]];
            if(urlhref != "")
            {
              var anchor = document.createElement('a');
              anchor.href = urlhref;
                 var icon = document.createElement('i');
                 icon.classList.add("fa", urlsclass[j], "p-2");
              anchor.appendChild(icon);
              links.appendChild(anchor);
              anchor = null;
              icon = null;
            }
          }
      

    cell.appendChild(imglink);
    cell.appendChild(namediv);
    cell.appendChild(caption);
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
                 desc.classList.add("proj-desc","my-2");
                 desc.innerText =  data.projects[i].desc;
                 var link = document.createElement('a');
                 link.href = data.projects[i].url;
                     var span = document.createElement('div');
                     span.classList.add("mb-2");
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
  var element = document.getElementById("timeline-table");
  var max = data.count[len-1].count;
  document.getElementById("timeline-heading").innerText = "We are " + String(max) + " members strong ";
  for(var i=0;i<3 && i<len;i++)
  {
    var cell = document.createElement('tr');
      var year = document.createElement('th');
      year.innerText = data.count[len-1-i].year;
      
      var bardiv = document.createElement('th');
      bardiv.style.minWidth = "200px";
      bardiv.style.maxWidth = "500px";
      bardiv.style.width = "95%";
      bardiv.style.paddingLeft = "5px";

         var bar = document.createElement('div');
         bar.classList.add("w3-blue","w3-round-xlarge");
         bar.style.height = "20px";
         bar.style.width = String((data.count[len-1-i].count/max)*100)+"%";
         bar.style.textAlign = "right";
         bar.style.textIndent = "10px"
         bar.innerHTML = String(data.count[len-1-i].count)+"&nbsp;&nbsp;";

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
    var cell = document.createElement('div');
    cell.classList.add("w3-padding");
    cell.style.width = "300px";

      var card = document.createElement('div');
      card.classList.add("w3-card");
         
         var imgchild = document.createElement('img');
         imgchild.src = data.events[i].imgurl;
         imgchild.alt = "Events Image";
         imgchild.style.width = "100%";
         imgchild.style.height = "150px";

         var content = document.createElement('div');
         content.classList.add("w3-padding");
             
            var title = document.createElement('h4');
            title.style.lineHeight = "1.25em";
            title.style.height = "2.5em";
            title.style.overflow = "hidden";
            title.innerText = data.events[i].name;

            var date = document.createElement('div');
            date.classList.add("w3-small");
            date.style.marginTop = "10px";
            date.innerText = data.events[i].date;

            var area = document.createElement('div');
            area.classList.add("w3-display-container");
            area.style.height = "75px";
                
             var button = document.createElement('a');
             button.href = data.events[i].url;
             button.classList.add("w3-grey","w3-display-middle");
             button.style.borderRadius = "25px";
             button.innerHTML = "&nbsp;&nbsp;&nbsp;Register&nbsp;&nbsp;&nbsp;";
            
            area.appendChild(button);
          
         content.appendChild(title);
         content.appendChild(date);
         content.appendChild(area);
      
      card.appendChild(imgchild);
      card.appendChild(content);
      
    cell.appendChild(card);

    elements[i] = cell;
    cell = "";
  }

  eventFlkty.append(elements);
  eventFlkty.reloadCells()
  
}
