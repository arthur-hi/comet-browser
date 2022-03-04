var fs = require("fs");
var tabSystem=document.getElementById('tab-system')
var tabContainer=document.getElementById('tab-container')
var topBar=document.getElementById('top-bar')
var main = document.getElementById("main")
window.addEventListener('resize', widthTick)
tabs = document.getElementById("tabs").querySelectorAll("a")

var width = tabs.length*192

function widthTick() {
    tabSystem.style.position = "absolute"
    tabSystem.style.width = `${width}px`
    topBar.style.width = `${width}px`   //plus some more for buttons
    tabContainer.style.width = `${width}px`
    //carousel.style.width = `${carousel.clientWidth}px`
    tabSystem.style.left = `${(window.innerWidth/2)-(tabSystem.clientWidth/2).toString()}px`
}
widthTick()

var focusedTabs = 0
var large = 'col-5'
var normal = 'col-3'
var small = 'col-2'

tabs.forEach(thisTab => {
    thisTab.addEventListener("click", function() {
        focus(thisTab)
    })
    thisTab.querySelector("#input").style.display = "none"
    thisTab.querySelector("#title").style.display = null
    input = thisTab.querySelector("#input")
    
    /*
    input.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            if(input.value.substr(0,4)!="http"){
                webview = document.createElement("webview");
                webview.setAttribute("src", `https://${input.value}`)
                main.innerHTML = "<p>## Insert .25f transition between sites...</p>"
                main.appendChild(webview)
            }
            if(input.value.split('://')[0]=="comet"){
                var page = fs.readFileSync(`./comet/${input.value.split('://')[1]}.html`).toString('utf-8');
                main.innerHTML = page
            }
        }
        console.log(input.value)
    })
    */
})

function focus(thisTab) {
    tabs.forEach(tab => {
        if(tab==thisTab&&!thisTab.classList.contains('focused')) {
            tab.classList.toggle(normal)
            tab.classList.toggle(large)
            tab.classList.toggle('focused')
            if(tab.classList.contains('focused')){
                focusedTabs=2
                tab.querySelector("#input").style.display = null
                tab.querySelector("#input").select()
                tab.querySelector("#title").style.display = "none"
            }
        }
        else if (tab.classList.contains('focused')) {
            tab.className = "tab test"
            tab.classList.toggle(small)
            focusedTabs=0
            tab.querySelector("#input").style.display = "none"
            tab.querySelector("#title").style.display = null
        }
        if(tab.classList.contains('focused-small')) {
            focusedTabs=1
        }
    })
    //on second thought atleast one should be col-3 with only 3 tabs
    tabs.forEach(tab => {
        if (!tab.classList.contains('focused')&&focusedTabs==2) {
            tab.className = "tab";
            tab.classList.toggle(small)
        }
        if (!tab.classList.contains('focused')&&focusedTabs==1) {
            tab.className = "tab";
            tab.classList.toggle(normal)
        }
    })
}
focus(tabs[0])