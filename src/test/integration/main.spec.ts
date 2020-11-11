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

async function createBook(name: string, page_count: Number, author_id: Number): Promise<AxiosResponse> {
  return axios.post("http://localhost:4000", {
    query: `
      mutation {
        createBook(data: {name: "${name}", pageCount: ${page_count}, authorId: ${author_id}}) {
          name
          id
          authorId
        }
      }
    `
  });
}

function findAuthorById(id: Number, authors: [Author]): Author
{
  return authors.filter((author) => {
    return author.id === id;
  })[0];
}

test("Test fetchAuthors", async () => {
    var response = await fetchAuthors();
    var data = response.data.data;
    expect(data.fetchAuthors[0].name).toEqual("Стивен Кинг");
    expect(data.fetchAuthors[0].books[0].name).toEqual("Темная башня");
    expect(data.fetchAuthors.length).toBeGreaterThanOrEqual(2);
})

test("Create author and book", async () => {
  var name = "Айзек Азимов";
  var response = await createAuthor(name);
  var data = response.data.data;
  expect(data.createAuthor.name).toEqual(name);
  var new_author_id = data.createAuthor.id;

  response = await fetchAuthors();
  data = response.data.data;
  var new_author = findAuthorById(new_author_id, data.fetchAuthors);
  expect(new_author.name).toEqual(name);

  var book_name = "Стальные пещеры";
  response = await createBook(book_name, 700, new_author_id);
  data = response.data.data;
  expect(data.createBook.name).toEqual(book_name);

  response = await fetchAuthors();
  data = response.data.data;
  var author = findAuthorById(new_author_id, data.fetchAuthors);
  expect(author.books[0].name).toEqual(book_name);
})







