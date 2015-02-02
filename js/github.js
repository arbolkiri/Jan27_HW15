;(function(){

    function GithubClient(token){//prototype
        this.token = token;//constructor
        this.members = [];//constructor
        // this.repos = [];//constructor
        
        var self = this;//created as a reference pointing to the function it is inside of
        
        var GithubRouter = Backbone.Router.extend({
            routes: {
                ":username": "drawUserInfo"
            },
            drawUserInfo: function(username){//a value assigned to var GithubRouter; what info does this give me?
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
            members: "https://api.github.com/orgs/TIY-Houston-Front-End-Engineering/members"
            // repos: "https://api.github.com/repos/"
            // profileData: " "
            // profile: function(username){
            //     return "https://api.github.com/users/"+username
            // },
            // repolist: function(username){
            //     // return "https://api.github.com/users/"+username+"/repos"
            // }
        },
        access_token: function(){
            return "?access_token=" + this.token
        },
    //     *
    //      * getData
    //      * @arguments none.
    //      * @return promise
         
        getData: function(){
            var x = $.Deferred();//?type of promise is this?
                // self = this;//for reference pointing to getDatafromUser

            if(this.members.length > 0){//if I add all members, will resolve(no member name appears)
                x.resolve(this.members);
            } else {
                var p = $.get(this.URLs.members + this.access_token());
                p.then(function(data){
                    x.resolve(data);
                    this.members = data;
                })
            }

            return x;
        },

        loadTemplate: function(name){
            // modify the event context, return only the data
            return $.get("./templates/"+name+".html").then(function(data) { //request for names
                return data; 
            })
        },

    //     // listenToEvents: function(){
    //     //     var right_side = $(".github-grid > *:nth-child(2)");

    //     //     right_side.on("click", "a", function(event){
    //     //         event.preventDefault();
    //     //         window.open(this.href,'_blank');
    //     //     })

    //     //     right_side.on("click", "input", function(event){
    //     //         event.preventDefault();
    //     //         this.select();
    //     //     })
        

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

        //     var right_column = document.querySelector(".menu-item");
        //     right_column.innerHTML = _.template(html, {repos: repos});
        // })
        // }

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
            // load data load template draw to screen
            $.when(this.getData(), this.loadTemplate("right")).then(function(members, html) {
                debugger;
                arr_of_str = members.map(function(m) {
                    return _.template(html, m)
                })
            
                var right_column = document.querySelector(".github-grid > *:nth-child(even)");
                    right_column.innerHTML = arr_of_str.join()
      })
        
    }
}

    window.GithubClient = GithubClient;//global variable b/c of window.

})();



