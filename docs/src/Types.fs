module App.Types

open Global

type Msg =
    | CheckboxMsg of Elements.Checkbox.Types.Msg


type ElementsModel =
    { Checkbox : Elements.Checkbox.Types.Model
    }

type Model =
    { CurrentPage : Page
      Home : Home.Types.Model
      Elements : ElementsModel
     }
