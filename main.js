import { XML } from "https://js.sabae.cc/XML.js";

async function getXML(link) {
  return await (await fetch(link)).text();
}

// class GeoData {}
let allXML = await getXML(
  "https://geofukui.github.io/jiban-opendata/boring.json"
);

let all = JSON.parse(allXML);

console.log(all[0].url);

let data1 = await getXML(all[0].url);

let doc = XML.toJSON(data1);
console.log(doc);

var map = L.map("mapid").setView([35.688544, 139.764692], 18);
L.tileLayer("https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png", {
  attribution:
    "<a href='https://maps.gsi.go.jp/development/ichiran.html' target='_blank'>地理院タイル</a>",
}).addTo(map);

//JIG-SAW本社の位置にマーカーを追加する。
var marker = L.marker([35.688544, 139.764692], {
  icon: L.spliteIcon("red"),
}).addTo(map);
//上のマーカーにポップアップを追加する。
marker.bindPopup("JIG-SAW本社").openPopup();
