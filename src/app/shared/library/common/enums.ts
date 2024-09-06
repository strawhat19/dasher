export enum NavVariants {
    temporary = `temporary`,
    permanent = `permanent`,
}

export enum GeoDataFormTypes {
    Locations = `Locations`,
    Coordinates = `Coordinates`,
}

export enum GeoTypes {
    Lat = `lat`,
    Lon = `lon`,
    Loc = `loc`,
}

export enum States {
    Ready = `Ready`,
    Error = `Error`,
    Cancel = `Cancel`,
    Active = `Active`,
    Success = `Success`,
    Loading = `Loading`,
    Disabled = `Disabled`,
}

export enum GoogleMapZoomLevels {
    EnableCustomZoom = `!1m14!1m12!1m3!1d132`,
    Street = `!1m14!1m12!1m3!1d132` + ``,
    Neighborhood  = `!1m14!1m12!1m3!1d132` + `4`,
    City = `!1m14!1m12!1m3!1d132` + `44`,
    Region = `!1m14!1m12!1m3!1d132` + `444`,
    State = `!1m14!1m12!1m3!1d132` + `4444`,
    Coast = `!1m14!1m12!1m3!1d132` + `44444`,
    World = ``,
    x300 = `!1m14!1m12!1m3!1d132` + `444444`,
}