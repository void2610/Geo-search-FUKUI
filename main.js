var req = new XMLHttpRequest(); // XMLHttpRequest オブジェクトを生成する
req.onreadystatechange = function () {
 // XMLHttpRequest オブジェクトの状態が変化した際に呼び出されるイベントハンドラ
 if (req.readyState == 4 && req.status == 200) {
  // サーバーからのレスポンスが完了し、かつ、通信が正常に終了した場合
  //alert(req.responseText); // 取得した JSON ファイルの中身を表示
 }
};
req.open("GET", "https://geofukui.github.io/jiban-opendata/boring.json", false); // HTTPメソッドとアクセスするサーバーの　URL　を指定
req.send(null);

console.log(req.responseText);

var map = L.map("mapid").setView([35.688544, 139.764692], 18);
L.tileLayer("https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png", {
 attribution: "<a href='https://maps.gsi.go.jp/development/ichiran.html' target='_blank'>地理院タイル</a>",
}).addTo(map);

//JIG-SAW本社の位置にマーカーを追加する。
var marker = L.marker([35.688544, 139.764692]).addTo(map);
//上のマーカーにポップアップを追加する。
marker.bindPopup("JIG-SAW本社").openPopup();
