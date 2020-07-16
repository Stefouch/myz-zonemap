(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0c70a7ff"],{"093e":function(t,e,a){"use strict";var i=a("bf4f"),o=a.n(i);o.a},bf4f:function(t,e,a){},c3ef:function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-app",{attrs:{dark:t.nightMode}},[a("v-toolbar",{staticClass:"help-dialog-toolbar",attrs:{fixed:"",dense:"",dark:""}},[a("v-btn",{attrs:{icon:"",dark:""},on:{click:function(e){t.drawer=!t.drawer}}},[a("v-icon",[t._v("mdi-menu")])],1),a("v-toolbar-title",[t._v("HELP: "),a("b",[t._v(t._s(t.$root.name.toUpperCase()))]),t._v(" v"+t._s(t.$root.version))]),a("v-spacer"),a("v-toolbar-items",[a("v-btn",{attrs:{icon:"",dark:"",title:"Toggle night mode"},on:{click:function(e){t.nightMode=!t.nightMode}}},[a("v-icon",[t._v(t._s(t.nightMode?"mdi-lightbulb-outline":"mdi-lightbulb"))])],1),a("v-btn",{attrs:{icon:"",dark:"",title:"Close this tab"},on:{click:function(e){return t.closeHelp()}}},[a("v-icon",[t._v("mdi-close")])],1)],1)],1),a("v-navigation-drawer",{attrs:{fixed:"",temporary:""},model:{value:t.drawer,callback:function(e){t.drawer=e},expression:"drawer"}},[a("v-list",t._l(t.drawerEntries,(function(e,i){return a("v-list-tile",{key:i},[a("v-list-tile-content",[a("v-list-tile-title",{staticClass:"navigation-menu-entry"},[a("a",{on:{click:function(a){return t.goto(e)}}},[t._v(t._s(t.formatTitle(e)))])])],1)],1)})),1)],1),a("v-container",{staticStyle:{"max-width":"800px",margin:"0 auto"},attrs:{"py-5":""}},[a("v-layout",{ref:"helptext",attrs:{id:"helptext",column:""}},[a("h1",[t._v("Mutant Year Zero:"),a("br"),t._v(t._s(t.$root.name))]),a("div",[a("h2",{ref:"About",attrs:{id:"About"}},[t._v("About")]),a("p",[a("b",[t._v(t._s(t.$root.name))]),t._v(" is a web application for managing the Map of the Zone in the "),a("b",[t._v("Mutant: Year Zero")]),t._v(" tabletop roleplaying game. It's a useful companion for generating random Zone sectors on the fly, rolling threats, keeping notes, tracking the resources to find, and many more.")]),a("p",[t._v("It's mainly designed for Game Master's Eyes, although the application provides a special mode to showcase explored-only sectors to the Player Characters, hiding from them the location of EDEN.")]),a("div",{staticClass:"alert alert-success"},[a("h4",[a("i",{staticClass:"mdi mdi-book-open-page-variant"}),t._v(" ReadMe!")]),a("p",{staticClass:"text-info"},[t._v("This document contains many useful information about "),a("b",[t._v(t._s(t.$root.name))]),t._v(" and how to pilot the web app.\r\n\t\t\t\t\t"),a("br"),t._v("It worth the read!")])]),a("h3",[t._v("Saving Your Work")]),a("p",[t._v("The "),a("b",[t._v("Zonemap")]),t._v(" can be saved in JSON format, and loaded again for later uses. Because it's JSON, it's easy to edit with a text editor. "),a("small",[a("i",[t._v("(But beware of what you do here, as this could lead to file corruption.)")])])]),a("div",{staticClass:"alert alert-warning"},[a("h4",[a("i",{staticClass:"mdi mdi-content-save"}),t._v(" Back-It Up!")]),a("p",{staticClass:"text-info"},[t._v("Don't hesitate to back up your zonemap JSON file. Don't always overwrite it when saving.")])])]),a("v-divider"),a("h2",{ref:"First_Steps",attrs:{id:"First_Steps"}},[t._v("First Steps")]),a("div",[a("p",[a("b",[t._v(t._s(t.$root.name))]),t._v(" is compatible with modern web browsers, although it doesn't work with Internet Explorer, and never will.")]),a("p",[t._v("The development is still in progress and fonctionalities are subject to evolve. Unfortunately, bugs are not impossible. If you encounter some of them, please read "),a("a",{on:{click:function(e){return t.goto("Troubleshooting")}}},[t._v("Troubleshooting")]),t._v(" below.")]),a("p",[t._v("When starting the app, you have three available choices:")]),a("h3",[t._v("Create a New Map")]),a("p",[t._v("Choose this option if you want to create a new map from scratch. You have to define a name and its dimensions. Common map of the Zone are 30 sectors wide and 18 sectors high. You may also choose a language among available translations, although this option only change the language used for the infos generated for a sector. It doens't change the user interface's language.")]),a("h3",[t._v("Open an Existing Map")]),a("p",[t._v("Choose this option to load a zonemap JSON file hosted on your computer/device.")]),a("h3",[t._v("Load Last Map")]),a("p",[t._v("Choose this option to quickly load the last saved map.")])]),a("v-divider"),a("h2",{ref:"The_Sectors_Grid",attrs:{id:"The_Sectors_Grid"}},[t._v("The Sectors Grid")]),a("div",[a("p",[t._v("The map of the Zone is a grid divided in several squares. Each square is a "),a("b",[t._v("sector")]),t._v(", "+t._s(t.$root.sectorDim)+" pixels tall. The map can't be wider than 30 sectors and higher than 26 sectors.")]),a("p",[t._v('The map is "draggable" like any other Google Map. No zoom function yet.')]),a("h3",[t._v("Toolbar")]),a("p",[t._v("At the top, a toolbar offers many functions:")]),a("ul",{staticClass:"text-info",staticStyle:{"list-style-type":"none"}},[a("li",[a("i",{staticClass:"mdi mdi-content-save"}),t._v(" — Saves all the changes of the current zonemap to the web browser memory (local storage). Data is saved as long as the browser stays open.")]),a("li",[a("i",{staticClass:"mdi mdi-download"}),t._v(" — Downloads the zonemap JSON file, including the unsaved changes.")]),a("li",[a("i",{staticClass:"mdi mdi-settings"}),t._v(" — Opens the options menu.")]),a("li",[a("i",{staticClass:"mdi mdi-eye"}),t._v(" — Toggles the GM view. Usefull if you want to show the map to the PCs. When toggled off, only explored sectors and basic information are displayed.")]),a("li",[a("i",{staticClass:"mdi mdi-help-circle-outline"}),t._v(" — Shows this help.")]),a("li",[a("i",{staticClass:"mdi mdi-bug-outline"}),t._v(" — Reports an issue.")]),a("li",[a("i",{staticClass:"mdi mdi-close"}),t._v(" — Closes the current map of the Zone and returns back to home.")])]),a("h3",[t._v("Sector")]),a("p",[t._v("Each "),a("b",[t._v("sector")]),t._v(" displays several information: a set of icons, a name, and a marker. Each sector can also have different background & border colors, according to the sector's type, rot level, and exploration status.")]),a("p",[t._v("To edit a sector, "),a("code",[t._v("double-click")]),t._v(" or "),a("code",[t._v("right-click")]),t._v(" the desired square on the grid.")]),a("v-container",{attrs:{fluid:"","grid-list-xl":"","py-0":""}},[a("v-layout",{attrs:{row:"",wrap:""}},[a("v-flex",{attrs:{xs12:"",sm6:""}},[a("h4",[t._v("Icons")]),a("ul",{staticClass:"text-info",staticStyle:{"list-style-type":"none"}},[a("li",[a("i",{staticClass:"mdi mdi-skull"}),t._v(" — Indicates the presence of a "),a("b",[t._v("threat")]),t._v(" in the sector.")]),a("li",[a("i",{staticClass:"mdi mdi-star"}),t._v(" — Indicates the presence of an "),a("b",[t._v("artifact")]),t._v(" in the sector.")]),a("li",[a("i",{staticClass:"mdi mdi-radioactive"}),t._v(" — Indicates a "),a("b",[t._v("Rot level")]),t._v(" equal to 2 or higher.")]),a("li",[a("i",{staticClass:"mdi mdi-notebook"}),t._v(" — Indicates some "),a("b",[t._v("extra notes")]),t._v(" added by the GM for the sector.")])])]),a("v-flex",{attrs:{xs12:"",sm6:""}},[a("h4",[t._v("Colors")]),a("ul",{staticClass:"text-info",staticStyle:{"list-style-type":"none"}},[a("li",[a("b",[t._v("Gray:")]),t._v(" unexplored")]),a("li",[a("b",[t._v("Blue:")]),t._v(" special Zone sector")]),a("li",[a("b",[t._v("Yellow:")]),t._v(" Ark sector")]),a("li",[a("b",[t._v("Green border:")]),t._v(" Rot Oasis sector (Rot level 0)")]),a("li",[a("b",[t._v("Orange/red border:")]),t._v(" Rot level 2+")])])])],1)],1),a("p",[t._v("Changes you make to your sector in the editing dialog aren't saved until you hit the "),a("i",{staticClass:"mdi mdi-content-save"}),t._v(" (Save) button.")])],1),a("v-divider"),a("h2",{ref:"Custom_Map_Background",attrs:{id:"Custom_Map_Background"}},[t._v("Custom Map Background")]),a("div",[a("p",[t._v("Find My Path allows its user to set a custom image for the background behind the grid of sectors.")]),a("p",[t._v("Click the "),a("i",{staticClass:"mdi mdi-settings"}),t._v(" icon to display the options menu and then head to the "),a("code",[t._v("Background")]),t._v(" tab.")]),a("p",[t._v("Select your image using the file input and wait until it's loaded. Hit the "),a("i",{staticClass:"mdi mdi-content-paste"}),t._v(" (Use) button to apply the image to the background. Hit the "),a("i",{staticClass:"mdi mdi-trash-can-outline"}),t._v(" (Remove) button to reset the background.")]),a("h3",[t._v("Placement")]),a("p",[t._v("You may then adjust correctly the placement of the background image behing the sectors grid.")]),a("ul",[a("li",[t._v("Use the "),a("i",{staticClass:"mdi mdi-format-horizontal-align-left"}),t._v(" & "),a("i",{staticClass:"mdi mdi-format-vertical-align-top"}),t._v(" fields to respectively move the image left/right (X axis) and up/down (Y axis). Use negative values to offset the image.")]),a("li",[t._v("Use the "),a("i",{staticClass:"mdi mdi-border-horizontal"}),t._v(" & "),a("i",{staticClass:"mdi mdi-border-vertical"}),t._v(" fields to respectively adjust the width and the height of the background image. "),a("i",[t._v("(A sector is "+t._s(t.$root.sectorDim)+" pixels tall.)")])])]),a("div",{staticClass:"alert alert-info"},[a("h4",[a("i",{staticClass:"mdi mdi-image-size-select-actual"}),t._v(" Default Placement")]),a("p",{staticClass:"text-info"},[t._v("Zonemap background images made with the "),a("a",{attrs:{href:"https://www.youtube.com/watch?v=Re1O43K1K0c",target:"_blank"}},[t._v("Shane McLean tutorial")]),t._v(" should fit with values "),a("code",[t._v("Left: -7, Top: -9, Width: 1944, Height: 1167")]),t._v(" (not verified).")])]),a("div",{staticClass:"alert alert-info"},[a("h4",[a("i",{staticClass:"mdi mdi-information-outline"}),t._v(" Background Saving")]),a("p",{staticClass:"text-info"},[t._v("The background image is not saved in the zonemap JSON file and will then reset each time you close the internet browser. This is a development choice made to reduce the size of the zonemap file. However, all placement data (top, left, width & height values) are saved, which means you only need to reload the image when you re-open your zonemap.")])])]),a("v-divider"),a("h2",{ref:"Sector_Data",attrs:{id:"Sector_Data"}},[t._v("Sector's Data")]),a("div",[a("p",[t._v("This section describes all customizable data for a sector.")]),a("h3",[a("i",{staticClass:"mdi mdi-flag"}),t._v(" Sector's name")]),a("p",[t._v("Custom name of the sector. By default, it's the sector's coordinates in the zonemap.")]),a("v-container",{attrs:{fluid:"","py-0":""}},[a("h4",[t._v("Custom Icon / Map Marker")]),a("p",{staticClass:"text-info"},[t._v("An icon can also be added to the sector. Click to circle on the left to display the icon picker, then choose an icon from the list or directly input an icon name (see Material Design Icons website for a complete list of available icons). Click the icon again to confirm your choice.")])]),a("h3",[a("i",{staticClass:"mdi mdi-compass"}),t._v(" Exploration status")]),a("p",[t._v("Either if this sector is explored or not. Checking this checkbox will remove the gray background from the map's square.")]),a("h3",[a("i",{staticClass:"mdi mdi-radioactive"}),t._v(" Rot level")]),a("ol",{attrs:{start:"0"}},[a("li",[a("b",[t._v("Rot oasis:")]),t._v(" Rot-free area. "),a("small",[a("i",[t._v("(No radiation icon & green border on the square.)")])])]),a("li",[a("b",[t._v("Weak rot area:")]),t._v(" In these sectors PCs get one Rot point every day. "),a("small",[a("i",[t._v("(No radiation icon.)")])])]),a("li",[a("b",[t._v("Strong rot area:")]),t._v(" In such a sector PCs suffer one Rot Point every hour. "),a("small",[a("i",[t._v("(Radiation icon & orange border.)")])])]),a("li",[a("b",[t._v("Rot hotspot:")]),t._v(" Here, you will die quickly. You get one Rot Point every minute. "),a("small",[a("i",[t._v("(Radiation icon & red border.)")])])])]),a("h3",[a("i",{staticClass:"mdi mdi-space-invaders"}),t._v(" Threat level & Threats list")]),a("p",[t._v("A high Threat Level means a more dangerous sector, but with greater chance of finding untouched artifacts (see page 158).")]),a("p",[t._v("At generation, a Threat roll is processed. For each "),a("b",[t._v("six")]),t._v(", the artifact count is increased by one if there are some ruins in that sector. If at least a "),a("b",[t._v("one")]),t._v(" is rolled, an Zone threat is added to the Threat list.")]),a("p",[t._v("The "),a("i",{staticClass:"mdi mdi-dice-6"}),t._v(" button performs a new Threat Roll.")]),a("h3",[a("i",{staticClass:"mdi mdi-terrain"}),t._v(" Type")]),a("p",[t._v("A sector can have a type. Setting the type will just have a cosmetic effect by changing the color of that sector on the Zone map.")]),a("h3",[a("i",{staticClass:"mdi mdi-image"}),t._v(" Environment")]),a("p",[t._v("Determines the general terrain of the sector.")]),a("h3",[a("i",{staticClass:"mdi mdi-map-marker"}),t._v(" Ruins")]),a("p",[t._v("Decides the dominant ruin in the sector.")]),a("h3",[a("i",{staticClass:"mdi mdi-file-document"}),t._v(" Description")]),a("p",[t._v("Text describing the sector and its dominant ruin. You may also use this field to add your own notes.")]),a("p",[t._v("The "),a("i",{staticClass:"mdi mdi-download"}),t._v(" button appears if a dominant ruin has been selected and if the textfield is empty. Clicking it will generate a description for the chosen ruin.")]),a("h3",[a("i",{staticClass:"mdi mdi-alert-circle"}),t._v(" Mood")]),a("p",[t._v("Some sectors in the Zone contain neither threats nor artifacts. Some sectors are just empty wasteland, and can be passed quickly by the PCs. To give even sectors like these some life and character, you can choose a mood element, something that catches the PCs’ attention, but is not an immediate threat.")]),a("p",[t._v("Mood types are: People, Nature, Weather, Remains, Events, and Terrain.")]),a("h3",[a("i",{staticClass:"mdi mdi-notebook"}),t._v(" Notes")]),a("p",[t._v("Use this field to add extra notes for the sector.")]),a("h3",[a("i",{staticClass:"mdi mdi-package-variant-closed"}),t._v(" Finds")]),a("p",[t._v("Inventories the resources left to discover:")]),a("ul",{staticClass:"text-info",staticStyle:{"list-style-type":"none"}},t._l(t.$root.findIcons,(function(e,i){return a("li",{key:i},[a("v-icon",{attrs:{small:""}},[t._v(t._s(e))]),t._v(" "+t._s(i)+"\r\n\t\t\t\t\t")],1)})),0),a("p",[t._v("The "),a("i",{staticClass:"mdi mdi-cart-arrow-down"}),t._v(" button sets the item's quantity to 0.")]),a("p",[t._v("The "),a("i",{staticClass:"mdi mdi-dice-6"}),t._v(" button rolls a new random quantity for the item.")])],1),a("v-divider"),a("h2",{ref:"Contributing",attrs:{id:"Contributing"}},[t._v("Contributing")]),a("div",[a("p",[t._v("You may help the development of Find the Path.")]),a("p",[t._v("For example, translations could easily be added with your languages skills or if you've access to the corebook in another language.")])]),a("v-divider"),a("h2",{ref:"Troubleshooting",attrs:{id:"Troubleshooting"}},[t._v("Troubleshooting")]),a("div",[a("div",{staticClass:"alert alert-info"},[a("h4",[a("i",{staticClass:"mdi mdi-bug"}),t._v(" Bug Report")]),a("p",{staticClass:"text-info"},[t._v("If you encounter any bug or weird behavior, please report it there: "),a("a",{attrs:{href:t.$root.github+"/issues",target:"_blank"}},[t._v("report an issue")]),t._v(".")])]),a("ul",[a("li",[t._v("While opening an existing zonemap JSON file, if you're experiencing an endless loading dialog, it could mean that your file is corrupted. Don't worry, it should be fixable. Contacts the app manager for help.")]),a("li",[t._v("If the application becomes very slow and laggy after having set a custom background image, the image file is probably too heavy. Try first to compress the image in JPEG format.")])])])],1)],1)],1)},o=[];a("ac6a"),a("ac4d"),a("8a81"),a("5df3"),a("1c4c"),a("7f7f"),a("6b54"),a("a481");function s(t){if("undefined"===typeof Symbol||null==t[Symbol.iterator]){if(Array.isArray(t)||(t=n(t))){var e=0,a=function(){};return{s:a,n:function(){return e>=t.length?{done:!0}:{done:!1,value:t[e++]}},e:function(t){throw t},f:a}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var i,o,s=!0,r=!1;return{s:function(){i=t[Symbol.iterator]()},n:function(){var t=i.next();return s=t.done,t},e:function(t){r=!0,o=t},f:function(){try{s||null==i.return||i.return()}finally{if(r)throw o}}}}function n(t,e){if(t){if("string"===typeof t)return r(t,e);var a=Object.prototype.toString.call(t).slice(8,-1);return"Object"===a&&t.constructor&&(a=t.constructor.name),"Map"===a||"Set"===a?Array.from(t):"Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a)?r(t,e):void 0}}function r(t,e){(null==e||e>t.length)&&(e=t.length);for(var a=0,i=new Array(e);a<e;a++)i[a]=t[a];return i}var l={name:"help",data:function(){return{drawer:!1,drawerEntries:[],nightMode:!1}},mounted:function(){var t,e=this.$refs.helptext.childNodes,a=s(e);try{for(a.s();!(t=a.n()).done;){var i=t.value;i.id&&this.drawerEntries.push(i.id)}}catch(o){a.e(o)}finally{a.f()}},methods:{formatTitle:function(t){return t.replace(/_/g," ")},closeHelp:function(){window.close()},goto:function(t){this.drawer=!1;var e=this.$refs[t],a=e.offsetTop-50;window.scrollTo(0,a)}}},c=l,d=(a("093e"),a("2877")),h=a("6544"),v=a.n(h),m=a("7496"),u=a("8336"),p=a("a523"),f=a("ce7e"),_=a("0e8f"),g=a("132d"),b=a("a722"),y=a("8860"),w=a("ba95"),C=a("5d23"),k=a("f774"),T=a("9910"),x=a("71d9"),S=a("2a7f"),M=Object(d["a"])(c,i,o,!1,null,"0f7b02ef",null);e["default"]=M.exports;v()(M,{VApp:m["a"],VBtn:u["a"],VContainer:p["a"],VDivider:f["a"],VFlex:_["a"],VIcon:g["a"],VLayout:b["a"],VList:y["a"],VListTile:w["a"],VListTileContent:C["a"],VListTileTitle:C["b"],VNavigationDrawer:k["a"],VSpacer:T["a"],VToolbar:x["a"],VToolbarItems:S["a"],VToolbarTitle:S["b"]})}}]);
//# sourceMappingURL=chunk-0c70a7ff.b8a593f4.js.map