module Global

open Fable.Core

type Elements =
    | Checkbox
    | Radio


type Page =
    | Home
    | Element of Elements

let toHash page =
    match page with
    | Home -> "#home"
    | Element element ->
        match element with
        | Checkbox -> "#elements/checkbox"
        | Radio -> "#elements/radio"
