defmodule PearcodeWeb.SubmissionController do
    use PearcodeWeb, :controller

    def receive_webhook(conn, params) do
        IO.inspect params
        # IDEA:
        # PearcodeWeb.Endpoint.broadcast("submissions:#{user_name?}", "new_submission", payload)
        # in the lobby_channel, intercept the broadcast and compare user name, then broadcast to your channel if the name is correct
    end
end
