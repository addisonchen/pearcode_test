defmodule PearcodeWeb.FileView do
  use PearcodeWeb, :view
  alias PearcodeWeb.FileView

  def render("index.json", %{files: files}) do
    %{data: render_many(files, FileView, "file.json")}
  end

  def render("show.json", %{file: file}) do
    %{data: render_one(file, FileView, "file.json")}
  end

  def render("file.json", %{file: file}) do
    %{id: file.id,
      name: file.name,
      body: file.body,
      language: file.language}
  end
end
