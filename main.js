import { XML } from "https://js.sabae.cc/XML.js";
import { shuffle } from "https://js.sabae.cc/shuffle.js";

async function getXML(link) {
 return await (await fetch(link, { mode: "cors" })).text();
}
let num;
while (1) {
 num = prompt("読み込むデータ件数を入力(~2397)");
 if (num === null) {
  num = 10; // default
  break;
 }
 if (num > 0 && num <= 2397) {
  break;
 }
}
class GeoData {
 value = 0;
 lat = 0;
 lng = 0;
 constructor(a, n, v) {
  this.lat = a;
  this.lng = n;
  this.value = v;
 }
}
const text = document.getElementById("text");
function setPin(a, n, v) {
 if (v == 0) {
  console.log("error");
  return;
 }
 let color = "green";
 if (v < 3) {
  color = "red";
 }
 const marker = L.marker([n, a], { icon: L.spriteIcon(color) }).addTo(map);
 //上のマーカーにポップアップを追加する。
 marker.bindPopup(String(v)).openPopup();
}
const allXML = await getXML("https://geofukui.github.io/jiban-opendata/boring.json");
const all = JSON.parse(allXML);
const alldata = new Array(2398);
const gArray = new Array(2398);
shuffle(all);
for (let i = 0; i < num; i++) {
 text.innerText = "データロード中... " + (i + 1) + "/" + num;
 alldata[i] = await getXML(all[i].url);
 alldata[i] = XML.toJSON(alldata[i]);
 console.log(i);
 let a, n, v;
 if (!alldata[i].ボーリング情報.コア情報.標準貫入試験) {
  console.log("no data");
 } else {
  if (!alldata[i].ボーリング情報.コア情報.標準貫入試験.標準貫入試験_合計打撃回数) {
   a = Number(alldata[i].ボーリング情報.標題情報.経度緯度情報.経度_度["#text"]) + Number(alldata[i].ボーリング情報.標題情報.経度緯度情報.経度_分["#text"]) / 60 + Number(alldata[i].ボーリング情報.標題情報.経度緯度情報.経度_秒["#text"]) / 3600;
   n = Number(alldata[i].ボーリング情報.標題情報.経度緯度情報.緯度_度["#text"]) + Number(alldata[i].ボーリング情報.標題情報.経度緯度情報.緯度_分["#text"]) / 60 + Number(alldata[i].ボーリング情報.標題情報.経度緯度情報.緯度_秒["#text"]) / 3600;
   v = Number(alldata[i].ボーリング情報.コア情報.標準貫入試験[0].標準貫入試験_合計打撃回数["#text"]);
  }
 }
 gArray[i] = new GeoData(Number(a), Number(n), Number(v)); //console.log("緯度 " + a + " 経度 " + n + " n値 " + v);
}
text.innerText = "Geo Search FUKUI";
const map = L.map("mapid").setView([35.688545, 139.764693], 18);
L.tileLayer("https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png", { attribution: "<a href='https://maps.gsi.go.jp/development/ichiran.html' target='_blank'>地理院タイル</a>" }).addTo(map);
L.Icon.Default.imagePath = "https://unpkg.com/leaflet@1.3.1/dist/images/";
for (let i = 0; i < num; i++) {
 console.log(gArray[i]);
 if (!gArray[i].lat) {
  continue;
 }
 setPin(gArray[i].lat, gArray[i].lng, gArray[i].value);
}
