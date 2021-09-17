const request = require("supertest");
const Task = require("../src/models/task");
const app = require("../src/app");
const { userTwo, userOne, taskOne, setupDatabase } = require("./fixtures/db");

beforeEach(setupDatabase);

test("Should create task for user", async () => {
  const response = await request(app)
    .post("/task")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({
      description: "Task test",
      completed: true,
    })
    .expect(201);

  const task = await Task.findById(response.body._id);
  expect(task).not.toBeNull();
});

test("Should get all task for user one", async () => {
  const response = await request(app)
    .get(`/tasks`)
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);

  expect(response.body.length).toEqual(2);
});

test("Should not delete the other users task", async () => {
  await request(app)
    .delete(`/task/${taskOne._id}`)
    .set("Authorization", `Bearer ${userTwo.tokens[0].token}`)
    .send()
    .expect(404);

  const task = await Task.findById(taskOne._id);

  expect(task).not.toBeNull();
});
