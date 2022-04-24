const mongoose =require('mongoose')
const Schema =mongoose.Schema 

const blogSchema =new Schema ({
    file :{
        type: String,
        require : true 
    },
    yazar_bilgileri:{
        type: String,
        require: true 
    },
    ders_adi :{
        type: String,
        require : true 
    },
    proje_ozet :{
        type: String,
        require : true 
    },
    proje_teslim_donem :{
        type: String,
        require : true 
    },
    proje_baslik :{
        type: String,
        require : true 
    },
    proje_anahtar :{
        type: String,
        require : true 
    },
    proje_danisman :{
        type: String,
        require : true 
    },
    proje_juri :{
        type: String,
        require : true 
    },
    proje_kullanici :{
        type: String,
        require : true 
    }
    

})
const dbpdf = mongoose.model('dbpdf',blogSchema)
module.exports= dbpdf