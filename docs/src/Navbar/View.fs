module Navbar.View

open Fable.Helpers.React
open Fable.Helpers.React.Props
open Elmish.Bulma.Components

let navButton classy href faClass txt =
    div [ ClassName "control" ]
        [ a [ ClassName ("button " + classy)
              Href href ]
            [ span [ ClassName "icon" ]
                   [ i [ ClassName ("fa " + faClass) ] [] ]
              span [] [ str txt ] ] ]

let navButtons =
    span
        [ ClassName "nav-item block" ]
        [ navButton "github" "https://github.com/evilz/Fable.Elmish.Bulma-checkradio/" "fa-github" "Github" ]

let root =
    div [ ClassName "nav" ]
        [ div [ ClassName "nav-left" ]
              [ h1 [ ClassName "nav-item is-brand title is-4" ]
                   [ img  [ Src "logo.png"
                            Alt "logo"
                            Style [ MarginRight "10px" ] ]
                     str "Fable.Elmish.Bulma-checkradio" ] ]
          navButtons ]
