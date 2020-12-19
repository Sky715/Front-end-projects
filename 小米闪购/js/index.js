var tabs = document.querySelectorAll('#tabs li');
/* console.log(tabs); */

var lists = document.querySelectorAll('#lists ul');
/* console.log(lists); */

for(var i = 0; i < tabs.length; i++) {
    tabs[i].onclick = showList;
}



function showList() {
    for(var i = 0; i < tabs.length; i++) {
        if(tabs[i] === this) {
            tabs[i].className = "active";
            lists[i].className = "clearfix active";
        } else {
            tabs[i].className = "";
            lists[i].className = "clearfix";
        }
    }
}

var seckillNav = document.querySelector('#seckillNav');

window.onscroll = function() {
    var scrollTop = document.documentElement.scrollTop;
    if(scrollTop >= 260) {
        seckillNav.className = "seckill-nav seckill-navfixed";
    } else {
        seckillNav.className = "seckill-nav";
    }
}


console.log("time:" + Date.parse(2019-11-11));