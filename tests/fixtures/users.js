const usersJson = {
  data: [
    {
      id: '1',
      type: 'user',
      attributes: {
        name: 'Albert Einstein',
        image: '/images/Einstein.jpg',
        value: 'false',
      },
    },
    {
      id: '2',
      type: 'user',
      attributes: {
        name: 'Walt Disney',
        image: '/images/Walt.jpg',
        value: 'false',
      },
    },
    {
      id: '3',
      type: 'user',
      attributes: {
        name: 'Bruce Lee',
        image: '/images/Bruce.jpg',
        value: 'false',
      },
    },
    {
      id: '4',
      type: 'user',
      attributes: {
        name: 'Neil Armstrong',
        image: '/images/Neil.jpg',
        value: 'false',
      },
    },
  ],
};

export function setupUserMockup(hooks) {
  hooks.beforeEach(function () {
    this.server.get(`api/users`, () => usersJson, 200);
    this.server.get(
      `api/users/:user_id`,
      (schema, { params: { user_id } }) => {
        return { data: getUserData(user_id) };
      },
      200
    );
    this.server.patch(
      `api/users/:user_id`,
      (schema, { requestBody }) => {
        return requestBody;
      },
      200
    );
  });
}

export function getUserData(userId) {
  return usersJson.data.find((usr) => usr.id == userId);
}

export function getUserRawData(userId) {
  return getUsersRawList().find((usr) => usr.id == userId);
}

export function getUsersRawList() {
  return usersJson.data.map((usr) => ({ id: usr.id, ...usr.attributes }));
}
