defmodule PearcodeWeb.SubmissionController do
    use PearcodeWeb, :controller

    def receive_webhook(conn, params) do
        headers = ["Content-Type": "application/json", "X-Auth-Token": "phut1Vahgh9faik4oire"]
        url = "http://localhost:2358/submissions/#{params["token"]}?base64_encoded=false"
        resp = HTTPoison.get!(url, headers, [])
        body = Jason.decode!(resp.body)
        
        # IDEA:
        # PearcodeWeb.Endpoint.broadcast("submissions:#{user_name?}", "new_submission", payload)
        # in the lobby_channel, intercept the broadcast and compare user name, then broadcast to your channel if the name is correct
        conn
        |> resp(400, "ok")
        |> send_resp
    end
end
