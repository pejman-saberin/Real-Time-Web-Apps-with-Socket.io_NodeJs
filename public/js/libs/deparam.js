/**
 * jQuery.deparam - The oposite of jQuery param. Creates an object of query string parameters.
 *
 * Credits for the idea and Regex:
 * http://stevenbenner.com/2010/03/javascript-regex-trick-parse-a-query-string-into-an-object/
*/
/*this library is used to extract the room name from the URL
  https://gist.github.com/andrewjmead/b71e03d8df237983285892f9a265d401
*/
(function($){
  $.deparam = $.deparam || function(uri){
    if(uri === undefined){
      uri = window.location.search;
    }
    var queryString = {};
    uri.replace(
      new RegExp(
        "([^?=&]+)(=([^&#]*))?", "g"),
        function($0, $1, $2, $3) {
        	queryString[$1] = decodeURIComponent($3.replace(/\+/g, '%20'));
        }
      );
      return queryString;
    };
})(jQuery);
