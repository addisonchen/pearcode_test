defmodule Pearcode.JudgeHandler do
    # python 3.8.1 -> 71
    # Swift 5.2.3 -> 83
    # JavaScript 12.14.0 -> 63
    # Java 13.0.1 -> 62
    # C GCC 9.2.0 -> 50
    # C++ GCC 9.2.0 -> 54
    # Elixer 1.9.4 -> 57
    # Prolog (GNU Prolog 1.4.5) -> 69
    # Ruby (2.7.0) -> 72


    def execute(code, language_id, user_name) do
        url = "http://localhost:2358/submissions/?base64_encoded=false&wait=false"
        headers = ["Content-Type": "application/json", "X-Auth-Token": "phut1Vahgh9faik4oire"]

        callback_url = if :env == :dev do
            "http://172.17.0.1:4000/api/v1/submissions"
        else
            # TODO!!! Change this port to the production port
            "http://172.17.0.1:PORT/api/v1/submissions"
        end

        body = Jason.encode!(%{
            source_code: code,
            language_id: language_id,
            callback_url: "http://172.17.0.1:4000/api/v1/submissions",
        })
        {:ok, response} = HTTPoison.post(url, body, headers)
        IO.inspect response
    end
end