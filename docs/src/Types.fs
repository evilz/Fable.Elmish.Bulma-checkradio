module App.Types

open Global

type Msg =
    | CheckradioMsg of Elements.Checkradio.Types.Msg
    | SwitchMsg of Elements.Switch.Types.Msg
    | SliderMsg of Elements.Slider.Types.Msg


type ElementsModel =
    { Checkradio : Elements.Checkradio.Types.Model
      Switch : Elements.Switch.Types.Model
      Slider : Elements.Slider.Types.Model
    }

type Model =
    { CurrentPage : Page
      Home : Home.Types.Model
      Elements : ElementsModel
     }
