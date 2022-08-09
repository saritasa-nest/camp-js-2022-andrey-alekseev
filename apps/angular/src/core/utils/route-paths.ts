/** Route paths. */
export const routePaths = {
  home: '/',
  login: '/auth/login',
  registration: '/auth/registration',

  anime: '/anime',
  animeCreate: `/anime/create`,
  animeEdit(id: number) {
    return `${this.anime}/${id}/edit`;
  },
};
