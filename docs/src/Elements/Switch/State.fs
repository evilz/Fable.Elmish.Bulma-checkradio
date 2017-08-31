module Elements.Switch.State

open Elmish
open Types

let inlineBlockCode =
       """
```fsharp
    // Block
    yield div [ ClassName "field"] [
        yield! Switch.switch [ ] [ str "One" ]
        
    ]
    yield div [ ClassName "field"] [
        yield! Switch.switch [ ] [ str "Two" ]
    ]
                       
    // Inline
    yield div [ ClassName "field"] [
        yield! Switch.switch [ ] [ str "One " ]
        yield! Switch.switch [ ] [ str "Two " ]
    ]
```
    """ 
let colorCode =
    """
```fsharp
    Switch.switch [ ] [ str "Button" ]
    Switch.switch [ Switch.isWhite ] [ str "White" ]
    Switch.switch [ Switch.isLight ] [ str "Light" ]
    Switch.switch [ Switch.isDark ] [ str "Dark" ]
    Switch.switch [ Switch.isBlack ] [ str "Black" ]
    Switch.switch [ Switch.isPrimary ] [ str "Primary" ]
    Switch.switch [ Switch.isInfo ] [ str "Info" ]
    Switch.switch [ Switch.isSuccess ] [ str "Success" ]
    Switch.switch [ Switch.isWarning ] [ str "Warning" ]
    Switch.switch [ Switch.isDanger ] [ str "Danger" ]
```
    """

let sizeCode =
    """
```fsharp
Switch.switch [ Switch.isSmall ] [ str "Small" ]
Switch.switch [ ] [ str "Normal" ]
Switch.switch [ Switch.isMedium ] [ str "Medium" ]
Switch.switch [ Switch.isLarge ] [ str "Large" ]
```
    """


let circleCode =
    """
```fsharp
Switch.switch [ Switch.isChecked; Switch.isCircle ] [ str "Checkbox" ]
Switch.switch [ Switch.isChecked; Switch.isCircle; Switch.isPrimary ] [ str "Checkbox" ]
Switch.switch [ Switch.isChecked; Switch.isCircle; Switch.isSuccess ] [ str "Checkbox - success" ]
Switch.switch [ Switch.isChecked; Switch.isCircle; Switch.isWarning ] [ str "Checkbox - warning" ]
Switch.switch [ Switch.isChecked; Switch.isCircle; Switch.isDanger ] [ str "Checkbox - danger" ]
Switch.switch [ Switch.isChecked; Switch.isCircle; Switch.isInfo ] [ str "Checkbox - info" ]
```
    """

let mixedStyleCode =
    """
```fsharp
    Switch.switch [ Button.isInverted ] [ str "Inverted" ]
    Switch.switch [ Button.isSuccess; Button.isInverted ] [ str "Inverted" ]
    Switch.switch [ Button.isDanger; Button.isInverted; Button.isOutlined ] [ str "Invert Outlined" ]
    Switch.switch [ Button.isInfo; Button.isInverted; Button.isOutlined ] [ str "Invert Outlined" ]
```
    """

let stateCode =
    """
```fsharp
    Switch.switch [  Switch.isDisabled ] [ str "Disabled" ]
    Switch.switch [  Switch.isDisabled; Checkradio.isChecked ] [ str "Disabled & Checked" ]
    Switch.switch [ ] [ str "Unchecked" ]
    Switch.switch [ Switch.isChecked;] [ str "checked" ]
```
    """

let eventCode =
    """
```fsharp
    // For registering a change event, we can use the Checkradio.onChange helper
    yield! Switch.switch 
            [
                if model.IsChecked then yield Checkradio.isChecked;  
                yield Switch.onChange (fun x -> dispatch (Change state))
            ] 
            [ str  (sprintf "%A" model.IsChecked) ]

```
    """

let intro =
        """
# Switch

The **Switch** can have different colors, sizes and states.

*[bulma-extensions switch documentation](https://wikiki.github.io/bulma-extensions/switch)*
        """



let init() =
    { InlineBlockViewer = Viewer.State.init inlineBlockCode
      ColorViewer = Viewer.State.init colorCode
      SizeViewer = Viewer.State.init sizeCode
      CircleViewer = Viewer.State.init circleCode
      StateViewer = Viewer.State.init stateCode
      EventViewer = Viewer.State.init eventCode
      Intro = intro
      IsChecked = false
    }

let update msg model =
    match msg with
    | InlineBlockViewerMsg msg ->
        let (viewer, viewerMsg) = Viewer.State.update msg model.InlineBlockViewer
        { model with InlineBlockViewer = viewer }, Cmd.map InlineBlockViewerMsg viewerMsg
    | ColorViewerMsg msg ->
        let (viewer, viewerMsg) = Viewer.State.update msg model.ColorViewer
        { model with ColorViewer = viewer }, Cmd.map ColorViewerMsg viewerMsg
    | SizeViewerMsg msg ->
        let (viewer, viewerMsg) = Viewer.State.update msg model.SizeViewer
        { model with SizeViewer = viewer }, Cmd.map SizeViewerMsg viewerMsg
    | CircleViewerMsg msg ->
        let (viewer, viewerMsg) = Viewer.State.update msg model.CircleViewer
        { model with CircleViewer = viewer }, Cmd.map CircleViewerMsg viewerMsg
    | StateViewerMsg msg ->
        let (viewer, viewerMsg) = Viewer.State.update msg model.StateViewer
        { model with StateViewer = viewer }, Cmd.map StateViewerMsg viewerMsg
    | EventViewerMsg msg ->
        let (viewer, viewerMsg) = Viewer.State.update msg model.EventViewer
        { model with EventViewer = viewer }, Cmd.map EventViewerMsg viewerMsg
    | Change state -> 
        { model with IsChecked = state }, Cmd.none