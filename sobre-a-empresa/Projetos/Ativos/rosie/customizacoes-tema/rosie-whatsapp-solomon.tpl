<script>
/* Solomon — atribuição de cliques no WhatsApp (versão legível do script fornecido pela Solomon).
   Diferença do original: sem o ID da Solomon, o link do WhatsApp abre normalmente em vez de travar.
   Fonte versionada: sobre-a-empresa/Projetos/Ativos/rosie/customizacoes-tema/ */
(function () {
  var TELEFONE_PADRAO = "5511912235758";
  var MENSAGEM_PADRAO = "Olá! Vim do site e tenho dúvidas.";
  var REDIRECIONADOR = "https://test-whatsapp-685646918301.us-east1.run.app/whatsapp-redirector?";

  function lerCookie(nome) {
    var partes = ("; " + document.cookie).split("; " + nome + "=");
    if (partes.length === 2) return partes.pop().split(";").shift();
  }

  function idSolomon() {
    var id = null;
    try { id = localStorage.getItem("uniqueId"); } catch (e) {}
    return id || lerCookie("uniqueId");
  }

  document.addEventListener("click", function (evento) {
    var link = evento.target.closest && evento.target.closest("a");
    if (!link || !link.href) return;
    if (link.href.indexOf("api.whatsapp.com/send") === -1 && link.href.indexOf("wa.me/") === -1) return;

    var id = idSolomon();
    if (!id) {
      console.warn("sol_id não encontrado em localStorage ou cookie!");
      return; // segue o link original
    }
    evento.preventDefault();

    var destino = new URL(link.href);
    var parametros = new URLSearchParams(window.location.search);
    parametros.set("phone", destino.searchParams.get("phone") || TELEFONE_PADRAO);
    parametros.set("message", destino.searchParams.get("text") || MENSAGEM_PADRAO);
    parametros.set("sol_id", id);
    window.location.href = REDIRECIONADOR + parametros.toString();
  });
})();
</script>
