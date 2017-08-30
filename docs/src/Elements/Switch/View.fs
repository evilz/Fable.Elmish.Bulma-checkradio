module Elements.Switch.View

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
                            yield! Switch.switch [ ] [ str "One" ]
                            
                        ]
                        yield div [ ClassName "field"] [
                            yield! Switch.switch [ ] [ str "Two" ]
                        ]
                        yield b [] [str "Inline"]
                        yield div [ ClassName "field"] [
                            yield! Switch.switch [ ] [ str "One " ]
                            yield! Switch.switch [ ] [ str "Two " ]
                        ]
                      ] 
                ]
            
        ]

let colorInteractive =
    div [ ClassName "block" ]
                      [ yield! Switch.switch [ Switch.isChecked; Switch.isPrimary ] [ str "Primary" ]
                        yield! Switch.switch [ Switch.isChecked; Switch.isInfo ] [ str "Info" ]
                        yield! Switch.switch [ Switch.isChecked; Switch.isSuccess ] [ str "Success" ]
                        yield! Switch.switch [ Switch.isChecked; Switch.isWarning ] [ str "Warning" ]
                        yield! Switch.switch [ Switch.isChecked; Switch.isDanger ] [ str "Danger" ]
                      ]
                


let sizeInteractive =
    div [ ClassName "block" ]
        [ yield! Switch.switch [ Switch.isChecked; Switch.isSmall ] [ str "Small" ]
          yield! Switch.switch [ Switch.isChecked ] [ str "Normal" ]
          yield! Switch.switch [ Switch.isChecked; Switch.isMedium ] [ str "Medium" ]
          yield! Switch.switch [ Switch.isChecked; Switch.isLarge ] [ str "Large" ] 
        ]
            

        

let stylesInteractive =
    Columns.columns [ ]
            [ 
              Column.column [ ]
                [
                    div [ ClassName "block" ]
                        [ yield div [ ClassName "field"] [ yield! Switch.switch [ Switch.isChecked; Switch.isRounded; Switch.isDisabled ] [ str "Disabled" ] ]
                          yield div [ ClassName "field"] [ yield! Switch.switch [ Switch.isChecked; Switch.isRounded; Switch.isPrimary ] [ str "Checkbox" ] ]
                          yield div [ ClassName "field"] [ yield! Switch.switch [ Switch.isChecked; Switch.isRounded; Switch.isSuccess ] [ str "Checkbox - success" ] ]
                          yield div [ ClassName "field"] [ yield! Switch.switch [ Switch.isChecked; Switch.isRounded; Switch.isWarning ] [ str "Checkbox - warning" ] ]
                          yield div [ ClassName "field"] [ yield! Switch.switch [ Switch.isChecked; Switch.isRounded; Switch.isDanger ] [ str "Checkbox - danger" ] ]
                          yield div [ ClassName "field"] [ yield! Switch.switch [ Switch.isChecked; Switch.isRounded; Switch.isInfo ] [ str "Checkbox - info" ] ]
                        ]
                ]
              Column.column [ ]
                [
                    div [ ClassName "block" ]
                        [ yield div [ ClassName "field"] [ yield! Switch.switch [ Switch.isChecked; Switch.isOutlined; Switch.isDisabled ] [ str "Disabled" ] ]
                          yield div [ ClassName "field"] [ yield! Switch.switch [ Switch.isChecked; Switch.isOutlined; Switch.isPrimary ] [ str "Checkbox" ] ]
                          yield div [ ClassName "field"] [ yield! Switch.switch [ Switch.isChecked; Switch.isOutlined; Switch.isSuccess ] [ str "Checkbox - success" ] ]
                          yield div [ ClassName "field"] [ yield! Switch.switch [ Switch.isChecked; Switch.isOutlined; Switch.isWarning ] [ str "Checkbox - warning" ] ]
                          yield div [ ClassName "field"] [ yield! Switch.switch [ Switch.isChecked; Switch.isOutlined; Switch.isDanger ] [ str "Checkbox - danger" ] ]
                          yield div [ ClassName "field"] [ yield! Switch.switch [ Switch.isChecked; Switch.isOutlined; Switch.isInfo ] [ str "Checkbox - info" ] ]
                        ]
                ]
              Column.column [ ]
                [
                    div [ ClassName "block" ]
                        [ yield div [ ClassName "field"] [ yield! Switch.switch [ Switch.isChecked; Switch.isRounded; Switch.isOutlined; Switch.isDisabled ] [ str "Disabled" ] ]
                          yield div [ ClassName "field"] [ yield! Switch.switch [ Switch.isChecked; Switch.isRounded; Switch.isOutlined; Switch.isPrimary ] [ str "Checkbox" ] ]
                          yield div [ ClassName "field"] [ yield! Switch.switch [ Switch.isChecked; Switch.isRounded; Switch.isOutlined; Switch.isSuccess ] [ str "Checkbox - success" ] ]
                          yield div [ ClassName "field"] [ yield! Switch.switch [ Switch.isChecked; Switch.isRounded; Switch.isOutlined; Switch.isWarning ] [ str "Checkbox - warning" ] ]
                          yield div [ ClassName "field"] [ yield! Switch.switch [ Switch.isChecked; Switch.isRounded; Switch.isOutlined; Switch.isDanger ] [ str "Checkbox - danger" ] ]
                          yield div [ ClassName "field"] [ yield! Switch.switch [ Switch.isChecked; Switch.isRounded; Switch.isOutlined; Switch.isInfo ] [ str "Checkbox - info" ] ]
                        ]
                ]

            ]
          

let stateInteractive =
    div [ ClassName "block" ]
        [ yield! Switch.switch [  Switch.isDisabled ] [ str "Disabled" ]
          yield! Switch.switch [  Switch.isDisabled; Switch.isChecked ] [ str "Disabled & Checked" ]
          yield! Switch.switch [ ] [ str "Unchecked" ]
          yield! Switch.switch [ Switch.isChecked;] [ str "checked" ]
        ]
          


let eventInteractive model dispatch =
    let state = not model.IsChecked
    
    div [ ClassName "block" ]
        [ yield! Switch.switch 
            [
                if model.IsChecked then yield Switch.isChecked;  
                yield Switch.onChange (fun x -> dispatch (Change state))
            ] 
            [ str  (sprintf "%A" model.IsChecked) ]
        
        ; yield! Switch.switch 
            [ 
                if model.IsChecked then yield Switch.isChecked;  
                yield Switch.onChange (fun x -> dispatch (Change state))
            ] 
            [ str  (if model.IsChecked then ":p" else ":'(") ]
        
        ; yield! Switch.switch 
            [ 
                if model.IsChecked then yield Switch.isChecked;  
                yield Switch.onChange (fun x -> dispatch (Change state))
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
The switch can be **rounded, outlined or both**.
                            """
                            (Viewer.View.root stylesInteractive model.CircleViewer (CircleViewerMsg >> dispatch))
                     
                        Render.docSection 
                            "### States"
                            (Viewer.View.root stateInteractive model.StateViewer (StateViewerMsg >> dispatch))
                        
                        Render.docSection
                            "### Event handler"
                            (Viewer.View.root (eventInteractive model dispatch) model.EventViewer (EventViewerMsg >> dispatch))
                    ]
