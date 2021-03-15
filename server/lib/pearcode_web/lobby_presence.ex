defmodule PearcodeWeb.LobbyPresence do
    use Phoenix.Presence, otp_app: :pearcode,
        pubsub_server: Pearcode.PubSub

    # TODO change name to user (db item)
    def track_user_join(socket, name) do
        track(socket, name, %{
            typing: false,
            name: name,
            user_id: name
        }) 
    end

    def do_user_update(socket, name, %{typing: typing}) do
        update(socket, name, %{
            typing: typing,
            name: name,
            user_id: name
        }) 
    end
end