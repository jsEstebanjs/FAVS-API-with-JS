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
  it("user registration", async () => {
    const user = { email: "test@gmail.com", password: "Pruebas123" };
    const res = await clonServer(app).post("/auth/local/register").send(user);
    expect(res.statusCode).toBe(200);
    expect(res.body.data).toHaveProperty("token");
    expect(res.body.data.token).toMatch(
      /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/
    );
  });

  it("when we send the wrong email when registering", async () => {
    const user = { password: "Pruebas123" };
    const res = await clonServer(app).post("/auth/local/register").send(user);
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch("user not created");
    expect(res.body.data.errors.email.message).toMatch(/Email is required/i);
  });

  it("should not create user when email is invalid", async () => {
    const user = { email: "test1234", password: "Pruebas123" };
    const res = await clonServer(app).post("/auth/local/register").send(user);

    expect(res.statusCode).toBe(400);
    expect(res.body.data.errors.email.message).toMatch(
      /The email is not valid/i
    );
  });

  it("should not create user when email already exists", async () => {
    const user = { email: "test@test.com", password: "Pruebas123" };
    await clonServer(app).post("/auth/local/register").send(user);
    const res = await clonServer(app).post("/auth/local/register").send(user);

    expect(res.statusCode).toBe(400);
    expect(res.body.data.errors.email.message).toMatch(
      /the email already exists/i
    );
  });

  it("should signin user correctly", async () => {
    const user = { email: "test@test.com", password: "Prueba123" };
    await clonServer(app).post("/auth/local/register").send(user);
    const res = await clonServer(app).post("/auth/local/login").send(user);

    expect(res.statusCode).toBe(201);
    expect(res.body.message).toMatch(/User logged in/i);
  });

  it("should not login if incorrect password", async () => {
    const user = { email: "test@test.com", password: "Prueba123" };
    await clonServer(app).post("/auth/local/register").send(user);
    const res = await clonServer(app)
      .post("/auth/local/login")
      .send({ ...user, password: "123" });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch(/error when logging/i);
    expect(res.body.data).toMatch(/invalid email or password/i);
  });

  it("should nopt login user if email does not exist", async () => {
    const user = { email: "test@test.com", password: "12345" };
    const res = await clonServer(app).post("/auth/local/login").send(user);

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch(/error when logging/i);
  });
});
