var url='http://search.twitter.com/search.json?callback=?&rpp=5&q=';
var search_parameter;
//query=$("#query").val();
//alert(window.location.href);
search_parameter = getUrlVars()[0];
//alert(query);
$.getJSON(url+search_parameter,function(json){
	$.each(json.results,function(i,tweet){
		$("#twitter_results").append('<div class="row-fluid"><div class="span6 offset3"><img src="'+tweet.profile_image_url+'" widt="48" height="48" /><p>'+tweet.text+'</p></div></div>');
	});
});

setInterval(function () {
	$.getJSON(url+search_parameter,function(json){
		$.each(json.results,function(i,tweet){
		   $("#twitter_results").prepend('<div class="row-fluid"><div class="span6 offset3"><img src="'+tweet.profile_image_url+'" widt="48" height="48" /><p>'+tweet.text+'</p></div></div>');
		});
	});
}, 20000);

var wiki_url = "http://en.wikipedia.org/w/api.php?action=parse&format=json&callback=?";
var wiki_page = search_parameter;
$.getJSON(wiki_url, { 
  page: wiki_page, 
  prop:"text", 
  uselang:"en"
}, function(wiki_result) {
	var w_text = wiki_result['parse']['text']['*'];
	var sub_str = w_text.substring(0,150);
	$("#wiki_results").append('<div class="row-fluid"><div class="span6 offset3"><h2>'+ 
			wiki_result['parse']['title'] + '</h2><p>' + sub_str + '</p></div></div>');
	
});


function getUrlVars()
{
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('#') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}