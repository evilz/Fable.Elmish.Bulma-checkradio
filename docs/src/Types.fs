module App.Types

open Global

type Msg =
    | CheckradioMsg of Elements.Checkradio.Types.Msg


type ElementsModel =
    { Checkradio : Elements.Checkradio.Types.Model
    }

type Model =
    { CurrentPage : Page
      Home : Home.Types.Model
      Elements : ElementsModel
     }
