const express = require("express")
const fs = require("fs")
const pdfparse = require("pdf-parse")
let app = express()
const mongoose = require('mongoose')
const mongodb = "mongodb+srv://kubilay:kubilay@yazlab-kubi.gskwf.mongodb.net/yazlab?retryWrites=true&w=majority"
const upload = require('express-fileupload')
const ogretmenler = require("./ogretmenler")
const { type } = require("os")
const parcala=require("./pdfparse")
const sorgusonucu = require("./sorgu")
var kul_adi=""
const pdfler=require("./pdfler")
mongoose.connect(mongodb)
    .then((result) => {
        app.listen(4050)
    })
    .catch((err) => {
        console.log(err)
    })
app.use(upload())
app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs')
app.use(express.static('dosyalar'))
app.use(express.urlencoded({ extended: true }))

app.get("/", (req, res) => {
    res.render("main")
})
app.post("/",(req,res)=>{
    ogretmenler.find()
            .then((result) => {
                for(var i=0;i<result.length;i++){
                if(req.body.Kullanıcı===result[i].ogretmen_kadi && req.body.Password===result[i].ogretmen_sifre){
                    kul_adi=result[i].ogretmen_kadi
                    res.redirect("inuser")
                }
            }
            })
})
app.get("/main", (req, res) => {
    res.render("main")
})
app.post("/main", (req, res) => {
    ogretmenler.find()
            .then((result) => {
                for(var i=0;i<result.length;i++){
                if(req.body.Kullanıcı===result[i].ogretmen_kadi && req.body.Password===result[i].ogretmen_sifre){
                    kul_adi=result[i].ogretmen_kadi
                    res.redirect("inuser")
                }
            }
            })
})
app.get("/loginadmin", (req, res) => {
    res.render("loginadmin")
})
app.post("/loginadmin", (req, res) => {
    if (req.body.Kullanıcı === "adm" && req.body.Password === "1") {
        ogretmenler.find()
            .then((result) => {
                res.render("inadmin", { ogretmen: result })
            })

    }
    else {
        console.log("hata")
    }
})
app.get("/inadmin", (req, res) => {
    ogretmenler.find()
        .then((result) => {
            res.render("inadmin", { ogretmen: result })
        })
})
app.post("/inadmin", (req, res) => {
    if ((typeof req.body.kullanici) != "undefined" && (typeof req.body.sifre) != "undefined") {
        var yenikayit = new ogretmenler({
            ogretmen_kadi: req.body.kullanici,
            ogretmen_sifre: req.body.sifre
        })
        yenikayit.save()
            .then((result) => {
                ogretmenler.find()
                    .then((result) => {
                        res.render("inadmin", { ogretmen: result })
                    })
            })
            .catch((err) => {
                console.log(err)
            })
    }
    if ((typeof req.body.kullaniciguncelle) != 'undefined') {
        ogretmenler.deleteOne({ ogretmen_kadi: req.body.kullaniciguncelle }, (err) => {
            if (err) throw err
        })
        const ogretmen = new ogretmenler({
            ogretmen_kadi: req.body.kullaniciguncelle2,
            ogretmen_sifre: req.body.guncellesifre
        })
        ogretmen.save()
            .then((result) => {
                ogretmenler.find()
                    .then((result2) => {
                        res.render("inadmin", { ogretmen: result2 })
                    })
            })
            .catch((err) => {
                console.log(err)
            })
    }
    if ((typeof req.body.kullanicisil) != 'undefined') {
        ogretmenler.deleteOne({ ogretmen_kadi: req.body.kullanicisil }, (err) => {
            if (err) throw err
            ogretmenler.find()
                    .then((result2) => {
                        res.render("inadmin", { ogretmen: result2 })
                    })

        })
    }

})
app.get("/inuser",(req,res)=>{
    res.render("inuser")
})
app.post("/inuser",(req,res)=>{
    console.log("girdi.")
    if (req.files) {
        console.log("girdi.")
        var file = req.files.filepdf
        var filename = file.name

        file.mv("./dosyalar/" + filename, function (err) {
            if (err) {
                console.log(err)
            }
            else {
                var a=parcala(filename,kul_adi)
                res.render("inuser")
            }
        })
    }
})
app.get("/usersorgu",(req,res)=>{
    res.render("usersorgu",{jsonfile : {
        
            file: "",
            yazar_bilgileri: " ",
            ders_adi: "",
            proje_ozet: "",
            proje_teslim_donem: "",
            proje_baslik: "",
            proje_anahtar: "",
            proje_danisman: "",
            proje_juri: "",
            proje_kullanici: ""
        }
    })
})
app.post("/usersorgu",(req,res)=>{
    list=[]
    list2=[]
    list3=[]
    list4=[]
    list5=[]
    list6=[]
    list7=[]
    list8=[]
        pdfler.find({ proje_kullanici: kul_adi })
            .then((result) => {
                console.log("resultu geldi.")
                if (req.body.yazar.length != 0) {
                    for (i = 0; i < result.length; i++) {
    
                        if (result[i].yazar_bilgileri.search(req.body.yazar) != -1) {
                            list.push(result[i])
                        }
                    }
                }
                else {
                    list = result
                }
                if (req.body.Konusu.length != 0) {
                    for (i = 0; i < list.length; i++) {
    
                        if (list[i].proje_baslik.search(req.body.Konusu) != -1) {
                            list2.push(list[i])
                        }
                    }
                }
                else {
                    list2 = list
                }
                if (req.body.dersadi.length != 0) {
                    for (i = 0; i < list2.length; i++) {
    
                        if (list2[i].ders_adi.search(req.body.dersadi) != -1) {
                            list3.push(list2[i])
                        }
                    }
                }
                else {
                    list3 = list2
                }
                if (req.body.ozet.length != 0) {
                    for (i = 0; i < list3.length; i++) {
    
                        if (list3[i].proje_ozet.search(req.body.ozet) != -1) {
                            list4.push(list3[i])
                        }
                    }
                }
                else {
                    list4 = list3
                }
                if (req.body.Dönem.length != 0) {
                    for (i = 0; i < list4.length; i++) {
    
                        if (list4[i].proje_teslim_donem.search(req.body.Dönem) != -1) {
                            list5.push(list4[i])
                        }
                    }
                }
                else {
                    list5 = list4
                }
                if (req.body.anahtar.length != 0) {
                    for (i = 0; i < list5.length; i++) {
    
                        if (list5[i].proje_anahtar.search(req.body.anahtar) != -1) {
                            list6.push(list5[i])
                        }
                    }
                }
                else {
                    list6 = list5
                }
                if (req.body.danisman.length != 0) {
                    for (i = 0; i < list6.length; i++) {
    
                        if (list6[i].proje_danisman.search(req.body.danisman) != -1) {
                            list7.push(list6[i])
                        }
                    }
                }
                else {
                    list7 = list6
                }
                if (req.body.juri.length != 0) {
                    for (i = 0; i < list7.length; i++) {
    
                        if (list7[i].proje_juri.search(req.body.juri) != -1) {
                            list8.push(list7[i])
                        }
                    }
                }
                else {
                    list8 = list7
                }
                res.render("usersorgu",{ jsonfile : list8})
            })
   
})
app.get("/adminsorgu",(req,res)=>{
    res.render("adminsorgu",{infile : {
        
        file: "",
        yazar_bilgileri: " ",
        ders_adi: "",
        proje_ozet: "",
        proje_teslim_donem: "",
        proje_baslik: "",
        proje_anahtar: "",
        proje_danisman: "",
        proje_juri: "",
        proje_kullanici: ""
    }
})
})
app.post("/adminsorgu",(req,res)=>{
    list=[]
    list2=[]
    list3=[]
    list4=[]
    list5=[]
    list6=[]
    list7=[]
    list8=[]
    list9=[]
    pdfler.find()
            .then((result) => {
                console.log("resultu geldi.")
                if (req.body.yazar.length != 0) {
                    for (i = 0; i < result.length; i++) {
    
                        if (result[i].yazar_bilgileri.search(req.body.yazar) != -1) {
                            list.push(result[i])
                        }
                    }
                }
                else {
                    list = result
                }
                if (req.body.Konusu.length != 0) {
                    for (i = 0; i < list.length; i++) {
    
                        if (list[i].proje_baslik.search(req.body.Konusu) != -1) {
                            list2.push(list[i])
                        }
                    }
                }
                else {
                    list2 = list
                }
                if (req.body.dersadi.length != 0) {
                    for (i = 0; i < list2.length; i++) {
    
                        if (list2[i].ders_adi.search(req.body.dersadi) != -1) {
                            list3.push(list2[i])
                        }
                    }
                }
                else {
                    list3 = list2
                }
                if (req.body.ozet.length != 0) {
                    for (i = 0; i < list3.length; i++) {
    
                        if (list3[i].proje_ozet.search(req.body.ozet) != -1) {
                            list4.push(list3[i])
                        }
                    }
                }
                else {
                    list4 = list3
                }
                if (req.body.Dönem.length != 0) {
                    for (i = 0; i < list4.length; i++) {
    
                        if (list4[i].proje_teslim_donem.search(req.body.Dönem) != -1) {
                            list5.push(list4[i])
                        }
                    }
                }
                else {
                    list5 = list4
                }
                if (req.body.anahtar.length != 0) {
                    for (i = 0; i < list5.length; i++) {
    
                        if (list5[i].proje_anahtar.search(req.body.anahtar) != -1) {
                            list6.push(list5[i])
                        }
                    }
                }
                else {
                    list6 = list5
                }
                if (req.body.danisman.length != 0) {
                    for (i = 0; i < list6.length; i++) {
    
                        if (list6[i].proje_danisman.search(req.body.danisman) != -1) {
                            list7.push(list6[i])
                        }
                    }
                }
                else {
                    list7 = list6
                }
                if (req.body.juri.length != 0) {
                    for (i = 0; i < list7.length; i++) {
    
                        if (list7[i].proje_juri.search(req.body.juri) != -1) {
                            list8.push(list7[i])
                        }
                    }
                }
                else {
                    list8 = list7
                }
                if (req.body.yukleyen_kullanici.length != 0) {
                    for (i = 0; i < list8.length; i++) {
    
                        if (list8[i].proje_kullanici.search(req.body.yukleyen_kullanici) != -1) {
                            list9.push(list8[i])
                        }
                    }
                }
                else {
                    list9 = list8
                }
                res.render("adminsorgu",{ infile : list8})
            })
})