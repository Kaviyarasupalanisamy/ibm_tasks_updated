const ENV = "STAGE";
if(ENV == "STAGE")
{
	var URL ="https://5dc588200bbd050014fb8ae1.mockapi.io/assessment";	
}
else if(ENV == "PROD")
{
	var URL ="https://5dc588200bbd050014fb8ae1.mockapi.io/assessment";	
}

var DUMMY_IMAGE="img/dummy.jpg";
var HB_USER_DETAILS ="js/templates/userdetails.handlebars";

function environment(url,userdetailsHB,dummyImage)
{
	this.DETAIL_URL = url;
	this.USER_DETAILS_HB = userdetailsHB;
	this.USER_DUMMY_IMAGE=DUMMY_IMAGE;
}

const EV  = new environment(URL,HB_USER_DETAILS,DUMMY_IMAGE);


