module Elements.Slider.View

open Fable.Core
open Fable.Core.JsInterop
open Fable.Helpers.React
open Fable.Helpers.React.Props
open Types
open Elmish.Bulma.Elements
open Elmish.Bulma.Grids
open Elmish.Bulma.Extensions
open Elmish.Bulma.Extra.FontAwesome

let colorInteractive =
    div [ ClassName "block" ]
                      [ 
                        Slider.slider [ ] [ ]
                        Slider.slider [ Slider.isPrimary ] [ ]
                        Slider.slider [ Slider.isInfo ] [ ]
                        Slider.slider [ Slider.isSuccess ] [ ]
                        Slider.slider [ Slider.isWarning ] [ ]
                        Slider.slider [ Slider.isDanger ] [ ]
                      ]
                
let sizeInteractive =
    div [ ClassName "block" ]
        [ Slider.slider [ Slider.isSmall ] [ ]
          Slider.slider [ ] [ ]
          Slider.slider [ Slider.isMedium ] [ ]
          Slider.slider [ Slider.isLarge ] [ ] 
          Slider.slider [ Slider.isFullWidth ] [ ]
        ]
            

        

let stylesInteractive =
    div [ ClassName "block" ]
        [  Slider.slider [ Slider.isCircle; Slider.isDisabled ] [ ] 
           Slider.slider [ Slider.isCircle; Slider.isPrimary ] [ ] 
           Slider.slider [ Slider.isCircle; Slider.isSuccess ] [ ] 
           Slider.slider [ Slider.isCircle; Slider.isWarning ] [ ]
           Slider.slider [ Slider.isCircle; Slider.isDanger ] [ ]
           Slider.slider [ Slider.isCircle; Slider.isInfo ] [ ]
        ]

let stateInteractive =
    div [ ClassName "block" ]
        [ Slider.slider [  Slider.isDisabled ] [ ]
        ]

let eventInteractive model dispatch =
    div [ ClassName "block" ]
        [ Slider.slider [ Slider.onChange (fun x -> dispatch (Change (x.currentTarget?value |> sprintf "%O" |> int)))  ] [ ]
          div [] [ str (sprintf "%i" model.Value) ]
        ]

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
The Slider can be **rounded, outlined or both**.
                            """
                            (Viewer.View.root stylesInteractive model.CircleViewer (CircleViewerMsg >> dispatch))
                     
                        Render.docSection 
                            "### States"
                            (Viewer.View.root stateInteractive model.StateViewer (StateViewerMsg >> dispatch))

                        Render.docSection 
                            "### States"
                            (Viewer.View.root (eventInteractive model dispatch) model.EventViewer (EventViewerMsg >> dispatch))
                        
                        
                    ]
