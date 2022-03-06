var fs = require("fs");
var tabSystem=document.getElementById('tab-system')
var tabContainer=document.getElementById('tab-container')
var topBar=document.getElementById('top-bar')
var view = document.getElementById("main")
window.addEventListener('resize', widthTick)
document.getElementById("plus").addEventListener('click', newTab)

const tabTemplate = `
  <form onsubmit="lookup(this);return false">
    <input id="input" value=""></input>
  </form>
  <span id="title">New Tab</span>
`
tabid=0
function newTab() {
    tabBar = document.getElementById("tabs")
    newtab = document.createElement("a")
    newtab.setAttribute("class", `tab`)
    newtab.setAttribute("id", tabid)
    newtab.setAttribute("href", `#`)
    newtab.innerHTML=tabTemplate

    var webview = document.createElement("webview")
    webview.setAttribute("src", 'file://' + __dirname + '/comet/newtab.html')
    webview.setAttribute("style", `width: 100%; height: 100%`)
    webview.setAttribute("id", tabid)
    
    webview.addEventListener('did-finish-load', () => {
        tabs.forEach(tab => {
            if(tab.classList.contains('focused')||tab.classList.contains('focused-small')){
                title = webview.getTitle()
                if(title!="undefined.html"){
                    tab.querySelector("#title").innerText=title.substr(0,17)
                    tab.querySelector("#input").value=webview.getURL()
                }
                else button(`comet://newtab`)
            }
        })
    })
    webview.addEventListener('click', () => {
        tabs.forEach(tab => {
            if(tab.classList.contains('focused')||tab.classList.contains('focused-small')){
                title = webview.getTitle()
                if(title!="undefined.html"){
                    tab.querySelector("#title").innerText=title.substr(0,17)
                    tab.querySelector("#input").value=webview.getURL()
                }
            }
        })
    })

    tabBar.insertBefore(newtab, document.getElementById("plus"))
    view.appendChild(webview)
    
    tabs = document.getElementById("tabs").querySelectorAll("a")
    tabs.forEach(thisTab => {
        thisTab.addEventListener("click", () => {
            focus(thisTab)
        })
        thisTab.querySelector("#input").style.display = "none"
        thisTab.querySelector("#title").style.display = null
        
        form = thisTab.querySelector("form")
        form.addEventListener('submit', function() {
            input=false
            thisTab.className = "tab focused";
            thisTab.style.width = `${width/tabs.length-1}px`
            tabs.forEach(tab => {
                if(tab!=thisTab) {
                    if(input) {
                        tab.className = "tab";
                        tab.style.width = `${(width/2)/tabs.length-1}px`
                        tab.querySelector("#input").style.display = null
                        tab.querySelector("#title").style.display = "none"
                    }
                    else {
                        tab.className = "tab";
                        tab.style.width = `${(width - width/tabs.length-1)/tabs.length-1}px`
                        tab.querySelector("#input").style.display = "none"
                        tab.querySelector("#title").style.display = null

                        title = tab.querySelector("#title").innerText
                        tab.querySelector("#title").innerText = title.substr(0,8)
                    }
                }
            })
        })
    })
    focus(tabs[tabs.length-1])
    tabid++
}
newTab()
newTab()
newTab()
newTab()

buttons = document.getElementById("home").clientWidth + document.getElementById("plus").clientWidth + 10
tabs = document.getElementById("tabs").querySelectorAll("a")

var width = tabs.length*160

/*
tabs.forEach(thisTab => {
    thisTab.addEventListener("click", function() {
        focus(thisTab)
    })
    thisTab.querySelector("#input").style.display = "none"
    thisTab.querySelector("#title").style.display = null
    
    form = thisTab.querySelector("form")
    form.addEventListener('submit', function() {
        input=false
        thisTab.className = "tab focused";
        thisTab.style.width = `${width/tabs.length-1}px`
        tabs.forEach(tab => {
            if(tab!=thisTab) {
                if(input) {
                    tab.className = "tab";
                    tab.style.width = `${(width/2)/tabs.length-1}px`
                }
                else {
                    tab.className = "tab";
                    tab.style.width = `${(width - width/tabs.length-1)/tabs.length-1}px`
                    tab.querySelector("#input").style.display = "none"
                    tab.querySelector("#title").style.display = null
                }
            }
        })
    })
})
*/

var input;
function focus(thisTab) {

    views = document.getElementById("main").querySelectorAll("webview")

    tabs.forEach(tab => {
        if(tab==thisTab) {
            if(tab.classList.contains('focused')&&!tab.classList.contains('input')) {
                tab.className = "tab focused input";
                if(tabs.length==1) {}
                else tab.style.width = `${(width/2)-buttons}px`
                input=true

                tab.querySelector("#input").style.display = null
                tab.querySelector("#input").select()
                tab.querySelector("#title").style.display = "none"
            }
            else {
                input=false
                tab.className = "tab focused";
                tab.style.width = `${width/tabs.length-1}px`
                
                tab.querySelector("#input").style.display = "none"
                tab.querySelector("#title").style.display = null
            }
        }
    })
    tabs.forEach(tab => {
        if(tab!=thisTab) {
            if(input) {
                tab.className = "tab";
                tab.style.width = `${(width/2)/tabs.length-1}px`
            }
            else {
                tab.className = "tab";
                tab.style.width = `${(width - width/tabs.length-1)/tabs.length-1}px`
                tab.querySelector("#input").style.display = "none"
                tab.querySelector("#title").style.display = null
                
                title = tab.querySelector("#title").innerText
                tab.querySelector("#title").innerText = title.substr(0,8)
            }
        }
    })

    views.forEach(webview => {
        if(webview.id==thisTab.id)
        {
            webview.style.display=null
        }
        else {
            webview.style.display = "none"
        }
    })
}
focus(tabs[0])

function widthTick() {

    tabSystem.style.position = "absolute"
    tabSystem.style.width = `${width}px`
    topBar.style.width = `${width}px`
    tabContainer.style.width = `${width}px`
    tabSystem.style.left = `${(window.innerWidth/2)-(tabSystem.clientWidth/2)-(buttons/2).toString()}px`

}
widthTick()

/*

## No focus

width = amount of tabs * 160
4 tabs = 640
focused tab = width/length-1    == 213
unfocused tabs = (width - width/length-1    == 512)/length-1     == 142


## With focus

width = amount of tabs * 160
4 tabs = 640
focused tab = width/2    == 320
unfocused tabs = (width/2    == 320)/length-1     == 106

*/