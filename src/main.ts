import { showIbeResult } from "./email";
import { inbox, inMail } from "./gmail";

function main() {
  let url: URL = new URL(document.URL);
  let params: URLSearchParams = url.searchParams;
  if (url.origin + url.pathname === "https://mail.google.com/mail/u/0/") {
    // URLが変更されたらevent
    addEventListener("hashchange", function (event: HashChangeEvent) {
      let u = new URL(event.newURL);
      if (u.hash === "#inbox") {
        // まだ色をつけていないなら
        // inbox();
        // なにかフラグを立てておく
      } else if (u.hash.match(/#inbox\/?\?compose=/)) {
        // 新規メール
        console.log("writing new email");
      } else if (u.hash.match(/#inbox\/[\w]+/)) {
        // メールを展開
        inMail();
      }
    });

    console.log(params.get("compose"));


    if (url.hash === "#inbox") {
      // メール一覧
      inbox();
    } else if (url.hash.match(/#inbox\/?\?compose=/)) {
      // 新規メールを書く
      console.log("writing new mail");
    } else if (url.hash.match(/#inbox\/[\w]+/)) {
      // メールを展開
      inMail();
    } else if (params.has("permmsgid") && params.has("ik") && params.has("view")) {
      // メールのソースを表示
      showIbeResult();
    }
  }
}

main();