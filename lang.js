// Remembers the language the visitor picked; on the Korean home page,
// sends non-Korean browsers to /en/ unless they chose Korean before.
(function () {
  var KEY = "alfred-site-lang";
  function get() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function set(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }
  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest("a[data-lang]");
    if (a) set(a.getAttribute("data-lang"));
  });
  var home = document.documentElement.getAttribute("data-home") === "ko";
  if (home && !get()) {
    var langs = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || "ko"];
    var korean = langs.some(function (l) { return /^ko\b/i.test(l); });
    if (!korean) location.replace("en/" + location.hash);
  }
})();
