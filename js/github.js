;(function(){

    function GithubClient(token){//beginning of constructor
        this.token = token;
        this.members = [];
        this.repos = [];
        
        var self = this;//created as a reference pointing to function GithubClient
        
        var GithubRouter = Backbone.Router.extend({
            routes: {
                ":username": "drawUserInfo"
            },
            drawUserInfo: function(username){//a value assigned to var GithubRouter
                self.drawUser(username);
                // self.drawRepo(username);
            },
            initialize: function(){//same as above
                Backbone.history.start();//???--forgot to ask about; look up later
            }
        })
        var router = new GithubRouter();//new instance

        // this.listenToEvents();
        this.draw();
    }

    GithubClient.prototype = {
        URLs: {
            members: "https://api.github.com/orgs/TIY-Houston-Front-End-Engineering/members",
            repos: "https://api.github.com/repos/"
            // profileData: " "
            // profile: function(username){
            //     return "https://api.github.com/users/"+username
            // },
            // repolist: function(username){
            //     // return "https://api.github.com/users/"+username+"/repos"
            // }
        },
        access_token: function(){
            return "?access_token="+this.token
        },
        /**
         * getData
         * @arguments none.
         * @return promise
         */
        getDatafromUser: function(){
            var x = $.Deferred(),//?type of promise is this?
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
                return data 
            })
        },

        // listenToEvents: function(){
        //     var right_side = $(".github-grid > *:nth-child(2)");

        //     right_side.on("click", "a", function(event){
        //         event.preventDefault();
        //         window.open(this.href,'_blank');
        //     })

        //     right_side.on("click", "input", function(event){
        //         event.preventDefault();
        //         this.select();
        //     })
        // },

        draw: function(){//getting name info
            $.when(                       //used for more than one request at same time
                this.getDatafromUser(),//renamed above
                this.loadTemplate("menu-item")
            ).then(function(html, members){
                
                var left_column = document.querySelector(".github-grid > *:nth-child(1)");
                left_column.innerHTML = _.template(html, { members: members });
            })
        },

        drawRepoInfo : function(sortedRepos, username) {///-->STOPPED HERE; getting repo info
            $.when (
                this.loadTemplate (),
                this.loadTemplate ()
        ).then(function(  ,  ))
        }

        // getProfileData: function(username){
        //     // return $.get(this.URLs.profile(username) + this.access_token()).then(function(data){ return data });
        // },

        // getRepoList: function(username){
        //     return $.get(this.URLs.repolist(username) + this.access_token()).then(function(data){ return data });
        // },

        // getSortedRepoList: function(username){
        //     return this.getRepoList(username).then(function(data){

        //         data.sort(function(a, b){

        //             var collection = [a, b];
        //             collection.forEach(function(v){
        //                 if(! (v.updated_at instanceof Date) ){
        //                     v.updated_at = new Date(v.updated_at);
        //                 }
        //             })

        //             return a.updated_at > b.updated_at ? -1 : 1;
        //         })
        //         return data;

        //     })
        // },

        drawUser: function(username){//bringing everything together??
            // load data
            // load template
            // draw to screen
            $.when(
                this.getDatafromUser,
                // this.getSortedRepoList(username),
                this.loadTemplate("menu-item")
            ).then(function(repos, profile){
                debugger;
                repos.forEach(function(value) {///??WHY IS THIS UNDEFINED??
                    document.querySelector("profile").innerHTML += _.template(profile, value);
                })
                
            })
        }
    }

    window.GithubClient = GithubClient;//global variable b/c of window.

})();//end of constructor



