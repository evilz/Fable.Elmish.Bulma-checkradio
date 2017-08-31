module Elements.Divider.View

open Fable.Core
open Fable.Core.JsInterop
open Fable.Helpers.React
open Fable.Helpers.React.Props
open Types
open Elmish.Bulma.Elements
open Elmish.Bulma.Grids
open Elmish.Bulma.Extensions
open Elmish.Bulma.Extra.FontAwesome


let basicInteractive =
    div [] 
        [
            div [ ClassName "has-text-centered"] [ Heading.h1 [] [str "Top"] ]
            Divider.divider [] []
            div [ ClassName "has-text-centered"] [ Heading.h1 [] [str "Middle"] ]
            Divider.divider [Divider.label "OR"] []
            div [ ClassName "has-text-centered"] [ Heading.h1 [] [str "Bottom"] ]
        ]

let verticalInteractive =
     Columns.columns [ ]
        [ 
            Column.column [ Column.customClass "has-text-centered" ] [ Heading.h1 [] [str "Left"] ]
            Column.column [ ] [Divider.divider [Divider.label "OR"; Divider.IsVertical] []]
            Column.column [ Column.customClass "has-text-centered" ] [ Heading.h1 [] [str "Right"] ]
        ]

let root model dispatch =
    Render.docPage [    Render.contentFromMarkdown model.Intro
                        Render.docSection
                            "### Default divider"
                            (Viewer.View.root basicInteractive model.NormalViewer (NormalViewerMsg >> dispatch))
                        Render.docSection
                            "### Vertical divider"
                            (Viewer.View.root verticalInteractive model.VerticalViewer (VerticalViewerMsg >> dispatch))
                       
                    ]