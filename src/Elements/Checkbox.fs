namespace Elmish.Bulma.Extensions

open Elmish
open Elmish.Bulma.BulmaClasses
open Elmish.Bulma.Common
open Fable.Core
open Fable.Core.JsInterop
open Fable.Helpers.React
open Fable.Helpers.React.Props
open Fable.Import
open Elmish.Bulma

module Checkbox =

    module Styles =
        let [<Literal>] Container = "is-checkbox"
        let [<Literal>] IsCircle = "is-circle"


    module Types =
        type Option =
            | Level of ILevelAndColor
            | Size of ISize
            | IsCircle
            | IsChecked
            | IsDisabled
            | Value of string // String ???
            | Label of string
            | Props of IHTMLProp list
            | OnClick of (React.MouseEvent -> unit) // onchange ...
            | CustomClass of string
        let ofStyles style =
            match style with
            | IsCircle -> Styles.IsCircle
            | value -> failwithf "%A isn't a valid style value" value


        type Options =
            { Level : string option
              Size : string option
              IsCircle : bool
              IsChecked : bool
              IsDisabled : bool
              Value : string
              Label : string
              Props : IHTMLProp list
              CustomClass : string option
              OnClick : (React.MouseEvent -> unit) option }
            static member Empty =
                { Level = None
                  Size = None
                  IsCircle = false
                  IsChecked = false
                  IsDisabled = false
                  Value = ""
                  Label = ""
                  Props = []
                  CustomClass = None
                  OnClick = None }

    open Types

    // Sizes
    let isSmall = Size IsSmall
    let isMedium = Size IsMedium
    let isLarge = Size IsLarge

    // States
    let isChecked =  IsChecked
    let isDisabled = IsDisabled

    // Styles
    let isCircle = IsCircle


    // Levels and colors
    let isBlack = Level IsBlack
    let isDark = Level IsDark
    let isLight = Level IsLight
    let isWhite = Level IsWhite
    let isPrimary = Level IsPrimary
    let isInfo = Level IsInfo
    let isSuccess = Level IsSuccess
    let isWarning = Level IsWarning
    let isDanger = Level IsDanger

    // Label and Value
    let value data  = Value data
    let withLabel label = Label label

    // Extra
    let props props = Props props
    let customClass = CustomClass
    


    let checkbox (options : Option list) children =


        let parseOptions (result: Options) opt =
            match opt with
            | Option.Level level -> { result with Level = ofLevelAndColor level |> Some }
            | Size size -> { result with Size = ofSize size |> Some }
            | IsCircle -> { result with IsCircle = true }
            | IsChecked -> { result with IsChecked = true }
            | IsDisabled -> { result with IsDisabled = true }
            | Value value -> { result with Value = value }
            | Label label -> { result with Label = label } 
            | Props props -> { result with Props = props }
            | CustomClass customClass -> { result with CustomClass = Some customClass }
            | OnClick cb -> { result with OnClick = cb |> Some }

        let opts = options |> List.fold parseOptions Options.Empty
        let id = System.Guid.NewGuid() |> sprintf "%O"

        div [ ClassName "field" ]
            [ input 
                [ yield classBaseList
                    (Helpers.generateClassName Styles.Container [ opts.Level; opts.Size; ])
                     [ Styles.IsCircle, opts.IsCircle
                       opts.CustomClass.Value, opts.CustomClass.IsSome ] :> IHTMLProp
                  if opts.OnClick.IsSome then
                    yield DOMAttr.OnClick opts.OnClick.Value :> IHTMLProp
                  yield! opts.Props 
                  yield Type "checkbox" :> IHTMLProp
                  yield Id id :> IHTMLProp
                  
                  if opts.IsChecked then
                    yield Checked true :> IHTMLProp
                  
                  if opts.IsDisabled then
                    yield Disabled true :> IHTMLProp

                  ]

              label [ HtmlFor id ] 
                    [ match children with
                          | [] -> yield str opts.Label
                          | _ -> yield! children

                    ]
            ]