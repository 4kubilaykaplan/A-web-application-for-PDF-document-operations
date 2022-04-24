const pdfler=require("./pdfler")
var list = []
var list2 = []
var list3 = []
var list4 = []
var list5 = []
var list6 = []
var list7 = []
var list8 = []
function sorgusonucu(yazar,Proje_konusu,Ders_adi,Proje_ozeti,Proje_donemi,Proje_anahtar,Proje_danisman,Proje_juri,k__adi)
{
    var i = 0, tutac = 0;
    pdfler.find({ proje_kullanici: k__adi })
        .then((result) => {
            console.log("resultu geldi.")
            if (yazar.length != 0) {
                for (i = 0; i < result.length; i++) {

                    if (result[i].yazar_bilgileri.search(yazar) != -1) {
                        list.push(result[i])
                    }
                }
            }
            else {
                list = result
            }
            if (Proje_konusu.length != 0) {
                for (i = 0; i < list.length; i++) {

                    if (list[i].proje_baslik.search(Proje_konusu) != -1) {
                        list2.push(list[i])
                    }
                }
            }
            else {
                list2 = list
            }
            if (Ders_adi.length != 0) {
                for (i = 0; i < list2.length; i++) {

                    if (list2[i].ders_adi.search(Ders_adi) != -1) {
                        list3.push(list2[i])
                    }
                }
            }
            else {
                list3 = list2
            }
            if (Proje_ozeti.length != 0) {
                for (i = 0; i < list3.length; i++) {

                    if (list3[i].proje_ozet.search(Proje_ozeti) != -1) {
                        list4.push(list3[i])
                    }
                }
            }
            else {
                list4 = list3
            }
            if (Proje_donemi.length != 0) {
                for (i = 0; i < list4.length; i++) {

                    if (list4[i].proje_teslim_donem.search(Proje_donemi) != -1) {
                        list5.push(list4[i])
                    }
                }
            }
            else {
                list5 = list4
            }
            if (Proje_anahtar.length != 0) {
                for (i = 0; i < list5.length; i++) {

                    if (list5[i].proje_anahtar.search(Proje_anahtar) != -1) {
                        list6.push(list5[i])
                    }
                }
            }
            else {
                list6 = list5
            }
            if (Proje_danisman.length != 0) {
                for (i = 0; i < list6.length; i++) {

                    if (list6[i].proje_danisman.search(Proje_danisman) != -1) {
                        list7.push(list6[i])
                    }
                }
            }
            else {
                list7 = list6
            }
            if (Proje_juri.length != 0) {
                for (i = 0; i < list7.length; i++) {

                    if (list7[i].proje_juri.search(Proje_juri) != -1) {
                        list8.push(list7[i])
                    }
                }
            }
            else {
                list8 = list7
            }
            return list8 ;
        })
}
module.exports = sorgusonucu ;