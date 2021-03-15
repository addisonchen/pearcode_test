defmodule Pearcode.Repo.Migrations.CreateFiles do
  use Ecto.Migration

  def change do
    create table(:files) do
      add :name, :string, null: false
      add :body, :text, null: false
      add :language, :integer, null: false
      add :user_id, references(:users, on_delete: :nothing), null: false

      timestamps()
    end

    create index(:files, [:user_id])
  end
end
