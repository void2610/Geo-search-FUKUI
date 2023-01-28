import { XML } from "https://js.sabae.cc/XML.js";

async function getXML(link) {
  return await (await fetch(link)).text();
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

let allXML = await getXML(
  "https://geofukui.github.io/jiban-opendata/boring.json"
);

let all = JSON.parse(allXML);

let alldata = new Array(2398);

let gArray = new Array(10);

for (let i = 0; i < 10; i++) {
  alldata[i] = await getXML(all[i].url);
  alldata[i] = XML.toJSON(alldata[i]);
  let a = alldata[i].ボーリング情報.標題情報.経度緯度情報.経度_度["#text"];
  let n = alldata[i].ボーリング情報.標題情報.経度緯度情報.緯度_度["#text"];
  let v =
    alldata[i].ボーリング情報.コア情報.標準貫入試験[0]
      .標準貫入試験_合計打撃回数["#text"];
  gArray[i] = new GeoData(a, n, v);
  console.log("緯度 " + a + " 経度 " + n + " n値 " + v);
}

var map = L.map("mapid").setView([35.688544, 139.764692], 18);
L.tileLayer("https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png", {
  attribution:
    "<a href='https://maps.gsi.go.jp/development/ichiran.html' target='_blank'>地理院タイル</a>",
}).addTo(map);

L.Icon.Default.imagePath = "https://unpkg.com/leaflet@1.3.1/dist/images/";
var marker = L.marker([35.688544, 139.764692], {
  icon: L.spriteIcon("red"),
}).addTo(map);

//上のマーカーにポップアップを追加する。
marker.bindPopup("JIG-SAW本社").openPopup();
