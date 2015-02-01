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
        var token = "ad25ca0322aa86f9332ee5452becc715b28adc85";
        window.gh = new GithubClient(token);

        // var profile_url ="./templates/menu-item.html";
        // var menu_item_url="./templates/profile.html";
    })

}