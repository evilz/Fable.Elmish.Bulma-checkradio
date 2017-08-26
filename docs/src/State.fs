module App.State

open Elmish
open Elmish.Browser.Navigation
open Elmish.Browser.UrlParser
open Elmish.Bulma.Elements.Notification
open Fable.Import
open Global
open Types

let pageParser : Parser<Page -> Page, Page> =
    oneOf [ map Home (s "home")
            map (Element Checkbox) (s "elements" </> s "checkbox")
            map (Element Radio) (s "elements" </> s "radio")
            map Home top ]

let urlUpdate (result : Option<Page>) model =
    match result with
    | None ->
        Browser.console.error ("Error parsing url")
        model, Navigation.modifyUrl (toHash model.CurrentPage)

    | Some page -> { model with CurrentPage = page }, []

let init result =
    let elements =
        { Checkbox = Elements.Checkbox.State.init ()
        }


    let (model, cmd) =
        urlUpdate result { CurrentPage = Home
                           Home = Home.State.init ()
                           Elements = elements
                          }

    model, Cmd.batch [ cmd ]

open Fable.Helpers.React
open Fable.Helpers.React.Props

let update msg model =
    match msg with
    | CheckboxMsg msg ->
        let (checkbox, checkboxMsg) = Elements.Checkbox.State.update msg model.Elements.Checkbox
        { model with Elements =
                        { model.Elements with Checkbox = checkbox } }, Cmd.map CheckboxMsg checkboxMsg

    