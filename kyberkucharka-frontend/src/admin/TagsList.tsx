import { useEffect, useState } from "react";
import {

  Tag,
} from "../../../common-interfaces/interfaces";
import { Link } from "react-router-dom";
import AreYouSureWindow from "../AreYouSureWindow";
import { fetchTagsDetailed } from "../functions/communicationHelper";

export default function TagsList() {
  const [tags, setTags] = useState<Tag[]>([]);
  const [selectedTag, setSelectedTag] = useState<Tag>();
  const [deletingTag, setDeletingTag] = useState<boolean>(false);

  async function fetchData() {
    // fetch all tags
    fetchTagsDetailed().then((result) => setTags(result));
  }

  useEffect(() => {
    fetchData();
  }, []);

  function sendTag(formData: FormData) {
    const formJSON = Object.fromEntries(formData.entries());
    console.log(formJSON);

    fetch(`/api/tags/`, {
      method: "POST",
      body: JSON.stringify({ name: formJSON.tagName }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      credentials: "include",
    })
      .then(async (response: Response) => {
        if (!response.ok) {
          const json = await response.json();

          alert(json.message);
        }
      })
      .then(fetchData);
  }

  function deleteIngredient(id: number) {
    fetch(`/api/tags/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      credentials: "include",
    })
      .then(async (response: Response) => {
        if (!response.ok) {
          const json = await response.json();
          alert(json.message);
        }
      })
      .then(fetchData);
  }

  return (
    <>
      <title>Správa tagov</title>
      <h1>Zoznam tagov</h1>

      <form action={sendTag}>
        <fieldset className="new-tag-form">
          <legend>Vytvoriť nový tag</legend>
          <label htmlFor="new-tag-name" id="new-tag-label">
            Názov nového tagu:
          </label>
          <input type="text" id="new-tag-name" name="tagName"></input>
          <button type="submit" className="plus-button"></button>
        </fieldset>
      </form>

      <table className="ingredients-table">
        <thead>
          <tr>
            <th scope="col">Názov</th>
            <th scope="col">ID</th>
            <th scope="col">Počet použití</th>
            <th scope="col">Zmazať</th>
          </tr>
        </thead>
        <tbody>
          {tags.map((tag) => (
            <tr key={tag.id}>
              <td>
                <Link
                  style={{ display: "inline-block" }}
                  to={
                    `/search?` +
                    new URLSearchParams({
                      requiredTags: `[${tag.id}]`,
                    })
                  }
                >
                  {tag.name}
                </Link>
              </td>
              <td>{tag.id}</td>
              <td>{tag.count ?? 0}</td>

              <td>
                <img
                  src="/x.png"
                  alt="Zrušiť"
                  tabIndex={0}
                  className="cancel-x cancel-button"
                  onClick={() => {
                    setSelectedTag(tag);
                    setDeletingTag(true);
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {deletingTag && (
        <AreYouSureWindow
          mainText={`Zmazať tag ${selectedTag?.name}?`}
          confirmText="Zmazať!"
          closeCallback={() => setDeletingTag(false)}
          successCallback={() =>
            selectedTag && deleteIngredient(selectedTag.id)
          }
        ></AreYouSureWindow>
      )}
    </>
  );
}
