module Global

open Fable.Core

type Elements =
    | Checkradio
    | Switch
    | Slider
    | Divider


type Page =
    | Home
    | Element of Elements

let toHash page =
    match page with
    | Home -> "#home"
    | Element element ->
        match element with
        | Checkradio -> "#elements/checkradio"
        | Switch -> "#elements/switch"
        | Slider -> "#elements/slider"
        | Divider -> "#elements/divider"
