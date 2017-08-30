module Elements.Checkradio.View

open Fable.Core
open Fable.Core.JsInterop
open Fable.Helpers.React
open Fable.Helpers.React.Props
open Types
open Elmish.Bulma.Elements
open Elmish.Bulma.Grids
open Elmish.Bulma.Extensions
open Elmish.Bulma.Extra.FontAwesome

let inlineBlockInteractive = 
    Columns.columns [ ]
        [ 
            Column.column [ ]
                [ div [ ClassName "block" ]
                      [ 
                        yield b [] [str "Block"]
                        yield div [ ClassName "field"] [
                            yield! Checkradio.checkbox [ ] [ str "One" ]
                            
                        ]
                        yield div [ ClassName "field"] [
                            yield! Checkradio.checkbox [ ] [ str "Two" ]
                        ]
                        yield b [] [str "Inline"]
                        yield div [ ClassName "field"] [
                            yield! Checkradio.checkbox [ ] [ str "One " ]
                            yield! Checkradio.checkbox [ ] [ str "Two " ]
                        ]
                      ] 
                ]
            
            Column.column [ ]
                [ div [ ClassName "block" ]
                      [ 
                        yield b [] [str "Block"]
                        yield div [ ClassName "field"] [
                            yield! Checkradio.radio [ Checkradio.name "block" ] [ str "One" ]
                            
                        ]
                        yield div [ ClassName "field"] [
                            yield! Checkradio.radio [ Checkradio.name "block"  ] [ str "Two" ]
                        ]
                        yield b [] [str "Inline"]
                        yield div [ ClassName "field"] [
                            yield! Checkradio.radio [ Checkradio.name "inline" ] [ str "One" ]
                            yield! Checkradio.radio [ Checkradio.name "inline" ] [ str "Two " ]
                        ]
                      ] 
                ]
        ]

let colorInteractive =
    Columns.columns [ ]
        [ 
            Column.column [ ]
                [ div [ ClassName "block callout is-primary" ]
                      [ yield! Checkradio.checkbox [ Checkradio.isChecked ] [ str "Checkbox" ]
                        yield! Checkradio.checkbox [ Checkradio.isChecked; Checkradio.isWhite ] [ str "White" ]
                        yield! Checkradio.checkbox [ Checkradio.isChecked; Checkradio.isLight ] [ str "Light" ]
                        yield! Checkradio.checkbox [ Checkradio.isChecked; Checkradio.isDark ] [ str "Dark" ]
                        yield! Checkradio.checkbox [ Checkradio.isChecked; Checkradio.isBlack ] [ str "Black" ] 
                      ] 
                ]

            Column.column [ ]
                [ div [ ClassName "block callout" ]
                      [ yield! Checkradio.checkbox [ Checkradio.isChecked; Checkradio.isPrimary ] [ str "Primary" ]
                        yield! Checkradio.checkbox [ Checkradio.isChecked; Checkradio.isInfo ] [ str "Info" ]
                        yield! Checkradio.checkbox [ Checkradio.isChecked; Checkradio.isSuccess ] [ str "Success" ]
                        yield! Checkradio.checkbox [ Checkradio.isChecked; Checkradio.isWarning ] [ str "Warning" ]
                        yield! Checkradio.checkbox [ Checkradio.isChecked; Checkradio.isDanger ] [ str "Danger" ]
                      ]
                ]

            Column.column [ ]
                [ div [ ClassName "block callout is-primary" ]
                      [ yield! Checkradio.radio [ Checkradio.isChecked; Checkradio.name "rad" ] [ str "Checkbox" ]
                        yield! Checkradio.radio [ Checkradio.isChecked; Checkradio.isWhite; Checkradio.name "rad" ] [ str "White" ]
                        yield! Checkradio.radio [ Checkradio.isChecked; Checkradio.isLight; Checkradio.name "rad" ] [ str "Light" ]
                        yield! Checkradio.radio [ Checkradio.isChecked; Checkradio.isDark; Checkradio.name "rad" ] [ str "Dark" ]
                        yield! Checkradio.radio [ Checkradio.isChecked; Checkradio.isBlack; Checkradio.name "rad" ] [ str "Black" ] 
                      ] 
                ]

            Column.column [ ]
                [ div [ ClassName "block callout" ]
                      [ yield! Checkradio.radio [ Checkradio.isChecked; Checkradio.isPrimary ; Checkradio.name "rad1" ] [ str "Primary" ]
                        yield! Checkradio.radio [ Checkradio.isChecked; Checkradio.isInfo; Checkradio.name "rad1" ] [ str "Info" ]
                        yield! Checkradio.radio [ Checkradio.isChecked; Checkradio.isSuccess; Checkradio.name "rad1" ] [ str "Success" ]
                        yield! Checkradio.radio [ Checkradio.isChecked; Checkradio.isWarning; Checkradio.name "rad1" ] [ str "Warning" ]
                        yield! Checkradio.radio [ Checkradio.isChecked; Checkradio.isDanger; Checkradio.name "rad1" ] [ str "Danger" ] 
                      ] 
                ] 
        ]

let sizeInteractive =
    Columns.columns [ ]
        [ 
          Column.column [ ]
            [div [ ClassName "block" ]
                [ yield! Checkradio.checkbox [ Checkradio.isChecked; Checkradio.isSmall ] [ str "Small" ]
                  yield! Checkradio.checkbox [ Checkradio.isChecked ] [ str "Normal" ]
                  yield! Checkradio.checkbox [ Checkradio.isChecked; Checkradio.isMedium ] [ str "Medium" ]
                  yield! Checkradio.checkbox [ Checkradio.isChecked; Checkradio.isLarge ] [ str "Large" ] 
                ]
            ]

          Column.column [ ]
            [div [ ClassName "block" ]
                [ yield! Checkradio.radio [ Checkradio.name "rSize"; Checkradio.isSmall ] [ str "Small" ]
                  yield! Checkradio.radio [ Checkradio.name "rSize";] [ str "Normal" ]
                  yield! Checkradio.radio [ Checkradio.name "rSize"; Checkradio.isMedium ] [ str "Medium" ]
                  yield! Checkradio.radio [ Checkradio.name "rSize"; Checkradio.isLarge ] [ str "Large" ] 
                ]
            ]
        ]

let stylesInteractive =
    div [ ClassName "block" ]
        [ yield! Checkradio.checkbox [ Checkradio.isChecked; Checkradio.isCircle; Checkradio.isDisabled ] [ str "Checkbox" ]
          yield! Checkradio.checkbox [ Checkradio.isChecked; Checkradio.isCircle; Checkradio.isPrimary ] [ str "Checkbox" ]
          yield! Checkradio.checkbox [ Checkradio.isChecked; Checkradio.isCircle; Checkradio.isSuccess ] [ str "Checkbox - success" ]
          yield! Checkradio.checkbox [ Checkradio.isChecked; Checkradio.isCircle; Checkradio.isWarning ] [ str "Checkbox - warning" ]
          yield! Checkradio.checkbox [ Checkradio.isChecked; Checkradio.isCircle; Checkradio.isDanger ] [ str "Checkbox - danger" ]
          yield! Checkradio.checkbox [ Checkradio.isChecked; Checkradio.isCircle; Checkradio.isInfo ] [ str "Checkbox - info" ]
        ]
          

let stateInteractive =
    Columns.columns [ ]
            [ 
              Column.column [ ]
                [
                    div [ ClassName "block" ]
                        [ yield! Checkradio.checkbox [  Checkradio.isDisabled ] [ str "Disabled" ]
                          yield! Checkradio.checkbox [  Checkradio.isDisabled; Checkradio.isChecked ] [ str "Disabled & Checked" ]
                          yield! Checkradio.checkbox [ ] [ str "Unchecked" ]
                          yield! Checkradio.checkbox [ Checkradio.isChecked;] [ str "checked" ]
                        ]
                ]

              Column.column [ ]
                [
                    div [ ClassName "block" ]
                        [ yield! Checkradio.radio [  Checkradio.isDisabled ] [ str "Disabled" ]
                          yield! Checkradio.radio [  Checkradio.isDisabled; Checkradio.isChecked ] [ str "Disabled & Checked" ]
                          yield! Checkradio.radio [ ] [ str "Unchecked" ]
                          yield! Checkradio.radio [ Checkradio.isChecked;] [ str "checked" ]
                        ]
                ]
            ]
          


let eventInteractive model dispatch =
    let state = not model.IsChecked
    
    div [ ClassName "block" ]
        [ yield! Checkradio.checkbox 
            [
                if model.IsChecked then yield Checkradio.isChecked;  
                yield Checkradio.onChange (fun x -> dispatch (Change state))
            ] 
            [ str  (sprintf "%A" model.IsChecked) ]
        
        ; yield! Checkradio.checkbox 
            [ 
                if model.IsChecked then yield Checkradio.isChecked;  
                yield Checkradio.onChange (fun x -> dispatch (Change state))
            ] 
            [ str  (if model.IsChecked then ":p" else ":'(") ]
        
        ; yield! Checkradio.checkbox 
            [ 
                if model.IsChecked then yield Checkradio.isChecked;  
                yield Checkradio.onChange (fun x -> dispatch (Change state))
            ] 
            [ (if model.IsChecked then Icon.faIcon [ ] Fa.Plane else Icon.faIcon [ ] Fa.Rocket) ]
        ]

let root model dispatch =
    Render.docPage [    Render.contentFromMarkdown model.Intro
                        Render.docSection
                            "### Inline vs Block"
                            (Viewer.View.root inlineBlockInteractive model.InlineBlockViewer (InlineBlockViewerMsg >> dispatch))
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
                     
                        Render.docSection 
                            "### States"
                            (Viewer.View.root stateInteractive model.StateViewer (StateViewerMsg >> dispatch))
                        
                        Render.docSection
                            "### Event handler"
                            (Viewer.View.root (eventInteractive model dispatch) model.EventViewer (EventViewerMsg >> dispatch))
                    ]
