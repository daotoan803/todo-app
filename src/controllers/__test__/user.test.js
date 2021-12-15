const userController = require('../user.controller');

test('validate input with empty input', () => {
  const req = {
    body: {
      username: '',
      password: '',
    },
  };
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  const next = jest.fn();
  userController.validateInput(req, res, next);
  expect(res.status.mock.calls[0][0]).toBe(400);
  expect(res.json.mock.calls[0][0]).toEqual({
    username: 'Username must be at least 3 characters',
    password: 'Password must be at least 3 characters',
  });
});

test('validate input with only spaces input', () => {
  const req = {
    body: {
      username: '     ',
      password: '     ',
    },
  };
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  const next = jest.fn();
  userController.validateInput(req, res, next);
  expect(res.status.mock.calls[0][0]).toBe(400);
  expect(res.json.mock.calls[0][0]).toEqual({
    username: 'Username must be at least 3 characters',
    password: 'Password must be at least 3 characters',
  });
});

test('validate input with invalid password', () => {
  const req = {
    body: {
      username: 'abcsd',
      password: '     ',
    },
  };
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  const next = jest.fn();
  userController.validateInput(req, res, next);
  expect(res.status.mock.calls[0][0]).toBe(400);
  expect(res.json.mock.calls[0][0]).toEqual({
    password: 'Password must be at least 3 characters',
  });
});

test('validate input with invalid username', () => {
  const req = {
    body: {
      username: '',
      password: 'abc',
    },
  };
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  const next = jest.fn();
  userController.validateInput(req, res, next);
  expect(res.status.mock.calls[0][0]).toBe(400);
  expect(res.json.mock.calls[0][0]).toEqual({
    username: 'Username must be at least 3 characters',
  });
});

test('validate input with valid input', () => {
  const req = {
    body: {
      username: 'abc   ',
      password: 'null',
    },
  };
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  const next = jest.fn();
  userController.validateInput(req, res, next);
  expect(res.status).not.toHaveBeenCalled();
  expect(res.json).not.toHaveBeenCalled();
  expect(next).toHaveBeenCalled();
});
