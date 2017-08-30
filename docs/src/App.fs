module App.View

open App.State
open Elmish
open Elmish.Browser.Navigation
open Elmish.Browser.UrlParser
open Elmish.Debug
open Elmish.Bulma
open Elmish.Bulma.Components
open Fable.Core
open Fable.Core.JsInterop
open Fable.Import
open Fable.Import.Browser
open Global
open Types

// Bulma + Docs site css
importSideEffects "../sass/main.sass"
// Prism css
importSideEffects "../css/prism.min.css"

[<Emit("Prism.languages.fsharp")>]
let prismFSharp = ""

// Configure markdown parser
let options =
    createObj [ "highlight" ==> fun code -> PrismJS.Globals.Prism.highlight (code, unbox prismFSharp)
                "langPrefix" ==> "language-" ]

Marked.Globals.marked.setOptions (unbox options) |> ignore

open Fable.Helpers.React
open Fable.Helpers.React.Props

let menuItem label page currentPage =
    li []
       [ a [ classList [ "is-active", page = currentPage ]
             Href(toHash page) ]
           [ str label ] ]

let menu currentPage =
    Menu.menu [ ]
        [ Menu.list [ ]
            [ menuItem "Home" Home currentPage ]
          Menu.label [ ] [ str "Elements" ]
          Menu.list [ ]
            [ //menuItem "Home" Home currentPage
              menuItem "Checkradio" (Element Checkradio) currentPage
            ]
        ]
          
let header =
    div [ ClassName "hero is-primary" ]
        [ div [ ClassName "hero-body" ]
              [ div [ ClassName "column has-text-centered" ]
                    [ h2 [ ClassName "subtitle cookieregular" ]
                         [ str "Binding for Elmish using Bulma CSS framework" ] ] ] ]

let root model dispatch =
    let pageHtml =
        function
        | Home -> Home.View.root model.Home
        | Element element ->
            match element with
            | Elements.Checkradio -> Elements.Checkradio.View.root model.Elements.Checkradio (CheckradioMsg >> dispatch)
            

    div []
        [ div [ ClassName "navbar-bg" ]
              [ div [ ClassName "container" ] [ Navbar.View.root ] ]
          header
          div [ ClassName "section" ]
              [ div [ ClassName "container" ]
                    [ div [ ClassName "columns" ]
                          [ div [ ClassName "column is-2" ]
                                [ menu model.CurrentPage ]
                            div [ ClassName "column" ] [ pageHtml model.CurrentPage ] ] ] ] ]

open Elmish.React

// App
Program.mkProgram init update root
|> Program.withDebugger // connect to a devtools monitor via Chrome/Firefox extension if available
|> Program.toNavigable (parseHash pageParser) urlUpdate
|> Program.withReact "elmish-app"
|> Program.run
