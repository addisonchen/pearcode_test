# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     Pearcode.Repo.insert!(%Pearcode.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.
alias Pearcode.Repo
alias Pearcode.Users.User

aj = Repo.insert!(%User{name: "aj", password_hash: ""})
