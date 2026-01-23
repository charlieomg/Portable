<script>
const url = window.location.href.toLowerCase();
const domain = window.location.hostname.toLowerCase();

if(url.includes("code") && domain.endsWith(".org")) {
  alert("You are using dougies code.org edition: SOME THINGS MAY NOT WORKING");
}
</script>
