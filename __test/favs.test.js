const { connect, disconnected, cleanup } = require("../src/db");
const clonServer = require("supertest");
const app = require("../src/app");

describe("User", () => {
  //antes que todo conectamos a la base de datos
  beforeAll(async () => {
    await connect();
  });
  //antes de cada prueba limpiar esa base de datos
  beforeEach(async () => {
    await cleanup();
  });
  //despues de todo desconectamos
  afterAll(async () => {
    await disconnected();
  });
  //descripcion de la prueba y callback
  it("create list", async () => {
    const user = { email: "test@gmail.com", password: "Pruebas123" };
    const res = await clonServer(app).post("/auth/local/register").send(user);
    res.headers.authorization = `bearer ${res.body.data.token}`;
    const list = { name: "listanumero1" };
    const resList = await clonServer(app)
      .post("/api/favs")
      .send(list)
      .set({ Authorization: res.headers.authorization });
    const fav = {title:`favorito de lista ${list.name}`, description:"esta es una descripcion"};
    const resFav = await clonServer(app).post(`/favs/${resList.body.data._id}`).send(fav);


    expect(res.statusCode).toBe(200);
    expect(res.body.data.token).toMatch(
      /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/
    );
    expect(resList.statusCode).toBe(200);
    expect(resList.body.message).toMatch(/List create/i);
    expect(resList.body.data.name).toMatch(list.name);
    expect(resFav.statusCode).toBe(200);
    expect(resFav.body.message).toMatch(/Fav create/i)
    expect(resFav.body.data.title).toMatch(fav.title)
    expect(resFav.body.data.description).toMatch(fav.description)
  });
});
