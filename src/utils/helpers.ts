export function processUserData(userData) {
  return userData.map(user => ({
    id: user.id,
    name: `${user.firstName} ${user.lastName}`
  }));
}