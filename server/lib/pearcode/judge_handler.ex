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
        headers = ["Content-Type": "application/json"]
        body = Jason.encode!(%{
            source_code: code,
            language_id: language_id,
            callback_url: "http://localhost:4000/submissions/#{user_name}"
        })
        {:ok, response} = HTTPoison.post(url, body, headers)
        IO.inspect response

        # need to find callback url to add to body!
    end
end