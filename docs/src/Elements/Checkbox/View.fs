module Elements.Checkbox.View

open Fable.Core
open Fable.Core.JsInterop
open Fable.Helpers.React
open Fable.Helpers.React.Props
open Types
open Elmish.Bulma.Elements
open Elmish.Bulma.Grids
open Elmish.Bulma.Extensions

let colorInteractive =
    Columns.columns [ ]
        [ Column.column [ ]
            [ div [ ClassName "block" ]
                  [ Checkbox.checkbox [ ] [ str "Checkbox" ]
                    Checkbox.checkbox [ Checkbox.isWhite ] [ str "White" ]
                    Checkbox.checkbox [ Checkbox.isLight ] [ str "Light" ]
                    Checkbox.checkbox [ Checkbox.isDark ] [ str "Dark" ]
                    Checkbox.checkbox [ Checkbox.isBlack ] [ str "Black" ] ] ]
          Column.column [ ]
            [ div [ ClassName "block" ]
                  [ Checkbox.checkbox [ Checkbox.isPrimary ] [ str "Primary" ]
                    Checkbox.checkbox [ Checkbox.isInfo ] [ str "Info" ]
                    Checkbox.checkbox [ Checkbox.isSuccess ] [ str "Success" ]
                    Checkbox.checkbox [ Checkbox.isWarning ] [ str "Warning" ]
                    Checkbox.checkbox [ Checkbox.isDanger ] [ str "Danger" ] ] ] ]

let sizeInteractive =
    div [ ClassName "block" ]
        [ Checkbox.checkbox [ Checkbox.isSmall ] [ str "Small" ]
          Checkbox.checkbox [ ] [ str "Normal" ]
          Checkbox.checkbox [ Checkbox.isMedium ] [ str "Medium" ]
          Checkbox.checkbox [ Checkbox.isLarge ] [ str "Large" ] ]

let stylesInteractive =
    div [ ClassName "block" ]
        [ Checkbox.checkbox [ Checkbox.isChecked; Checkbox.isCircle; Checkbox.isDisabled ] [ str "Checkbox" ]
          Checkbox.checkbox [ Checkbox.isChecked; Checkbox.isCircle; Checkbox.isPrimary ] [ str "Checkbox" ]
          Checkbox.checkbox [ Checkbox.isChecked; Checkbox.isCircle; Checkbox.isSuccess ] [ str "Checkbox - success" ]
          Checkbox.checkbox [ Checkbox.isChecked; Checkbox.isCircle; Checkbox.isWarning ] [ str "Checkbox - warning" ]
          Checkbox.checkbox [ Checkbox.isChecked; Checkbox.isCircle; Checkbox.isDanger ] [ str "Checkbox - danger" ]
          Checkbox.checkbox [ Checkbox.isChecked; Checkbox.isCircle; Checkbox.isInfo ] [ str "Checkbox - info" ]
        ]
          


let extraInteractive model dispatch =
    let state = not model.IsChecked
    
    div [ ClassName "block" ]
        [ Checkbox.checkbox [ Checkbox.props [  OnChange (fun x -> dispatch (Change state))] ] [ str  (sprintf "%A" state) ]]


let root model dispatch =
    Render.docPage [    Render.contentFromMarkdown model.Intro
                        Render.docSection
                            "### Colors"
                            (Viewer.View.root colorInteractive model.ColorViewer (ColorViewerMsg >> dispatch))
                        Render.docSection
                            "### Sizes"
                            (Viewer.View.root sizeInteractive model.SizeViewer (SizeViewerMsg >> dispatch))
                        Render.docSection
                            """
### Styles
The checkbox can be **circle**.
                            """
                            (Viewer.View.root stylesInteractive model.CircleViewer (CircleViewerMsg >> dispatch))
                     
                        Render.docSection "### States" (div [] [])
                        
                        Render.docSection
                            "### Extra"
                            (Viewer.View.root (extraInteractive model dispatch) model.CircleViewer (CircleViewerMsg >> dispatch))
                    ]
