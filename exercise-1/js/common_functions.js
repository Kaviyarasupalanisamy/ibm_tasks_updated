function asyncRequest(url, callback) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function() { 
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
	{
      callback(xmlHttp.responseText);
	}
	else if(xmlHttp.status != 200)
	{
		console.log("Asynchrouns request got failed..");
	}
  }
  xmlHttp.open("GET", url, true); // true for asynchronous 
  xmlHttp.send(null);
}

function loadDummyImage(elem)
{
   elem.setAttribute("src", EV.USER_DUMMY_IMAGE);
}

function registerEvents()
{
	var elements = document.getElementsByClassName("viewmore");
	var viewMore = function() {
	  var attribute = this.classList.toggle('first');
	  if(this.innerHTML =="View More")
	  {
		  this.innerHTML="View Less";
	  }
	  else{
		  this.innerHTML="View More";
	  }
	  
    };
	for (var i = 0; i < elements.length; i++) {
		elements[i].addEventListener('click', viewMore, false);
	}
}

function  asyncActions(URL)
{
  function successCbk(res)
  {   res = JSON.parse(res);
	  var response = { data: res };
	  templateUrl = EV.USER_DETAILS_HB;
	  function renderUserDetails(data){
        var template = Handlebars.compile(data);
        var html_data = template(response);
        document.getElementById("handlebarCont").innerHTML = html_data;
		registerEvents();
      };
	  asyncRequest(templateUrl,renderUserDetails);
 }
  asyncRequest(URL,successCbk);
}

Handlebars.registerHelper('print_date', function (dateVal,options) {
	 var date = new Date(dateVal);
     return date.getMonth()+1 +"-"+date.getDate()+"-"+date.getFullYear()+ " "+date.getHours()+":"+date.getMinutes()+":"+ date.getSeconds();
})