;(function(){

    function GithubClient(token){
        this.token = token;
        this.members = [];

        var self = this;
        var GithubRouter = Backbone.Router.extend({
            routes: {
                ":username": "drawUserInfo"
            },
            drawUserInfo: function(username){
                self.drawUser(username)
            },
            initialize: function(){
                Backbone.history.start();
            }
        })
        var router = new GithubRouter();

        this.listenToEvents();
        this.draw();
    }

    GithubClient.prototype = {
        URLs: {
            members: "https://api.github.com/orgs/TIY-Houston-Front-End-Engineering/members",
            profile: function(username){
                return "https://api.github.com/users/"+username
            },
            repolist: function(username){
                return "https://api.github.com/users/"+username+"/repos"
            }
        },
        access_token: function(){
            return "?access_token="+this.token
        },
        /**
         * getData
         * @arguments none.
         * @return promise
         */
        getData: function(){
            var x = $.Deferred(),
                self = this;

            if(this.members.length > 0){
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
            return $.get("./templates/"+name+".html").then(function(d, s, p){ return d; })
        },

        listenToEvents: function(){
            var right_side = $(".github-grid > *:nth-child(2)");

            right_side.on("click", "a", function(event){
                event.preventDefault();
                window.open(this.href,'_blank');
            })

            right_side.on("click", "input", function(event){
                event.preventDefault();
                this.select();
            })
        },

        draw: function(){
            $.when(
                this.getData(),
                this.loadTemplate("menu-item")
            ).then(function(members, html){
                // typeof html is "string"
                var left_column = document.querySelector(".github-grid > *:nth-child(1)");
                left_column.innerHTML = _.template(html, { members: members });
            })
        },

        getProfileData: function(username){
            return $.get(this.URLs.profile(username) + this.access_token()).then(function(d,s,p){ return d; });
        },

        getRepoList: function(username){
            return $.get(this.URLs.repolist(username) + this.access_token()).then(function(d,s,p){ return d; });
        },

        getSortedRepoList: function(username){
            return this.getRepoList(username).then(function(d,s,p){

                d.sort(function(a, b){

                    var collection = [a, b];
                    collection.forEach(function(v){
                        if(! (v.updated_at instanceof Date) ){
                            v.updated_at = new Date(v.updated_at);
                        }
                    })

                    return a.updated_at > b.updated_at ? -1 : 1;
                })
                return d;

            })
        },

        drawUser: function(username){
            // load data
            // load template
            // draw to screen
            $.when(
                this.getProfileData(username),
                this.getSortedRepoList(username),
                this.loadTemplate("profile")
            ).then(function(profile, repos, html){
                var right_column = document.querySelector(".github-grid > *:nth-child(2)");
                right_column.innerHTML = _.template(html, { profile: profile, repos: repos });
            })
        }
    }

    window.GithubClient = GithubClient;

})();



