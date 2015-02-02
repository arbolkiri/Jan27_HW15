;(function(){

    function GithubClient(token){//prototype
        this.token = token;//constructor
        this.members = [];//constructor
        this.repos = [];//constructor
        
        var self = this;//created as a reference pointing to the function it is inside of
        
        var GithubRouter = Backbone.Router.extend({
            routes: {
                ":username": "drawUserInfo"
            },
            drawUserInfo: function(username){//a value assigned to var GithubRouter; what info does this give me?
                self.drawUser(username);
                self.drawRepo(username);

            },
            initialize: function(){//same as above
                Backbone.history.start();//???--forgot to ask about; look up later
            }
        })
        var router = new GithubRouter();//new instance

               this.draw();
    };

    GithubClient.prototype = {
        URLs: {
            members: "https://api.github.com/orgs/TIY-Houston-Front-End-Engineering/members",
            repos: "https://api.github.com/users/"
           
        },
        access_token: function(){
            return "?access_token=" + this.token;
        },
        repos_token: function(){
            return "/repos?access_token=" + this.token;
        },
    //     *
    //      * getData
    //      * @arguments none.
    //      * @return promise
         
        getData: function(username){
            var x = $.Deferred();//?type of promise is this?
                self = this;//for reference pointing to getDatafromUser

            if(this.members.length > 0){//if I add all members, will resolve(no member name appears)
                x.resolve(this.members);
            } else {
                var p = $.get(this.URLs.members + this.access_token());
                p.then(function(data){
                    x.resolve(data);
                    self.members = data;
                })
            }

            return x;
        },

        loadTemplate: function(name){
            // modify the event context, return only the data
            return $.get("./templates/"+name+".html").then(function(data) { //request for names
                return data; 
            });
        },

        draw: function(){//getting name info
            $.when(                       //used for more than one request at same time
                this.getData(),//renamed above
                this.loadTemplate("menu-item")
            ).then(function(members, html){
                
                var left_column = document.querySelector(".github-grid > *:nth-child(1)");
                left_column.innerHTML = _.template(html, { members: members });
            })
        },

        // drawRepoInfo: function() {///-->STOPPED HERE; getting repo info
        //     $.when (
        //         this.getDatafromUser,
        //         this.loadTemplate ("menu-item")
        // ).then(function(repos, html) {
        drawUser: function(username){//bringing everything together??
            // load data load template draw to screen
            $.when(
                this.getData(username), 
                this.loadTemplate("profile")
                ).then(function(members, html) {
                debugger;
                var user_view = document.querySelector(".github-grid > *:nth-child(2)");
                user_view.innerHTML = _.template(html, { members: members, user: username });      
      })
        
    },
    drawRepo: function(username){
           
            $.when(
                $.get(this.URLs.repos + username + this.repos_token()),
                this.loadTemplate("repos")
            ).then(function(repos, html){
              var repo_view = document.querySelector(".github-grid > *:nth-child(2)");
              repo_view.innerHTML += _.template(html, { repos: repos[0], user: username });
          })
        }
};

    window.GithubClient = GithubClient;//global variable b/c of window.

})();



