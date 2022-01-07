# cekimle.js
Adds properties to the string prototype for enhanced turkish support.

These properties can be used to produce:
| End Result          | Suffixes                                                         |
|---------------------|------------------------------------------------------------------|
| Noun from noun      | .siz .ci .si .ca .das .inci .lik .ki                             |
| Verb from noun      | .la .al .l(x) .a(x) .lan .las .sa                                |
| Adjective from noun | .cil (for now)                                                   |
| Verb from verb      | .tir .ar .in(x) .r .sh .t .il                                    |
| Noun from verb      | .ish .ma .mak .ti                                                |
| Adjective from verb | .an .asi .maz .dik .acak .mis                                    |
| Adverb from verb    | .kan .ip .inca .dikca .diginda .ali .arak .asiya .maksizin .ici  |


---
 ```js
 "ot".cil            // otçul
 ```
 ```js
"çok".al.mak        // çoğalmak
 ```
 ```js
"koş".ish.tir.ma.ca // koşuşturmaca
 ```
 ```js
"ye".acak           // yiyecek

"sözcük".son_harf   // k

"sözcük".son_sesli  // ü

"sözcük".ters_cevir // küczös

"yap".mastar        // yapmak

"güldür".mastar     // güldürmek

"yol".ci            // yolcu

"sanat".ci          // sanatçı

"çocuk".si          // çocuksu

"ipek".si           // ipeksi
 ```
 
 Some extra functions:
 ```js
 gerekliyse_daralt(word)
 unsuz_yumusamasi(word)
 tek_hece_mi(word)
 ```
 
 Constant arrays:
 ```js
 sesliler
 fistikci
 ```
 
 And more.
