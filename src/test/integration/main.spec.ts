import axios, { AxiosResponse } from "axios";
import { Author } from "../..//entities/Author";

async function fetchAuthors(): Promise<AxiosResponse>
{
  return axios.post("http://localhost:4000", {
    query: `
        query {
            fetchAuthors {
              id
              name
              books {
                name,
                pageCount
              }
            }
          }
        `
  });
}

async function createAuthor(name: string): Promise<AxiosResponse> {
  return axios.post("http://localhost:4000", {
    query: `
      mutation {
        createAuthor(data: {name: "${name}"}) {
          name
          id
        }
      }
    `
  });
}

async function createBook(name: string, pageCount: number, authorId: number): Promise<AxiosResponse> {
  return axios.post("http://localhost:4000", {
    query: `
      mutation {
        createBook(data: {name: "${name}", pageCount: ${pageCount}, authorId: ${authorId}}) {
          name
          id
          authorId
        }
      }
    `
  });
}

function findAuthorById(id: number, authors: [Author]): Author
{
  return authors.filter((author) => {
    return author.id === id;
  })[0];
}

test("Test fetchAuthors", async () => {
    const response = await fetchAuthors();
    const data = response.data.data;
    expect(data.fetchAuthors[0].name).toEqual("Стивен Кинг");
    expect(data.fetchAuthors[0].books[0].name).toEqual("Темная башня");
    expect(data.fetchAuthors.length).toBeGreaterThanOrEqual(2);
})

test("Create author and book", async () => {
  const name = "Айзек Азимов";
  let response = await createAuthor(name);
  let data = response.data.data;
  expect(data.createAuthor.name).toEqual(name);
  const newAuthorId = data.createAuthor.id;

  response = await fetchAuthors();
  data = response.data.data;
  const newAuthor = findAuthorById(newAuthorId, data.fetchAuthors);
  expect(newAuthor.name).toEqual(name);

  const bookName = "Стальные пещеры";
  response = await createBook(bookName, 700, newAuthorId);
  data = response.data.data;
  expect(data.createBook.name).toEqual(bookName);

  response = await fetchAuthors();
  data = response.data.data;
  const author = findAuthorById(newAuthorId, data.fetchAuthors);
  expect(author.books[0].name).toEqual(bookName);
})







