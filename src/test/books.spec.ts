import axios, { AxiosResponse } from "axios";

async function fetchBooks(): Promise<AxiosResponse>
{
  return axios.post("http://localhost:4000", {
    query: `
        query {
            fetchBooks {
            name
            author {
                name
            }
            authorId
            }
        }
        `
  });
}

async function booksByAuthor(name: string): Promise<AxiosResponse>
{
  return axios.post("http://localhost:4000", {
    query: `
        query {
            booksByAuthor(author_name: "${name}") {
            name
            pageCount
            author {
                name,
                id
            }
            authorId
            }
        }
        `
  });
}

test("Test fetchBooks", async () => {
    var response = await fetchBooks();
    var data = response.data.data;
    expect(data.fetchBooks[0].name).toEqual("Темная башня");
    expect(data.fetchBooks[0].author.name).toEqual("Стивен Кинг");
    expect(data.fetchBooks.length).toBeGreaterThanOrEqual(4);
})

test("Test booksByAuthor", async () => {
    var response = await booksByAuthor("ролинг");
    var data = response.data.data;
    expect(data.booksByAuthor[0].name).toEqual("Гарри Поттер и философский камень");
    expect(data.booksByAuthor[0].author.name).toEqual("Джоан Ролинг");
})