defmodule Pearcode.Files.File do
  use Ecto.Schema
  import Ecto.Changeset

  schema "files" do
    field :body, :string
    field :language, :integer
    field :name, :string
    belongs_to :user, Pearcode.Users.User

    timestamps()
  end

  @doc false
  def changeset(file, attrs) do
    file
    |> cast(attrs, [:name, :body, :language, :user_id])
    |> validate_required([:name, :body, :language, :user_id])
  end
end
