defmodule Pearcode.Lobby do

    
    # create a new blank lobby
    def new(user_id) do
        %{
            name: "untitled",
            body: "",
            user_id: user_id
        }
    end

    # load a file
    def load(st, name) do
        
    end

    # save a file
    def save(st) do
        
    end

    # rename (or name for the first time)
    def rename(st, name) do
        
    end

    def update(st, code) do
        Map.replace(st, :body, code)
    end

    
end