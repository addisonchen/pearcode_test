defmodule PearcodeWeb.LobbyChannel do
    use PearcodeWeb, :channel

    alias Pearcode.Lobby
    alias Pearcode.JudgeHandler
    alias PearcodeWeb.LobbyPresence

    @impl true
    def join("lobby:" <> id, payload, socket) do
        lobby = Lobby.new(payload["name"])
        send(self(), {:after_join, lobby})
        socket = assign(socket, :lobby, lobby)
        socket = assign(socket, :lobby_id, id)
        socket = assign(socket, :user_name, payload["name"])
        {:ok, lobby, socket}
    end

    @impl true
    def handle_info({:after_join, _lobby}, socket) do
        LobbyPresence.track_user_join(socket, socket.assigns.user_name)
        push(socket, "presence_state", LobbyPresence.list(socket))
        {:noreply, socket}
    end

    @impl true
    def handle_in("update", payload, socket) do
        LobbyPresence.do_user_update(socket, socket.assigns.user_name, %{typing: true})

        lobby = socket.assigns[:lobby]
        lobby = Lobby.update(lobby, payload["body"])
        socket = assign(socket, :lobby, lobby)

        broadcast! socket, "updated", lobby
        {:noreply, socket}
    end

    @impl true
    def handle_in("stoptyping", _payload, socket) do
        LobbyPresence.do_user_update(socket, socket.assigns.user_name, %{typing: false})
        {:noreply, socket}
    end

    @impl true
    def handle_in("execute", payload, socket) do
        lobby = socket.assigns[:lobby]
        broadcast! socket, "executing", lobby
        lobby_id = socket.assigns[:lobby_id]
        JudgeHandler.execute(lobby[:body], payload["language"], lobby_id)

        # todo
        {:noreply, socket}
    end

    def handle_in("set_language", payload, socket) do
        language_id = payload["language"]
        broadcast! socket, "new_language", %{language: language_id}

        {:noreply, socket}
    end
end