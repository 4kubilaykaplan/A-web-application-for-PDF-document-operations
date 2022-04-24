const fs = require("fs")
const pdfparse = require("pdf-parse")
const pdfler=require("./pdfler")
function parcala(filename,k_adii)
{
    var pdffile = fs.readFileSync("./dosyalar/" + filename)
    pdfparse(pdffile).then(function (data) {
        var pdf_array = []
        var pdf_text = data.text
        const parse_pdf = data.text.split(' ')

        var ders_adi = parse_pdf[11] + " " + parse_pdf[12]
        var Tezsahibi = ""
        var proje_donemi = ""
        var proje_ozeti = ""
        var proje_konusu = ""
        var proje_anahtar_kelimeler = ""
        var proje_danisman = ""
        var proje_juriler = ""
        for (var i = 0; i < parse_pdf.length; i++) {
            if (parse_pdf[i] === "No:") {
                Tezsahibi = Tezsahibi + parse_pdf[i + 1] + " " + parse_pdf[i + 4] + " " + parse_pdf[i + 5] + " "
                if (parse_pdf[i + 1].charAt(5) == '1') {
                    Tezsahibi = Tezsahibi + " 1.Öğretim"
                }
                else if (parse_pdf[i + 1].charAt(5) == '2') {
                    Tezsahibi = Tezsahibi + "2.Öğretim    "
                }
            }

        }
        for (var i = 0; i < parse_pdf.length; i++) {
            if (parse_pdf[i] == "Tarih:") {
                if (parse_pdf[i + 1].charAt(3) == '0') {
                    if (parseInt(parse_pdf[i + 1].charAt(4)) > 6) {
                        proje_donemi = "Güz"
                    }
                    else {
                        proje_donemi = "Bahar"
                    }
                }
                else {
                    proje_donemi = "Güz"
                }
            }

        }
        var tutamac = 0

        for (var i = 0; i < parse_pdf.length; i++) {
            if (parse_pdf[i].charAt(1) == 'Ö' && parse_pdf[i].charAt(2) == 'Z' && parse_pdf[i].charAt(3) == 'E' && parse_pdf[i].charAt(4) == 'T' && parse_pdf[i + 1].length <= 15) {
                for (var j = i + 1; j < parse_pdf.length; j++) {
                    if (parse_pdf[j].charAt(1) == 'A' && parse_pdf[j].charAt(2) == 'n' && parse_pdf[j].charAt(3) == 'a' && parse_pdf[j].charAt(4) == 'h' && parse_pdf[j].charAt(5) == 't') {
                        break
                    }
                    proje_ozeti = proje_ozeti + parse_pdf[j] + " "
                }
            }
        }
        for (var i = 16; i < 250; i++) {
            proje_konusu = proje_konusu + parse_pdf[i] + " "
            if (parse_pdf[i].length < 2) {
                break
            }
        }
        for (var i = 0; i < parse_pdf.length; i++) {
            if (parse_pdf[i] == "kelimeler:") {
                for (var j = i + 1; j < i + 50; j++) {
                    if (parse_pdf[j].length <= 2 && parse_pdf[j + 1].length <= 2) {
                        break
                    }
                    proje_anahtar_kelimeler = proje_anahtar_kelimeler + parse_pdf[j] + " "
                }
            }
        }
        var tutac2 = 0;
        for (var i = 0; i < 500; i++) {
            if (parse_pdf[i].charAt(2) == '.' && parse_pdf[i].charAt(20) == '.' && parse_pdf[i].length > 45) {
                for (var j = i; j > 0; j--) {
                    if (parse_pdf[j].length <= 2) {
                        tutac2 = j + 1
                        break
                    }
                }
                for (var t = tutac2; t < parse_pdf.length; t++) {
                    if (parse_pdf[t + 1] == "Kocaeli") {
                        break;
                    }
                    proje_danisman = proje_danisman + parse_pdf[t] + " "
                }
                break
            }
        }
        var tutacbreak=0
        for (var i = 0; i < 70; i++) {
            if (parse_pdf[i].charAt(25) == '.' && parse_pdf[i].length > 45) {
                for (var j = i; j > 0; j--) {
                    if (parse_pdf[j].length <= 2) {
                        tutac2 = j + 1
                        break
                    }
                }
                for (var t = tutac2; t < parse_pdf.length; t++) {
                    if (parse_pdf[t + 1] == "Kocaeli") {
                        var tutac10=0;
                        for(var l=t;l<parse_pdf.length;l++){
                            if(parse_pdf[l].length>45){
                                tutac10=l
                                break
                            }
                        }
                        t=tutac10+1
                        if(parse_pdf[t].length==0 || parse_pdf[t].length==1 || parse_pdf[t].length>45){
                            break
                            tutacbreak=1
                        }
                        else{
                            if(parse_pdf[t].charAt(1)=='T' || parse_pdf[t].charAt(0)=='T'){
                                break
                                tutacbreak=1
                            }
                        }
                    }
                    proje_juriler = proje_juriler + parse_pdf[t] + " "
                }
                break
            }
            
        }
        const pdf = new pdfler({
            file: filename,
            yazar_bilgileri: Tezsahibi,
            ders_adi: ders_adi,
            proje_ozet: proje_ozeti,
            proje_teslim_donem: proje_donemi,
            proje_baslik: proje_konusu,
            proje_anahtar: proje_anahtar_kelimeler,
            proje_danisman: proje_danisman,
            proje_juri: proje_juriler,
            proje_kullanici: k_adii
        })
        pdf.save().then((result) => {
            console.log("basarli")
        })
            .catch((err) => {
                console.log("başarısız.")
            })




    })
}

module.exports =parcala;