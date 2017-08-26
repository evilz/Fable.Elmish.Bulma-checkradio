module Elements.Checkbox.State

open Elmish
open Types

let colorCode =
    """
```fsharp
    Checkbox.checkbox [ ] [ str "Button" ]
    Checkbox.checkbox [ Checkbox.isWhite ] [ str "White" ]
    Checkbox.checkbox [ Checkbox.isLight ] [ str "Light" ]
    Checkbox.checkbox [ Checkbox.isDark ] [ str "Dark" ]
    Checkbox.checkbox [ Checkbox.isBlack ] [ str "Black" ]
    Checkbox.checkbox [ Checkbox.isPrimary ] [ str "Primary" ]
    Checkbox.checkbox [ Checkbox.isInfo ] [ str "Info" ]
    Checkbox.checkbox [ Checkbox.isSuccess ] [ str "Success" ]
    Checkbox.checkbox [ Checkbox.isWarning ] [ str "Warning" ]
    Checkbox.checkbox [ Checkbox.isDanger ] [ str "Danger" ]
```
    """

let sizeCode =
    """
```fsharp
    Checkbox.checkbox [ Checkbox.isSmall ] [ str "Small" ]
    Checkbox.checkbox [ ] [ str "Normal" ]
    Checkbox.checkbox [ Checkbox.isMedium ] [ str "Medium" ]
    Checkbox.checkbox [ Checkbox.isLarge ] [ str "Large" ]
```
    """


let circleCode =
    """
```fsharp
    Checkbox.checkbox [ Checkbox.isChecked; Checkbox.isCircle ] [ str "Checkbox" ]
    Checkbox.checkbox [ Checkbox.isChecked; Checkbox.isCircle; Checkbox.isPrimary ] [ str "Checkbox" ]
    Checkbox.checkbox [ Checkbox.isChecked; Checkbox.isCircle; Checkbox.isSuccess ] [ str "Checkbox - success" ]
    Checkbox.checkbox [ Checkbox.isChecked; Checkbox.isCircle; Checkbox.isWarning ] [ str "Checkbox - warning" ]
    Checkbox.checkbox [ Checkbox.isChecked; Checkbox.isCircle; Checkbox.isDanger ] [ str "Checkbox - danger" ]
    Checkbox.checkbox [ Checkbox.isChecked; Checkbox.isCircle; Checkbox.isInfo ] [ str "Checkbox - info" ]
```
    """

let mixedStyleCode =
    """
```fsharp
    Button.button [ Button.isInverted ] [ str "Inverted" ]
    Button.button [ Button.isSuccess; Button.isInverted ] [ str "Inverted" ]
    Button.button [ Button.isDanger; Button.isInverted; Button.isOutlined ] [ str "Invert Outlined" ]
    Button.button [ Button.isInfo; Button.isInverted; Button.isOutlined ] [ str "Invert Outlined" ]
```
    """

let stateCode =
    """
```fsharp
    Button.button [ ] [ str "Normal" ]
    Button.button [ Button.isSuccess; Button.isHovered ] [ str "Hover" ]
    Button.button [ Button.isWarning; Button.isFocused ] [ str "Focus" ]
    Button.button [ Button.isInfo; Button.isActive ] [ str "Active" ]
    Button.button [ Button.isBlack; Button.isLoading ] [ str "Loading" ]
```
    """

let extraCode =
    """
```fsharp
    // For registering a click event, we can use the Button.onClick helper
    Button.button [ Button.onClick (fun _ -> dispatch Click) ]
                  [ str buttonTxt ]
    // Or we can pass any IProps via Button.props
    // Equivalent of the Button.onClick
    Button.button [ Button.props [ OnClick (fun _ -> dispatch Click) ] ]
                  [ str buttonTxt ]
    // Disabled button
    Button.button [ Button.props [ Disabled true ] ]
                  [ str "Fixed width" ]
```
    """

let intro =
        """
# Checkbox

The **Checkbox** can have different colors, sizes and states.

*[bulma-checkradio documentation](https://github.com/Wikiki/bulma-checkradio)*
        """



let init() =
    { ColorViewer = Viewer.State.init colorCode
      SizeViewer = Viewer.State.init sizeCode
      CircleViewer = Viewer.State.init circleCode
      Intro = intro
      IsChecked = false
    }

let update msg model =
    match msg with
    | ColorViewerMsg msg ->
        let (viewer, viewerMsg) = Viewer.State.update msg model.ColorViewer
        { model with ColorViewer = viewer }, Cmd.map ColorViewerMsg viewerMsg
    | SizeViewerMsg msg ->
        let (viewer, viewerMsg) = Viewer.State.update msg model.SizeViewer
        { model with SizeViewer = viewer }, Cmd.map SizeViewerMsg viewerMsg
    | CircleViewerMsg msg ->
        let (viewer, viewerMsg) = Viewer.State.update msg model.CircleViewer
        { model with CircleViewer = viewer }, Cmd.map CircleViewerMsg viewerMsg
    | Change state -> 
        { model with IsChecked = state }, Cmd.none