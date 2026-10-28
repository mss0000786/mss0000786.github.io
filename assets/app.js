
(function(){
  function read(){try{return JSON.parse(localStorage.getItem('orbita_cart')||'[]')}catch(e){return []}}
  function write(c){localStorage.setItem('orbita_cart',JSON.stringify(c));paint()}
  function paint(){var c=read(),n=c.reduce(function(s,i){return s+i.q},0);
    document.querySelectorAll('#cartCount').forEach(function(e){e.textContent=n});
    var t=document.getElementById('cartBody'); if(!t)return;
    if(!c.length){t.innerHTML='<tr><td colspan="4">Корзина пуста. <a href="catalog.html">Перейти в каталог</a></td></tr>';document.getElementById('sum').textContent='0 ₽';return}
    var sum=0;t.innerHTML=c.map(function(i,ix){sum+=i.p*i.q;return '<tr><td>'+i.n+'</td><td>'+i.p.toLocaleString('ru-RU')+' ₽</td>'+
      '<td><button data-ix="'+ix+'" data-d="-1">−</button> '+i.q+' <button data-ix="'+ix+'" data-d="1">+</button></td>'+
      '<td>'+(i.p*i.q).toLocaleString('ru-RU')+' ₽</td></tr>'}).join('');
    document.getElementById('sum').textContent=sum.toLocaleString('ru-RU')+' ₽';
    t.querySelectorAll('button[data-ix]').forEach(function(b){b.onclick=function(){
      var cs=read(),i=+b.dataset.ix;cs[i].q+=+b.dataset.d;if(cs[i].q<1)cs.splice(i,1);write(cs)}})
  }
  window.addToCart=function(slug,name,price){var c=read(),f=c.filter(function(i){return i.s===slug})[0];
    if(f)f.q++;else c.push({s:slug,n:name,p:price,q:1});write(c);
    var m=document.getElementById('msg'); if(m){m.textContent='Товар добавлен в корзину';setTimeout(function(){m.textContent=''},2500)}}
  window.clearCart=function(){write([])}
  document.addEventListener('DOMContentLoaded',function(){
    paint();
    var f=document.getElementById('orderForm');
    if(f)f.onsubmit=function(e){e.preventDefault();
      var c=read(); if(!c.length){alert('Корзина пуста');return}
      f.style.display='none'; document.getElementById('done').style.display='block'; write([])};
  });
})();
