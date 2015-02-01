window.onload = app;

// runs when the DOM is loaded
function app(){
    "use strict";

    // load some scripts (uses promises :D)
    loader.load(
        //css
        {url: "./dist/style.css"},
        //js
        {url: "./bower_components/jquery/dist/jquery.min.js"},
        {url: "./bower_components/lodash/dist/lodash.min.js"},
        {url: "./bower_components/backbone/backbone.js"},
        {url: "./js/github.js"}
    ).then(function(){
        document.querySelector("html").style.opacity = 1;
        // start app?
        //
        //
        var token = "da9d4d1c7a5011d319df5dadafa06543f56cbf00";
        window.gh = new GithubClient(token);
    })

}