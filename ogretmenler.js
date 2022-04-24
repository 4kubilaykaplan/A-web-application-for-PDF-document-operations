const mongoose =require('mongoose')
const Schema =mongoose.Schema 

const blogSchema =new Schema ({
    ogretmen_kadi:{
        type: String,
        require: true 
    },
    ogretmen_sifre :{
        type: String,
        require : true 
    }
},{timestamps:true})
const ogretmenler = mongoose.model('ogretmenler',blogSchema)
module.exports= ogretmenler