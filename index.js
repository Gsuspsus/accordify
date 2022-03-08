Vue.createApp({
    data() {
        return {
            albums: [],
            loaded: false,
            selected:"playlist-link",
            username:"",
            name:"",
            link:"",
            isLoaded: false,
            isLoading: false,
            accordBaseUrl:"https://accord.dk/products/",
            apiBaseUrl:"https://gstok123-nmz1hmoz13k6zazg.socketxp.com/albums?"
        }
    },
    methods: {
      loaded() {
        this.isLoaded = true;
        this.isLoading = false;
      },
      nameSelected(){
        return this.selected == "playlist-name"
      },
      linkSelected(){
        return this.selected == "playlist-link"
      },
      formatWordForUrl(word){
        return word.replace("'","").replace(/[\W_]+/g,"-")
      },
      makeAccordUrl(album){
        return this.accordBaseUrl + 
               this.formatWordForUrl(album.artist)+"-"+
               this.formatWordForUrl(album.name)
      },
      makeApiLink(){
        if(this.selected == "playlist-link"){
          return this.apiBaseUrl+"username="+this.username+"&link="+this.link
        }else{
          return this.apiBaseUrl+"username="+this.username+"&name="+this.name
        }
      },
      fetchAlbums() {
        this.isLoaded = false;
        this.isLoading = true;
        this.albums=[]
        axios.get(this.makeApiLink()).then((response) => {
          this.albums = JSON.parse(response.data.data)
          this.isLoaded = true;
          this.isLoading = false;
        }).catch(error => {
          alert("ERROR: " + error.message)
          this.isLoading = false;
        })
      },
  },
}).mount("#app")