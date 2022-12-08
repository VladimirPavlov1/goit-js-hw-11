const axios = require('axios').default;

console.log(axios)

export default class PhotoServiceApi{
    constructor(){
        this.query='';
        this.page=1;
    }

    fetchApi(){
        const KEY ='key=31785434-56897078df27680e7b71d8ebf'
        const BASE_URL='https://pixabay.com/api/'
        const url=`${BASE_URL}?${KEY}&q=${this.query}&page=${this.page}&per_page=15&image_type=photo&orientation=horisontal&safesearch=true`
        
        return axios.get(url)
        .then(response=>response)
        .then(data=>{
            this.page+=1;
            return data.data.hits;
        })
        .catch(error=>console.error("error"))
    }

    get sQuery(){
        return this.query
    }

    set sQuery(newQuery){
        this.query=newQuery
    }

    resetPage(){
        this.page=1;
    }

}