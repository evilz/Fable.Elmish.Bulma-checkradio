module App.Types

open Global

type Msg =
    | CheckradioMsg of Elements.Checkradio.Types.Msg
    | SwitchMsg of Elements.Switch.Types.Msg


type ElementsModel =
    { Checkradio : Elements.Checkradio.Types.Model
      Switch : Elements.Switch.Types.Model
    }

type Model =
    { CurrentPage : Page
      Home : Home.Types.Model
      Elements : ElementsModel
     }
