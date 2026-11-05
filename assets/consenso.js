/* Consenso cookie (Garante privacy, linee guida 10/06/2021) + tag Google Ads.
   Il tag di Google viene caricato SOLO dopo il consenso. Scelta valida 6 mesi. */
(function () {
  var ADS_ID = 'AW-740673737';
  var KEY = 'consenso_cookie_v1', DURATA = 182 * 24 * 3600 * 1000;
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () { dataLayer.push(arguments); };
  gtag('consent', 'default', { ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied', analytics_storage: 'denied' });

  function leggi() { try { var v = JSON.parse(localStorage.getItem(KEY)); if (v && Date.now() - v.t < DURATA) return v.s; } catch (e) {} return null; }
  function salva(s) { try { localStorage.setItem(KEY, JSON.stringify({ s: s, t: Date.now() })); } catch (e) {} }
  var caricato = false;
  function caricaTag() {
    if (caricato) return; caricato = true;
    gtag('consent', 'update', { ad_storage: 'granted', ad_user_data: 'granted', ad_personalization: 'granted', analytics_storage: 'granted' });
    var s = document.createElement('script'); s.async = true; s.src = 'https://www.googletagmanager.com/gtag/js?id=' + ADS_ID;
    document.head.appendChild(s); gtag('js', new Date()); gtag('config', ADS_ID); gtag('config', 'G-818NP2GHN0');
  }

  var css = '#ck{position:fixed;left:16px;right:16px;bottom:16px;z-index:9999;max-width:620px;margin-inline:auto;background:#fff;color:#14303B;border:1px solid #C9DAD8;border-radius:16px;box-shadow:0 12px 40px rgba(20,48,59,.22);padding:20px 20px 18px;font:15px/1.5 Figtree,system-ui,sans-serif}' +
    '#ck p{margin:0 28px 14px 0}#ck a{color:#1F6F78;font-weight:600}#ck .b{display:flex;gap:10px;flex-wrap:wrap}' +
    '#ck button.s{flex:1 1 160px;min-height:44px;border-radius:999px;font:600 15px Figtree,system-ui,sans-serif;cursor:pointer;border:2px solid #1F6F78}' +
    '#ck .ok{background:#1F6F78;color:#fff}#ck .no{background:#fff;color:#1F6F78}' +
    '#ck .x{position:absolute;top:8px;right:8px;width:40px;height:40px;border:0;background:none;font-size:24px;line-height:1;color:#4F6670;cursor:pointer;border-radius:50%}' +
    '#ck button:focus-visible{outline:3px solid #F2C14E;outline-offset:2px}@media (max-width:700px){#ck{bottom:76px}}';

  function banner() {
    if (document.getElementById('ck')) return;
    var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);
    var d = document.createElement('div'); d.id = 'ck'; d.setAttribute('role', 'dialog'); d.setAttribute('aria-label', 'Preferenze sui cookie');
    d.innerHTML = '<button class="x" type="button" aria-label="Chiudi e rifiuta i cookie non necessari">×</button>' +
      '<p>Usiamo solo cookie tecnici. Con il tuo consenso usiamo anche i cookie di Google Ads, per misurare quante persone ci contattano dopo aver visto i nostri annunci. Puoi cambiare idea in ogni momento dal link «Preferenze cookie» in fondo alla pagina. <a href="/privacy-cookie/">Informativa privacy e cookie</a></p>' +
      '<div class="b"><button class="s no" type="button">Rifiuta</button><button class="s ok" type="button">Accetta</button></div>';
    document.body.appendChild(d);
    function scegli(s) { salva(s); d.remove(); if (s === 'si') caricaTag(); }
    d.querySelector('.ok').onclick = function () { scegli('si'); };
    d.querySelector('.no').onclick = function () { scegli('no'); };
    d.querySelector('.x').onclick = function () { scegli('no'); };
  }

  // Conversioni Google Ads: clic su telefono e WhatsApp (contano solo se il visitatore ha accettato)
  var CONV = { tel: 'AW-740673737/_Ig2CNmmkbIdEMmRl-EC', wa: 'AW-740673737/lcDsCJiSmbIdEMmRl-EC' };
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href]'); if (!a || !caricato) return;
    var h = a.getAttribute('href') || '';
    var k = h.indexOf('tel:') === 0 ? 'tel' : (/wa\.me|api\.whatsapp\.com/.test(h) ? 'wa' : null);
    if (k) gtag('event', 'conversion', { send_to: CONV[k] });
  }, true);

  var scelta = leggi();
  if (scelta === 'si') caricaTag();
  function avvio() {
    if (scelta === null) banner();
    document.addEventListener('click', function (e) {
      var a = e.target.closest('[data-cookie-pref]'); if (!a) return; e.preventDefault();
      try { localStorage.removeItem(KEY); } catch (er) {}
      if (caricato) { gtag('consent', 'update', { ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied', analytics_storage: 'denied' }); }
      banner();
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', avvio); else avvio();
})();
