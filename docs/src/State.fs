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
            map (Element Checkradio) (s "elements" </> s "checkradio")
            map Home top ]

let urlUpdate (result : Option<Page>) model =
    match result with
    | None ->
        Browser.console.error ("Error parsing url")
        model, Navigation.modifyUrl (toHash model.CurrentPage)

    | Some page -> { model with CurrentPage = page }, []

let init result =
    let elements =
        { Checkradio = Elements.Checkradio.State.init ()
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
    | CheckradioMsg msg ->
        let (checkradio, checkboxMsg) = Elements.Checkradio.State.update msg model.Elements.Checkradio
        { model with Elements =
                        { model.Elements with Checkradio = checkradio } }, Cmd.map CheckradioMsg checkboxMsg

    