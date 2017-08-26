module Elements.Checkbox.Types

type Model =
    { Intro : string
      ColorViewer : Viewer.Types.Model
      SizeViewer : Viewer.Types.Model
      CircleViewer : Viewer.Types.Model
      IsChecked : bool
    }

type Msg =
    | ColorViewerMsg of Viewer.Types.Msg
    | SizeViewerMsg of Viewer.Types.Msg
    | CircleViewerMsg of Viewer.Types.Msg
    | Change of bool 

