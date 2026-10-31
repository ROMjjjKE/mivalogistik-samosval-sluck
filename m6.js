<script>
(function(){
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var pin = document.getElementById('dvadcat');
  var num = document.getElementById('num');
  var items = [].slice.call(document.querySelectorAll('#list li'));
  var sideBig = document.getElementById('sideBig'), sideP = document.getElementById('sideP');
  var sides = [
    ['20 тонн — это про вес, а не про кубы','Один и тот же кузов привезёт разный объём: песка меньше по массе на куб, чем щебня. Поэтому в заявке мы спрашиваем материал и объём, а не только «машину».'],
    ['Материал решает, сколько рейсов','Песок, щебень, гравий, грунт, ПГС ведут себя по-разному в кузове. Назовите материал — и мы скажем, один рейс или несколько.'],
    ['Двадцать тонн в аренде и в доставке','В аренде вы платите за машину и время. В доставке — за материал, привезённый на объект. Формат меняет и цену, и сроки.']
  ];
  function apply(p) {
    var k = p < .34 ? 0 : (p < .72 ? 1 : 2);
    items.forEach(function(li,i){ li.classList.toggle('on', i === k); });
    sideBig.textContent = sides[k][0];
    sideP.textContent = sides[k][1];
    var scale = 1 - Math.min(.42, p * .42);
    num.style.transform = 'scale(' + scale.toFixed(3) + ')';
    num.style.opacity = String(1 - Math.min(.5, p * .5));
  }
  if (reduce) { apply(.05); return; }
  apply(0);
  var raf = false;
  function upd() {
    raf = false;
    var r = pin.getBoundingClientRect();
    var span = r.height - innerHeight;
    var p = span > 0 ? Math.min(1, Math.max(0, -r.top / span)) : 1;
    apply(p);
  }
  addEventListener('scroll', function(){ if(!raf){raf=true;requestAnimationFrame(upd);} }, {passive:true});
  addEventListener('resize', upd);
  upd();
})();
</script>
</body>
</html>
