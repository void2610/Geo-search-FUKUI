//import { XML } from "https://js.sabae.cc/XML.js";

function GetXML(link) {
 let req = new XMLHttpRequest();
 req.onreadystatechange = function () {
  if (req.readyState == 4 && req.status == 200) {
  }
 };
 req.open("GET", link, false);
 req.send(null);
 return req.responseText;
}

class GeoData {}

allXML = GetXML("https://geofukui.github.io/jiban-opendata/boring.json");

all = JSON.parse(allXML);

console.log(all[0].url);

data1 = GetXML(all[0].url);

//let doc = xmlTojson(data1);
console.log(data1);

var map = L.map("mapid").setView([35.688544, 139.764692], 18);
L.tileLayer("https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png", {
 attribution: "<a href='https://maps.gsi.go.jp/development/ichiran.html' target='_blank'>地理院タイル</a>",
}).addTo(map);

//JIG-SAW本社の位置にマーカーを追加する。
var marker = L.marker([35.688544, 139.764692]).addTo(map);
//上のマーカーにポップアップを追加する。
marker.bindPopup("JIG-SAW本社").openPopup();
