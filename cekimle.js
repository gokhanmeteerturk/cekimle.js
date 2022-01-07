/*
 * MIT License
 * Copyright (c) Gökhan Mete ERTÜRK - me@e-mete.com
 * gokhanmeteerturk
 * 2019-04-21
 *
 * Adds properties to the string prototype for enhanced turkish support.
 */

const sesliler = ["a", "e", "i", "i", "o", "ö", "u", "ü"];
const sertler = {
    "p": "b",
    "ç": "c",
    "t": "d",
    "k": "g"
};

const belirtme_seslisi = {
    "a": "ı",
    "ı": "ı",
    "e": "i",
    "i": "i",
    "o": "u",
    "u": "u",
    "ö": "ü",
    "ü": "ü"
}; // aı>i ei>i ou>u öü>ü
const yonelme_seslisi = {
    "a": "a",
    "ı": "a",
    "e": "e",
    "i": "e",
    "o": "a",
    "u": "a",
    "ö": "e",
    "ü": "e"
}; // aı>a ei>e ou>a öü>e
const dar_sesli = {
    "a": "ı",
    "ı": "ı",
    "e": "i",
    "i": "i",
    "o": "u",
    "u": "u",
    "ö": "ü",
    "ü": "ü"
}; // aı>ı ei>i ou>u öü>ü
const duz_genis_sesli = {
    "a": "a",
    "ı": "a",
    "e": "e",
    "i": "e",
    "o": "a",
    "u": "a",
    "ö": "e",
    "ü": "e"
}; // aı>a ei>e ou>a öü>e
const ki_seslisi = {
    "a": "i",
    "ı": "i",
    "e": "i",
    "i": "i",
    "o": "i",
    "u": "i",
    "ö": "i",
    "ü": "ü"
};

// son sesli a,i ise i, e,i ise i, o,u ise u, ö,ü ise ü eklenecek.
const fistikci = ["ç", "f", "h", "k", "p", "s", "s", "t"];

Object.defineProperty(String.prototype, "son_harf", {
    get() {
        return this.slice(-1);
    }
});




String.prototype.ters_cevir = function() {
    return this.split("").reverse().join("");
}
Object.defineProperty(String.prototype, "son_sesli", {
    get() {
        const ters = this.ters_cevir();
        for (let i = 0; i < ters.length; i++) {
            harf = ters.charAt(i);
            if (sesliler.includes(harf)) {
                return harf;
            }
        }
        return "a"; // hiç sesli yoksa
    }
});


function tek_hece_mi(kelime) {
    num_vowels = 0;
    for (let i = 0; i < kelime.length; i++) {
        harf = kelime.charAt(i);
        if (sesliler.includes(harf)) {
            num_vowels = num_vowels + 1
        }
        if (num_vowels > 1) {
            return false;
        }
    }
    return true;
}

function gerekliyse_daralt(kelime) {
    if (kelime == "ye") {
        return "yi";
    } else if (kelime == "de") {
        return "di";
    } else return kelime;
}

function unsuz_yumusamasi(kelime) {
    son_h = kelime.son_harf;
    if (sertler.hasOwnProperty(son_h)) {
        if (tek_hece_mi(kelime)) {
            if (kelime.ters_cevir().charAt(0) == "k" && kelime.ters_cevir().charAt(1) == "n") {
                return `${kelime.slice(0, -1)}g`;
            } else {
                return kelime;
            }
        } else {
            return kelime.slice(0, -1) + sertler[son_h];
        }
    } else {
        return kelime;
    }
}

// -----------------

Object.defineProperty(String.prototype, "mastar", {
    get() { // -mak, -mek
        return `m${duz_genis_sesli[this.son_sesli]}k`;
    }
});

// -----------------

// isimden isim yapanlar
Object.defineProperty(String.prototype, "siz", {
    get() { // kaygisiz, sessiz
        return `${this}s${dar_sesli[this.son_sesli]}z`;
    }
});

Object.defineProperty(String.prototype, "ci", {
    get() { // yolcu, sanatçi
        let harf_c;
        if (fistikci.includes(this.son_harf)) {
            harf_c = "ç";
        } else {
            harf_c = "c";
        }
        return this + harf_c + dar_sesli[this.son_sesli];
    }
});

Object.defineProperty(String.prototype, "si", {
    get() { // çocuksu, ipeksi
        return `${this}s${dar_sesli[this.son_sesli]}`;
    }
});

Object.defineProperty(String.prototype, "ca", {
    get() { // türkçe, almanca
        let harf_c;
        if (fistikci.includes(this.son_harf)) {
            harf_c = "ç";
        } else {
            harf_c = "c";
        }
        return this + harf_c + duz_genis_sesli[this.son_sesli];
    }
});

Object.defineProperty(String.prototype, "das", {
    get() { // yoldas, meslektas
        let harf_d;
        if (fistikci.includes(this.son_harf)) {
            harf_d = "t";
        } else {
            harf_d = "d";
        }
        return `${this + harf_d + duz_genis_sesli[this.son_sesli]}ş`;
    }
});

Object.defineProperty(String.prototype, "inci", {
    get() { // besinci, yed(i)inci, sonuncu
        const harf_i = dar_sesli[this.son_sesli];
        let ilk_i;
        if (sesliler.includes(this.son_harf)) {
            ilk_i = "";
        } else {
            ilk_i = harf_i;
        }
        return `${this + ilk_i}nc${harf_i}`;
    }
});

Object.defineProperty(String.prototype, "lik", {
    get() { // sekerlik, beslik
        return `${this}l${dar_sesli[this.son_sesli]}k`;
    }
});

Object.defineProperty(String.prototype, "ki", {
    get() { // geçen yilki, dünkü
        // aslinda bu isimden sifat yapiyor. isimden isim degil.
        return `${this}k${ki_seslisi[this.son_sesli]}`;
    }
});

// isimden fiil yapanlar
Object.defineProperty(String.prototype, "la", {
    get() { // sulamak, dişlemek
        return `${this}l${duz_genis_sesli[this.son_sesli]}`;
    }
});
Object.defineProperty(String.prototype, "al", {
    get() { // çoğalmak, düzelmek.
        // ÇATI EKLERİYLE KARIŞTIRMAMAK LAZIM. düzülmek al ekine örnek değil.
        // sadece son harf sessizse:
        if (sesliler.includes(this.son_harf)) {
            return "";
        } else {
            return `${unsuz_yumusamasi(this) + duz_genis_sesli[this.son_sesli]}l`;
        }
    }
});
Object.defineProperty(String.prototype, "lx", {
    get() { // doğrulmak, sivrilmek.
        // fillden fiil yapan "l"', son harf sessizse sesli harf ekliyor.
        // isimden fiil yapan "l", sadece son harf sesliyse geliyor. üstteki alttakini kapsadığı için onu kullandım:
        unlu_tureme = "";
        if (sesliler.includes(this.son_harf)) {} else {
            unlu_tureme = dar_sesli[this.son_sesli];
        }
        return `${this + unlu_tureme}l`;
    }
});
Object.defineProperty(String.prototype, "ax", {
    get() { // kanamak, türemek
        // sadece son harf sessizse:
        if (sesliler.includes(this.son_harf)) {
            return "";
        } else {
            return this + duz_genis_sesli[this.son_sesli];
        }
    }
});
Object.defineProperty(String.prototype, "lan", {
    get() { // sulanmak, evlenmek
        return `${this}l${duz_genis_sesli[this.son_sesli]}n`;
    }
});
Object.defineProperty(String.prototype, "las", {
    get() { // iyileşmek, yoğunlaşmak
        return `${this}l${duz_genis_sesli[this.son_sesli]}ş`;
    }
});
Object.defineProperty(String.prototype, "sa", {
    get() { // susamak, gülümsemek
        return `${this}s${duz_genis_sesli[this.son_sesli]}`;
    }
});


// isimden sıfat yapanlar
Object.defineProperty(String.prototype, "cil", {
    get() { // insancıl, evcil
        let harf_c;
        if (fistikci.includes(this.son_harf)) {
            harf_c = "ç";
        } else {
            harf_c = "c";
        }
        return `${this + harf_c + dar_sesli[this.son_sesli]}l`;
    }
});


// fiilden fiil yapanlar
Object.defineProperty(String.prototype, "tir", {
    get() { // durdurmak, ettirmek
        let harf_d;
        if (fistikci.includes(this.son_harf)) {
            harf_d = "t";
        } else {
            harf_d = "d";
        }
        return `${this + harf_d + dar_sesli[this.son_sesli]}r`;
    }
});

Object.defineProperty(String.prototype, "ar", {
    get() { // çıkarmak, gidermek
        // gidermek dışında yumuşama olan örnek bulamadım, yumuşamayı es geçiyorum o yüzden:
        if (sesliler.includes(this.son_harf)) {
            return "";
        } else {
            return `${this + duz_genis_sesli[this.son_sesli]}r`;
        }
    }
});

Object.defineProperty(String.prototype, "inx", {
    get() { // taşınmak, düşünmek
        dusmeyen_unlu = "";
        if (sesliler.includes(this.son_harf)) {} else {
            dusmeyen_unlu = dar_sesli[this.son_sesli];
        }
        return `${this + dusmeyen_unlu}n`;
    }
});

Object.defineProperty(String.prototype, "r", {
    get() { // taşırmak, düşürmek
        unlu_turemesi = "";
        if (sesliler.includes(this.son_harf)) {} else {
            unlu_turemesi = dar_sesli[this.son_sesli];
        }
        return `${this + unlu_turemesi}r`;
    }
});

Object.defineProperty(String.prototype, "sh", {
    get() { // yapışmak, görüşmek
        unlu_turemesi = "";
        if (sesliler.includes(this.son_harf)) {} else {
            unlu_turemesi = dar_sesli[this.son_sesli];
        }
        return `${this + unlu_turemesi}ş`;
    }
});

Object.defineProperty(String.prototype, "t", {
    get() { // korkutmak, üşütmek
        unlu_turemesi = "";
        if (sesliler.includes(this.son_harf)) {} else {
            unlu_turemesi = dar_sesli[this.son_sesli];
        }
        return `${this + unlu_turemesi}t`;
    }
});

Object.defineProperty(String.prototype, "il", {
    get() { // satılmak, görülmek
        dusmeyen_unlu = "";
        if (sesliler.includes(this.son_harf)) {} else {
            dusmeyen_unlu = dar_sesli[this.son_sesli];
        }
        return `${this + dusmeyen_unlu}l`;
    }
});


// fiilden isim yapanlar
Object.defineProperty(String.prototype, "ish", {
    get() { // satış, yürüyüş
        kaynasma_unsuzu = "y";
        if (sesliler.includes(this.son_harf)) {} else {
            kaynasma_unsuzu = "";
        }
        return `${this + kaynasma_unsuzu + dar_sesli[this.son_sesli]}ş`;
    }
});

Object.defineProperty(String.prototype, "ma", {
    get() { // satma, yürüme
        return `${this}m${duz_genis_sesli[this.son_sesli]}`;
    }
});

Object.defineProperty(String.prototype, "mak", {
    get() { // korkmak, belirmek
        return `${this}m${duz_genis_sesli[this.son_sesli]}k`;
    }
});

Object.defineProperty(String.prototype, "ti", {
    get() { // kaşıntı, belirti
        if (sesliler.includes(this.son_harf)) {
            return "";
        } else {
            return `${this}t${dar_sesli[this.son_sesli]}`;
        }
    }
});


// fiilden sıfat yapanlar
// yap et sıç sik koş öt dur düş
Object.defineProperty(String.prototype, "an", {
    get() { // korkan, düşünen
        // git->giden et-> eden ama kat->katan. o yüzden yumuşamayı yok saydım.
        kaynasma_unsuzu = "y";
        if (sesliler.includes(this.son_harf)) {} else {
            kaynasma_unsuzu = "";
        }
        return `${gerekliyse_daralt(this) + kaynasma_unsuzu + duz_genis_sesli[this.son_sesli]}n`;
    }
});

Object.defineProperty(String.prototype, "asi", {
    get() { // yapası, yürüyesi
        // git->gidesi et-> edesi ama bit->bitesi. o yüzden yumuşamayı yok saydım.
        kaynasma_unsuzu = "n";
        if (sesliler.includes(this.son_harf)) {} else {
            kaynasma_unsuzu = "";
        }
        return `${gerekliyse_daralt(this) + kaynasma_unsuzu + duz_genis_sesli[this.son_sesli]}s${dar_sesli[this.son_sesli]}`;
    }
});

Object.defineProperty(String.prototype, "maz", {
    get() { // utanmaz, tükenmez
        return `${this}m${duz_genis_sesli[this.son_sesli]}z`;
    }
});

Object.defineProperty(String.prototype, "dik", {
    get() { // bilindik, tanıdık
        let harf_d;
        if (fistikci.includes(this.son_harf)) {
            harf_d = "t";
        } else {
            harf_d = "d";
        }
        return `${this + harf_d + dar_sesli[this.son_sesli]}k`;
    }
});

Object.defineProperty(String.prototype, "acak", {
    get() { // yiyecek, yakacak
        kaynasma_unsuzu = "y";
        if (sesliler.includes(this.son_harf)) {} else {
            kaynasma_unsuzu = "";
        }
        return `${gerekliyse_daralt(this) + kaynasma_unsuzu + duz_genis_sesli[this.son_sesli]}c${duz_genis_sesli[this.son_sesli]}k`;
    }
});

Object.defineProperty(String.prototype, "mis", {
    get() { // geçmiş, yanmış
        return `${this}m${duz_genis_sesli[this.son_sesli]}ş`;
    }
});



// fiilden zarf yapanlar
// üret, yaşa, konuş, düşün
Object.defineProperty(String.prototype, "kan", {
    get() { // konuşkan, üretken
        let harf_k;
        if (sesliler.includes(this.son_harf)) {
            return "";
        }
        if (fistikci.includes(this.son_harf)) {
            harf_k = "k";
        } else {
            harf_k = "g";
        }
        return `${this+ harf_k + duz_genis_sesli[this.son_sesli]}n`;
    }
});

Object.defineProperty(String.prototype, "ip", {
    get() { // yaşayıp, üretip
        kaynasma_unsuzu = "y";
        if (sesliler.includes(this.son_harf)) {} else {
            kaynasma_unsuzu = "";
        }
        return `${gerekliyse_daralt(this) + kaynasma_unsuzu + dar_sesli[this.son_sesli]}p`;
    }
});

Object.defineProperty(String.prototype, "inca", {
    get() { // yaşayınca, düşününce
        kaynasma_unsuzu = "y";
        if (sesliler.includes(this.son_harf)) {} else {
            kaynasma_unsuzu = "";
        }
        return `${gerekliyse_daralt(this) + kaynasma_unsuzu + dar_sesli[this.son_sesli]}nc${duz_genis_sesli[this.son_sesli]}`;
    }
});

Object.defineProperty(String.prototype, "dikca", {
    get() { // konuştukça, düşündükçe
        harf_d = "d";
        if (fistikci.includes(this.son_harf)) {
            harf_d = "t";
        }
        return `${this + harf_d + dar_sesli[this.son_sesli]}kç${duz_genis_sesli[this.son_sesli]}`;
    }
});

Object.defineProperty(String.prototype, "diginda", {
    get() { // konuştuğunda, düşündüğünde
        harf_d = "d";
        if (fistikci.includes(this.son_harf)) {
            harf_d = "t";
        }
        return `${this + harf_d + dar_sesli[this.son_sesli]}ğ${dar_sesli[this.son_sesli]}nd${duz_genis_sesli[this.son_sesli]}`;
    }
});

Object.defineProperty(String.prototype, "ali", {
    get() { // yaşayalı, düşüneli
        kaynasma_unsuzu = "y";
        if (sesliler.includes(this.son_harf)) {} else {
            kaynasma_unsuzu = "";
        }
        return `${gerekliyse_daralt(this) + kaynasma_unsuzu + duz_genis_sesli[this.son_sesli]}l${dar_sesli[duz_genis_sesli[this.son_sesli]]}`;
    }
});

Object.defineProperty(String.prototype, "arak", {
    get() { // yaşayarak, üreterek
        kaynasma_unsuzu = "y";
        if (sesliler.includes(this.son_harf)) {} else {
            kaynasma_unsuzu = "";
        }
        return `${gerekliyse_daralt(this) + kaynasma_unsuzu + duz_genis_sesli[this.son_sesli]}r${duz_genis_sesli[this.son_sesli]}k`;
    }
});

Object.defineProperty(String.prototype, "asiya", {
    get() { // korkutasıya, üretesiye
        kaynasma_unsuzu = "y";
        if (sesliler.includes(this.son_harf)) {} else {
            kaynasma_unsuzu = "";
        }
        return `${gerekliyse_daralt(this) + kaynasma_unsuzu + duz_genis_sesli[this.son_sesli]}s${dar_sesli[duz_genis_sesli[this.son_sesli]]}y${duz_genis_sesli[this.son_sesli]}`;
    }
});

Object.defineProperty(String.prototype, "maksizin", {
    get() { // korkutmaksızın, düşünmeksizin
        return `${this}m${duz_genis_sesli[this.son_sesli]}ks${dar_sesli[duz_genis_sesli[this.son_sesli]]}z${dar_sesli[duz_genis_sesli[this.son_sesli]]}n`;
    }
});
Object.defineProperty(String.prototype, "ici", {
    get() { // korkutucu, üretici
        return `${this + kaynasma_unsuzu + dar_sesli[this.son_sesli]}c${dar_sesli[this.son_sesli]}`;
    }
});
